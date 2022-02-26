import { toLeadingZero } from "@time-input-polyfill/utils"
import { Utils } from "../../support"

export function decrementMinutes(utils: Utils) {
	const { loadPrimaryInput, a11yHasExpectedHtml, hasReturnVal, setTime, use } = utils
	it('Should decrement as expected on down key press', () => {
		loadPrimaryInput({ segment: 'minutes' }).then(() => {
			setTime('12:00 AM', 'minutes').then(() => {
				let a = 59
				while (a >= 0) {
					use.downArrow()
						.should('have.value', `12:${toLeadingZero(a)} AM`)
						.then(a11yHasExpectedHtml(`<p>${a}.</p>`))
						.then(hasReturnVal(`00:${toLeadingZero(a)}`))
					a--
				}
				// Testing that it loops back around at the end
				use.downArrow()
					.should('have.value', `12:59 AM`)
					.then(a11yHasExpectedHtml(`<p>59.</p>`))
					.then(hasReturnVal(`00:59`))
			})
		})
	})
}