import { toLeadingZero } from "@time-input-polyfill/utils"
import { Utils } from "../../support/utils"

export function decrementHours(utils: Utils) {
	const { loadPrimaryInput, a11yHasExpectedHtml, hasPrimaryCpuValue, use } = utils
	describe('Hours - Decrement', () => {
		it('Should decrement hours as expected on down key press', () => {
			loadPrimaryInput({ segment: 'hrs12' }).then(() => {
				let a = 7
				while (a > 0) {
					use.downArrow().should('have.value', `0${a}:30 PM`).then(a11yHasExpectedHtml(`<p>${a}.</p>`)).then(hasPrimaryCpuValue(`${a + 12}:30`))
					a--
				}

				use.downArrow().should('have.value', `12:30 PM`).then(a11yHasExpectedHtml(`<p>12.</p>`)).then(hasPrimaryCpuValue(`12:30`))

				let b = 11
				while (b > 7) {
					use.downArrow().should('have.value', `${toLeadingZero(b)}:30 PM`).then(a11yHasExpectedHtml(`<p>${b}.</p>`)).then(hasPrimaryCpuValue(`${b + 12}:30`))
					b--
				}
			})
		})
	})
}
