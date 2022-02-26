import type { Segment } from "@time-input-polyfill/utils"
import { toLeadingZero, a11yID } from "@time-input-polyfill/utils"

type GetCyElem = () => Cypress.Chainable<JQuery<HTMLElement>>

export class TestSuite {
	all: () => void

	constructor(utils: Utils) {
		this.all = () => {
			Object.keys(this).forEach(key => {
				const fn = (this as any)[key]
				if (typeof fn === 'function' && key !== 'all') {
					fn(utils)
				}
			})
		}
	}
}

export type Labels = {
	primaryTestsLabel: string
	eventTestsLabel: string
}
export type IDs = {
	primaryTestsId: string
	eventTestsId: string
	a11yId: string
}

export interface UtilParams {
	primaryTestsLabel: string
	eventTestsLabel: string
	localHostUrl: string
}

export interface Use {
	upArrow: GetCyElem
	downArrow: GetCyElem
	leftArrow: GetCyElem
	rightArrow: GetCyElem
	del: GetCyElem
	backspace: GetCyElem
}

interface LoadTestPageParams {
	url?: string
	segment?: Segment
	polyfillId?: string
}

export class Utils {
	labels: Labels
	IDs: IDs
	use: Use
	localHostUrl: string

	constructor({ primaryTestsLabel, eventTestsLabel, localHostUrl }: UtilParams) {
		this.localHostUrl = localHostUrl
		this.labels = { primaryTestsLabel, eventTestsLabel }
		this.IDs = {
			primaryTestsId: primaryTestsLabel.toLowerCase().replaceAll(' ', '-'),
			eventTestsId: eventTestsLabel.toLowerCase().replaceAll(' ', '-'),
			a11yId: a11yID,
		}
		this.use = {
			upArrow: () => this.cyInput().trigger('keydown', { key: 'ArrowUp' }).trigger('keyup', { key: 'ArrowUp' }).wait(10),
			downArrow: () => this.cyInput().trigger('keydown', { key: 'ArrowDown' }).trigger('keyup', { key: 'ArrowDown' }).wait(10),
			leftArrow: () => this.cyInput().trigger('keydown', { key: 'ArrowLeft' }).trigger('keyup', { key: 'ArrowLeft' }).wait(10),
			rightArrow: () => this.cyInput().trigger('keydown', { key: 'ArrowRight' }).trigger('keyup', { key: 'ArrowRight' }).wait(10),
			// Tab can't be tested due to e.preventDefault() not being supported
			// tab: () => cyInput().tab(),
			// shiftTab: () => cyInput().tab({ shift: true }),
			del: () => this.cyInput().trigger('keydown', { key: 'Delete' }).trigger('keyup', { key: 'Delete' }).wait(10),
			backspace: () => this.cyInput().trigger('keydown', { key: 'Backspace' }).trigger('keyup', { key: 'Backspace' }).wait(10)
		}

		// https://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods
		this.cySelectSegment = this.cySelectSegment.bind(this)
	}

	loadTestPage({ segment, polyfillId, url = this.localHostUrl, }: LoadTestPageParams = {}) {
		return cy.visit(url).wait(100).then(() => {
			if (segment) {
				return this.cySelectSegment(segment)
			}
			return cy.get(`#${polyfillId}`).wait(10)
		})
	}

	loadPrimaryInput = (params?: LoadTestPageParams) => this.loadTestPage({
		polyfillId: this.IDs.primaryTestsId,
		...params
	})

	loadEventsInput = (params?: LoadTestPageParams) => this.loadTestPage({
		polyfillId: this.IDs.eventTestsId,
		...params
	})

	cyInput = () => cy.get(`#${this.IDs.primaryTestsId}`)

	cyA11y = () => cy.get(`#${this.IDs.a11yId}`)

	$input(jQueryInput: JQuery<HTMLElement>) {
		return jQueryInput[0] as HTMLInputElement
	}

	hasReturnVal = (expectation: string) => () => {
		return cy.get(`#${this.IDs.primaryTestsId}-return-value`)
			.wait(10)
			.should('have.text', expectation)
			.then(this.cyInput)
	}

	a11yInitialHtml(value?: number | string): A11yInitialHtmlReturn {
		const hrs12 = `<p>Hours spin button ${value || 8}.</p>`
		return ({
			hrs12,
			minutes: `<p>Minutes spin button ${value || 30}.</p>`,
			mode: `<p>AM/PM spin button ${value || 'PM'}.</p>`,
			focus: `<p>${this.labels.primaryTestsLabel} grouping ${toLeadingZero(value || 8)}:30 PM.</p>` + hrs12
		})
	}

	a11yHasExpectedHtml(expectedHtml: string) {
		return () => this.cyA11y().wait(10).should('have.html', expectedHtml).then(this.cyInput)
	}

	sendFocus = () => this.cyInput().focus().wait(100)

	cySelectSegment(segmentToEndOn: Segment) {
		const inputSelection = this.sendFocus()

		const targets = {
			hrs12: () => inputSelection,
			minutes: () => inputSelection.then(this.use.rightArrow),
			mode: () => inputSelection.then(this.use.rightArrow).then(this.use.rightArrow),
		}

		return targets[segmentToEndOn]().wait(100)
	}

	setTime(string12hr: string, finishingSegment: Segment = 'hrs12') {
		const regex = /(\d\d):(\d\d) ([AP]M)/i
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_match, hrs12, minutes, mode] = regex.exec(string12hr) || []
		const inputSelection = this.cySelectSegment('hrs12').type(`${hrs12}${minutes}${mode}`)

		const targets = {
			hrs12: () => inputSelection.then(this.use.leftArrow).then(this.use.leftArrow),
			minutes: () => inputSelection.then(this.use.leftArrow),
			mode: () => inputSelection,
		}

		return targets[finishingSegment]()
	}

	clearAllSegments(segmentToEndOn: Segment) {
		return this.cyInput().focus().type('{del}').should('have.value', '--:30 PM')
			.then(() => this.use.rightArrow())
			.then(() => this.cyInput().type('{del}').should('have.value', '--:-- PM'))
			.then(() => this.use.rightArrow())
			.then(() => this.cyInput().type('{del}').should('have.value', '--:-- --'))
			.then(() => this.cyInput().blur())
			.then(() => this.cySelectSegment(segmentToEndOn))
	}
}

interface A11yInitialHtmlReturn {
	hrs12: string
	minutes: string
	mode: string
	focus: string
}
