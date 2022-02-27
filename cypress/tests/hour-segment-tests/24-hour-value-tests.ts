import { toLeadingZero } from "@time-input-polyfill/utils"
import type { Utils } from "../../support/utils"

export const hrs24Values = (utils: Utils) => {
	const { loadPrimaryInput, cyInput, hasReturnVal, use, setTime } = utils

	describe('Hours - 24 hour tests', () => {
		increment()
		decrement()

		function increment() {
			it('increment 00:30 to 23:30', () => {
				loadPrimaryInput().then(() => {
					setTime('12:30 AM', 'hrs12').then(() => {
						for (let i = 0; i < 12; i++) {
							cyInput().then(hasReturnVal(`${toLeadingZero(i)}:30`)).then(use.upArrow)
						}
					})
					setTime('12:30 PM', 'hrs12').then(() => {
						for (let i = 12; i < 24; i++) {
							cyInput().then(hasReturnVal(`${toLeadingZero(i)}:30`)).then(use.upArrow)
						}
					})

				})
			})
		}

		function decrement() {
			it('decrement 00:30 to 23:30', () => {
				loadPrimaryInput().then(() => {
					setTime('11:30 PM', 'hrs12').then(() => {
						for (let i = 23; i > 12; i--) {
							cyInput().then(hasReturnVal(`${toLeadingZero(i)}:30`)).then(use.downArrow)
						}
					})
					setTime('11:30 AM', 'hrs12').then(() => {
						for (let i = 11; i >= 0; i--) {
							cyInput().then(hasReturnVal(`${toLeadingZero(i)}:30`)).then(use.downArrow)
						}
					})
				})
			})
		}
	})
}