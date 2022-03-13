import type { Utils } from "../../support/utils"
import { staticValues } from "../../../src/core/static-values"

export function button_blank(utils: Utils) {
	const { loadPrimaryInput, hasPrimaryCpuValue, use, cySelectSegment, IDs, clickButton } = utils
	const { cpuValue, inputValue, labelValue } = staticValues.buttonBlank

	const clickBtnBlank = clickButton(IDs.buttonIDs.blankID)

	describe(`Button Blank - ${labelValue}`, () => {
		it('arrow key functions', () => {
			loadPrimaryInput()
				.then(clickBtnBlank)
				.should('have.value', inputValue)
				.then(hasPrimaryCpuValue(cpuValue))
				.then(cySelectSegment('hrs12'))
				.then(use.upArrow)
				.should('have.value', '01:-- --')
				.then(use.downArrow)
				.should('have.value', '12:-- --')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '12:00 --')
				.then(use.downArrow)
				.should('have.value', '12:59 --')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '12:59 AM')
				.then(use.downArrow)
				.should('have.value', '12:59 PM')
				.then(use.del)
				.should('have.value', '12:59 --')
				.then(use.leftArrow)
				.then(use.backspace)
				.should('have.value', '12:-- --')
				.then(use.leftArrow)
				.then(use.del)
				.should('have.value', '--:-- --')
		})
		it('can press button twice', () => {
			loadPrimaryInput()
				.then(clickBtnBlank)
				.should('have.value', '--:-- --')
				.then(hasPrimaryCpuValue(''))
				.then(cySelectSegment('hrs12'))
				.then(use.upArrow)
				.should('have.value', '01:-- --')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '01:00 --')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '01:00 AM')
				.then(clickBtnBlank)
				.should('have.value', '--:-- --')
		})
	})
}