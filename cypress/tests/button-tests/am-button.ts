import type { Utils } from "../../support/utils"
import { staticValues } from "../../../src/core/static-values"

export function button_am(utils: Utils) {
	const { loadPrimaryInput, hasPrimaryCpuValue, use, cySelectSegment, IDs, clickButton } = utils
	const { labelValue, inputValue, cpuValue } = staticValues.buttonAM

	const clickBtnAm = clickButton(IDs.buttonIDs.amID)

	describe(`Button AM - ${labelValue}`, () => {
		it('Arrow key functions', () => {
			loadPrimaryInput()
				.then(clickBtnAm)
				.should('have.value', inputValue)
				.then(hasPrimaryCpuValue(cpuValue))
				// Need to make sure the basic functions still work after clicking a button
				.then(cySelectSegment('hrs12'))
				.then(use.upArrow)
				.should('have.value', '08:15 AM')
				.then(use.downArrow)
				.then(use.downArrow)
				.should('have.value', '06:15 AM')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '06:16 AM')
				.then(use.downArrow)
				.then(use.downArrow)
				.should('have.value', '06:14 AM')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '06:14 PM')
				.then(use.downArrow)
				.should('have.value', '06:14 AM')
				.then(use.del)
				.should('have.value', '06:14 --')
				.then(use.leftArrow)
				.then(use.backspace)
				.should('have.value', '06:-- --')
				.then(use.leftArrow)
				.then(use.del)
				.should('have.value', '--:-- --')
		})
		it('Can press button twice', () => {
			loadPrimaryInput()
				.then(clickBtnAm)
				.should('have.value', inputValue)
				.then(hasPrimaryCpuValue(cpuValue))
				// Need to make sure the basic functions still work after clicking a button
				.then(cySelectSegment('hrs12'))
				.then(use.upArrow)
				.should('have.value', '08:15 AM')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '08:16 AM')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '08:16 PM')
				.then(clickBtnAm)
				.should('have.value', '07:15 AM')
		})
	})
}