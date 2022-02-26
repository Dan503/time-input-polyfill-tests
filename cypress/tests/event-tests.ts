import { AltEventName, EventName } from "../support/supportTypes"
import { Utils } from "../support/utils"

export function eventTests(utils: Utils) {
	const { loadEventsInput, IDs } = utils

	const eventTestsInput = () => cy.get(`#${IDs.eventTestsId}`)

	const eventValue = () => cy.get(`#${IDs.eventTestsId}-value`)
	const eventName = () => cy.get(`#${IDs.eventTestsId}-eventName`)
	const eventAltName = () => cy.get(`#${IDs.eventTestsId}-altEventName`)

	const hasValue = (value: string) => () => eventValue().should('have.text', value).then(eventTestsInput)
	const hasName = (name: EventName) => () => eventName().should('have.text', name).then(eventTestsInput)
	const hasAltName = (name: AltEventName) => () => eventAltName().should('have.text', name).then(eventTestsInput)

	const keyDown = () => eventTestsInput().trigger('keydown', { key: 'ArrowUp' })
	const keyUp = () => eventTestsInput().trigger('keyup', { key: 'ArrowUp' })

	const mouseDown = () => eventTestsInput().trigger('mousedown')
	const mouseUp = () => eventTestsInput().trigger('mouseup')

	describe('Event tests', () => {
		it('ensures events work', () => {
			loadEventsInput({ polyfillId: IDs.eventTestsId })
				.then(hasValue('default'))
				.then(hasName('none'))
				.then(hasAltName('none'))
				.focus()
				.then(hasValue('08:30 PM'))
				.then(hasName('focus'))
				.then(hasAltName('none'))
				.then(keyDown)
				// Due to the event getting fired before the state has settled, the value is out of sync with the state
				// It is out of scope to adjust the timing of all possible events so that they align with when the state updates
				.then(hasValue('08:30 PM'))
				.then(hasName('keyDown'))
				.then(hasAltName('change'))
				.then(keyUp)
				.then(hasValue('09:30 PM'))
				.then(hasName('keyUp'))
				.then(hasAltName('change'))
				.blur()
				.then(hasValue('09:30 PM'))
				.then(hasName('blur'))
				.then(hasAltName('change'))
				.then(mouseDown)
				.then(hasValue('09:30 PM'))
				.then(hasName('mouseDown'))
				.then(hasAltName('change'))
				.then(mouseUp)
				.then(hasValue('09:30 PM'))
				.then(hasName('mouseUp'))
				// For normal users this would trigger a 'click' event but for Cypress it doesn't
				.then(hasAltName('change'))
				.click()
				.then(hasValue('09:30 PM'))
				.then(hasName('mouseUp'))
				.then(hasAltName('click'))
		})
	})
}
