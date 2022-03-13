import type { Segment } from "@time-input-polyfill/utils"
import { toLeadingZero } from "@time-input-polyfill/utils"
import { EventAltName, EventMainName } from "../../src/core/supportTypes"
import { IDsAndLabelsType, Labels, IDs } from "../../src/core/IDs-and-labels"

type GetCyElem = () => Cypress.Chainable<JQuery<HTMLInputElement>>

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

export interface UtilParams {
	IDsAndLabels: IDsAndLabelsType
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

	constructor({ IDsAndLabels, localHostUrl }: UtilParams) {
		this.localHostUrl = localHostUrl
		this.labels = IDsAndLabels.labels
		this.IDs = IDsAndLabels.IDs

		this.use = {
			upArrow: () => this.cyPrimaryInput().trigger('keydown', { key: 'ArrowUp' }).trigger('keyup', { key: 'ArrowUp' }).wait(10),
			downArrow: () => this.cyPrimaryInput().trigger('keydown', { key: 'ArrowDown' }).trigger('keyup', { key: 'ArrowDown' }).wait(10),
			leftArrow: () => this.cyPrimaryInput().trigger('keydown', { key: 'ArrowLeft' }).trigger('keyup', { key: 'ArrowLeft' }).wait(10),
			rightArrow: () => this.cyPrimaryInput().trigger('keydown', { key: 'ArrowRight' }).trigger('keyup', { key: 'ArrowRight' }).wait(10),
			// Tab can't be tested due to e.preventDefault() not being supported
			// tab: () => cyInput().tab(),
			// shiftTab: () => cyInput().tab({ shift: true }),
			del: () => this.cyPrimaryInput().trigger('keydown', { key: 'Delete' }).trigger('keyup', { key: 'Delete' }).wait(10),
			backspace: () => this.cyPrimaryInput().trigger('keydown', { key: 'Backspace' }).trigger('keyup', { key: 'Backspace' }).wait(10)
		}

		// `this` isn't always defined. Have to force it to get bound correctly using this method :(
		// https://stackoverflow.com/questions/4011793/this-is-undefined-in-javascript-class-methods
		const bind = (key: keyof Utils) => { this[key] = (this[key] as any).bind(this) }
		bind('loadTestPage')
		bind('loadPrimaryInput')
		bind('loadEventsInput')
		bind('cyPrimaryInput')
		bind('cyPrimaryCpuValue')
		bind('cyEventsInput')
		bind('cyEventsDisplayValue')
		bind('cyEventsMainName')
		bind('cyEventsAltName')
		bind('cyForm')
		bind('cyFormSubmitButton')
		bind('cyFormCpuValue')
		bind('cyA11y')
		bind('$input')
		bind('hasPrimaryInputValue')
		bind('hasPrimaryCpuValue')
		bind('hasFormCpuValue')
		bind('hasEventsInputValue')
		bind('hasEventsDisplayValue')
		bind('hasEventsMainName')
		bind('hasEventsAltName')
		bind('clickButton')
		bind('a11yInitialHtml')
		bind('a11yHasExpectedHtml')
		bind('sendFocus')
		bind('cySelectSegment')
		bind('setTime')
		bind('clearAllSegments')
	}

	loadTestPage({ segment, polyfillId, url = this.localHostUrl, }: LoadTestPageParams = {}) {
		return cy.visit(url).wait(100).then(() => {
			if (segment) {
				return this.cySelectSegment(segment)()
			}
			return cy.get<HTMLInputElement>(`#${polyfillId}`).wait(10)
		})
	}

	loadPrimaryInput = (params?: LoadTestPageParams) => this.loadTestPage({
		polyfillId: this.IDs.primaryInputID,
		...params
	})

	loadEventsInput = (params?: LoadTestPageParams) => this.loadTestPage({
		polyfillId: this.IDs.eventsInputID,
		...params
	})

	cyPrimaryInput = () => cy.get<HTMLInputElement>(`#${this.IDs.primaryInputID}`)
	cyPrimaryCpuValue = () => cy.get(`#${this.IDs.primaryCpuValueID}`)

	cyEventsInput = () => cy.get<HTMLInputElement>(`#${this.IDs.eventsInputID}`)
	cyEventsDisplayValue = () => cy.get(`#${this.IDs.eventsDisplayValueID}`)
	cyEventsMainName = () => cy.get(`#${this.IDs.eventsMainNameID}`)
	cyEventsAltName = () => cy.get(`#${this.IDs.eventsAltNameID}`)

	cyForm = () => cy.get(`#${this.IDs.formID}`)
	cyFormSubmitButton = () => cy.get<HTMLButtonElement>(`#${this.IDs.buttonIDs.submitID}`)
	cyFormCpuValue = () => cy.get(`#${this.IDs.formCpuValueID}`)

	cyA11y = () => cy.get(`#${this.IDs.a11yID}`)

	$input(jQueryInput: JQuery<HTMLElement>) {
		return jQueryInput[0] as HTMLInputElement
	}

	hasPrimaryInputValue = (expectation: string) => () => {
		return this.cyPrimaryInput()
			.wait(10)
			.should('have.value', expectation)
			.then(this.cyPrimaryInput)
	}
	hasPrimaryCpuValue = (expectation: string) => () => {
		return this.cyPrimaryCpuValue()
			.should('have.text', expectation)
			.then(this.cyPrimaryInput)
	}
	hasFormCpuValue = (expectation: string) => () => {
		return this.cyFormCpuValue()
			.should('have.text', expectation)
			.then(this.cyEventsInput)
	}
	hasEventsInputValue = (expectation: string) => () => {
		return this.cyEventsInput()
			.wait(10)
			.should('have.value', expectation)
			.then(this.cyEventsInput)
	}
	hasEventsDisplayValue = (expectation: string) => () => {
		return this.cyEventsDisplayValue()
			.should('have.text', expectation)
			.then(this.cyEventsInput)
	}
	hasEventsMainName = (expectation: EventMainName) => () => {
		return this.cyEventsMainName()
			.should('have.text', expectation)
			.then(this.cyEventsInput)
	}
	hasEventsAltName = (expectation: EventAltName) => () => {
		return this.cyEventsAltName()
			.should('have.text', expectation)
			.then(this.cyEventsInput)
	}

	clickButton = (buttonId: string, inputId = this.IDs.primaryInputID) => () => {
		return cy.get(`#${buttonId}`).click().wait(10).then(() => cy.get(`#${inputId}`))
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
		return () => this.cyA11y().wait(10).should('have.html', expectedHtml).then(this.cyPrimaryInput)
	}

	sendFocus = () => this.cyPrimaryInput().focus().wait(100)

	cySelectSegment = (segmentToEndOn: Segment) => () => {
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
		const inputSelection = this.cySelectSegment('hrs12')().type(`${hrs12}${minutes}${mode}`)

		const targets = {
			hrs12: () => inputSelection.then(this.use.leftArrow).then(this.use.leftArrow),
			minutes: () => inputSelection.then(this.use.leftArrow),
			mode: () => inputSelection,
		}

		return targets[finishingSegment]()
	}

	clearAllSegments(segmentToEndOn: Segment) {
		return this.cyPrimaryInput().focus().type('{del}').should('have.value', '--:30 PM')
			.then(this.use.rightArrow)
			.then(() => this.cyPrimaryInput().type('{del}').should('have.value', '--:-- PM'))
			.then(this.use.rightArrow)
			.then(() => this.cyPrimaryInput().type('{del}').should('have.value', '--:-- --'))
			.then(() => this.cyPrimaryInput().blur())
			.then(this.cySelectSegment(segmentToEndOn))
	}
}

interface A11yInitialHtmlReturn {
	hrs12: string
	minutes: string
	mode: string
	focus: string
}
