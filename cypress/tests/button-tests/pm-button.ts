import { staticValues } from "../../../src/core/static-values"
import type { Utils } from "../../support/utils"

export function button_pm(utils: Utils) {
	const { loadPrimaryInput, hasPrimaryCpuValue, use, cySelectSegment, clickButton, IDs } = utils
	const { cpuValue, inputValue, labelValue } = staticValues.buttonPM

	const clickBtnPm = clickButton(IDs.buttonIDs.pmID)

	describe(`Button PM - ${labelValue}`, () => {
		it('Arrow key functions', () => {
			loadPrimaryInput()
				.then(clickBtnPm)
				.should('have.value', inputValue)
				.then(hasPrimaryCpuValue(cpuValue))
				.then(cySelectSegment('hrs12'))
				.then(use.upArrow)
				.should('have.value', '04:45 PM')
				.then(use.downArrow)
				.then(use.downArrow)
				.should('have.value', '02:45 PM')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '02:46 PM')
				.then(use.downArrow)
				.then(use.downArrow)
				.should('have.value', '02:44 PM')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '02:44 AM')
				.then(use.downArrow)
				.should('have.value', '02:44 PM')
				.then(use.del)
				.should('have.value', '02:44 --')
				.then(use.leftArrow)
				.then(use.backspace)
				.should('have.value', '02:-- --')
				.then(use.leftArrow)
				.then(use.del)
				.should('have.value', '--:-- --')
		})
		it('Can press button twice', () => {
			loadPrimaryInput()
				.then(clickBtnPm)
				.should('have.value', '03:45 PM')
				.then(hasPrimaryCpuValue('15:45'))
				.then(cySelectSegment('hrs12'))
				.then(use.upArrow)
				.should('have.value', '04:45 PM')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '04:46 PM')
				.then(use.rightArrow)
				.then(use.upArrow)
				.should('have.value', '04:46 AM')
				.then(clickBtnPm)
				.should('have.value', '03:45 PM')
		})
	})
}
