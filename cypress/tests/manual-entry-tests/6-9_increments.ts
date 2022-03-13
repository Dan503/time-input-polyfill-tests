import { toLeadingZero } from "@time-input-polyfill/utils"
import { Utils } from "../../support/utils"

export const manualEntry_6_9 = (utils: Utils) => {
	const { loadPrimaryInput, a11yHasExpectedHtml, a11yInitialHtml, hasPrimaryCpuValue } = utils
	describe('Manual entry - 6-9', () => {
		for (let i = 6; i <= 9; i++) {
			const hr24 = 12 + i
			it(`${i} ${i} A`, () => {
				loadPrimaryInput({ segment: 'hrs12' })
					.type(`${i}`)
					.should('have.value', `0${i}:30 PM`)
					.then(a11yHasExpectedHtml(a11yInitialHtml().minutes))
					.then(hasPrimaryCpuValue(`${hr24}:30`))
					.type(`${i}`)
					.should('have.value', `0${i}:0${i} PM`)
					.then(a11yHasExpectedHtml(a11yInitialHtml().mode))
					.then(hasPrimaryCpuValue(`${hr24}:0${i}`))
					.type(`a`)
					.should('have.value', `0${i}:0${i} AM`)
					.then(a11yHasExpectedHtml('<p>AM.</p>'))
					.then(hasPrimaryCpuValue(`${toLeadingZero(hr24 - 12)}:0${i}`))
			})
		}
	})
}