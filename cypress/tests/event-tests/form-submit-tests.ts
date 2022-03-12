import { staticValues } from "../../../src/core";
import { Utils } from "../../support";

export function formSubmitTests(utils: Utils) {
	describe('Form Submit', () => {
		const { loadEventsInput, IDs } = utils
		const eventTestsInput = () => cy.get(`#${IDs.eventsInputID}`)
		const submissionValueElem = () => cy.get(`#${IDs.eventsFormValueID}`)
		const submitButtonElem = () => cy.get(`#${IDs.buttonIDs.submitID}`)

		const hasInputValue = (value: string) => () => eventTestsInput().should('have.value', value).then(eventTestsInput)
		const hasSubmissionValue = (value: string) => () => submissionValueElem().should('have.text', value).then(eventTestsInput)

		it('Has correct starting value', () => {
			loadEventsInput().then(hasSubmissionValue(staticValues.defaultValue.inputValue))
		})
		it('Has correct submission value and correct final input value', () => {
			loadEventsInput()
				.then(submitButtonElem)
				.click()
				.then(hasSubmissionValue(staticValues.defaultValue.cpuValue))
				.wait(1)
				.then(hasInputValue(staticValues.defaultValue.inputValue))
		})
	})

}