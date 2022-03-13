import { toLeadingZero } from "@time-input-polyfill/utils"
import { Utils } from "../../support/utils"

export function incrementMinutes(utils: Utils) {
	const { a11yHasExpectedHtml, hasPrimaryCpuValue, loadPrimaryInput, setTime, use } = utils
	describe('Minutes - Increment', () => {
		it('Should increment as expected on up key press', () => {
			loadPrimaryInput({ segment: 'minutes' }).then(() => {
				setTime('12:59 AM', 'minutes').then(() => {
					let a = 0
					while (a < 60) {
						use.upArrow()
							.should('have.value', `12:${toLeadingZero(a)} AM`)
							.then(a11yHasExpectedHtml(`<p>${a}.</p>`))
							.then(hasPrimaryCpuValue(`00:${toLeadingZero(a)}`))
						a++
					}
					// Testing that it loops back around at the end
					use.upArrow()
						.should('have.value', `12:00 AM`)
						.then(a11yHasExpectedHtml(`<p>0.</p>`))
						.then(hasPrimaryCpuValue(`00:00`))
				})
			})
		})
	})
}