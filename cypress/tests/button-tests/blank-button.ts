import type { Utils } from "../../support/utils"
import { staticValues } from "../../../src/core/static-values"

export function button_blank(utils: Utils) {
	const { loadPrimaryInput, hasReturnVal, use, cySelectSegment, cyInput, IDs } = utils
	const { cpuValue, inputValue, labelValue } = staticValues.buttonBlank

	const clickBtn3 = () => cy.get(`#${IDs.buttonIDs.blankID}`).click().wait(10).then(cyInput)

	describe(`Button Blank - ${labelValue}`, () => {
		it('arrow key functions', () => {
			loadPrimaryInput()
				.then(clickBtn3)
				.should('have.value', inputValue)
				.then(hasReturnVal(cpuValue))
				.then(() =>
					cySelectSegment('hrs12')
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
				)
		})
		it('can press button twice', () => {
			loadPrimaryInput()
				.then(clickBtn3)
				.should('have.value', '--:-- --')
				.then(hasReturnVal(''))
				.then(() =>
					cySelectSegment('hrs12')
						.then(use.upArrow)
						.should('have.value', '01:-- --')
						.then(use.rightArrow)
						.then(use.upArrow)
						.should('have.value', '01:00 --')
						.then(use.rightArrow)
						.then(use.upArrow)
						.should('have.value', '01:00 AM')
						.then(clickBtn3)
						.should('have.value', '--:-- --')
				)
		})
	})
}