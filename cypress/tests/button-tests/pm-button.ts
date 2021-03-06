import { staticValues } from "../../../src/core/static-values"
import type { Utils } from "../../support/utils"

export function button_pm(utils: Utils) {
	const { loadPrimaryInput, hasReturnVal, use, cySelectSegment, cyInput, IDs } = utils
	const { cpuValue, inputValue, labelValue } = staticValues.buttonPM

	const clickBtn2 = () => cy.get(`#${IDs.buttonIDs.pmID}`).click().wait(10).then(cyInput)

	describe(`Button PM - ${labelValue}`, () => {
		it('Arrow key functions', () => {
			loadPrimaryInput()
				.then(clickBtn2)
				.should('have.value', inputValue)
				.then(hasReturnVal(cpuValue))
				.then(() =>
					cySelectSegment('hrs12')
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
				)
		})
		it('Can press button twice', () => {
			loadPrimaryInput()
				.then(clickBtn2)
				.should('have.value', '03:45 PM')
				.then(hasReturnVal('15:45'))
				.then(() =>
					cySelectSegment('hrs12')
						.then(use.upArrow)
						.should('have.value', '04:45 PM')
						.then(use.rightArrow)
						.then(use.upArrow)
						.should('have.value', '04:46 PM')
						.then(use.rightArrow)
						.then(use.upArrow)
						.should('have.value', '04:46 AM')
						.then(clickBtn2)
						.should('have.value', '03:45 PM')
				)
		})
	})
}
