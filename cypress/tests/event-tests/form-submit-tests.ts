import { staticValues } from "../../../src/core";
import { Utils } from "../../support";

export function formSubmitTests(utils: Utils) {
	describe('Form Submit', () => {
		const { loadEventsInput, hasEventsInputValue, hasFormCpuValue, hasEventsMainName, cyFormSubmitButton: cyFormSubmitButton } = utils

		it('Has correct starting value', () => {
			loadEventsInput().then(hasEventsInputValue(staticValues.defaultValue.inputValue))
		})
		it('Has correct submission value and correct final input value', () => {
			loadEventsInput()
				// Don't use the clickButton util, it has a delay to wait for state to settle.
				// For this test to be valid it needs to test that the submitted value is updated immediately.
				.then(cyFormSubmitButton)
				.click()
				.then(hasFormCpuValue(staticValues.defaultValue.cpuValue))
				.wait(1)
				.then(hasEventsInputValue(staticValues.defaultValue.inputValue))
				.then(hasEventsMainName('submit'))
		})
	})
}
