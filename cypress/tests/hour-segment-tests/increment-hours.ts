import { Utils } from "../../support/utils"

export function incrementHours(utils: Utils) {
	const { loadPrimaryInput, hasPrimaryCpuValue, use, a11yHasExpectedHtml } = utils

	describe('Hours - Increment', () => {
		it('Should increment hours as expected on up key press', () => {
			loadPrimaryInput({ segment: 'hrs12' }).then(() => {
				use.upArrow().should('have.value', '09:30 PM').then(a11yHasExpectedHtml('<p>9.</p>')).then(hasPrimaryCpuValue('21:30'))
				use.upArrow().should('have.value', '10:30 PM').then(a11yHasExpectedHtml('<p>10.</p>')).then(hasPrimaryCpuValue('22:30'))
				use.upArrow().should('have.value', '11:30 PM').then(a11yHasExpectedHtml('<p>11.</p>')).then(hasPrimaryCpuValue('23:30'))
				use.upArrow().should('have.value', '12:30 PM').then(a11yHasExpectedHtml('<p>12.</p>')).then(hasPrimaryCpuValue('12:30'))
				let i = 1
				while (i < 10) {
					use.upArrow().should('have.value', `0${i}:30 PM`).then(a11yHasExpectedHtml(`<p>${i}.</p>`)).then(hasPrimaryCpuValue(`${i + 12}:30`))
					i++
				}
			})
		})
	})
}
