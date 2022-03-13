import { toLeadingZero } from "@time-input-polyfill/utils"
import { Utils } from "../../support/utils"

export const manualEntry_2_5 = (utils: Utils) => {
	const { loadPrimaryInput, a11yHasExpectedHtml, a11yInitialHtml, hasPrimaryCpuValue } = utils

	describe('Manual entry - 2-5', () => {
		for (let i = 2; i <= 5; i++) {
			const hr24 = 12 + i
			it(`${i} ${i} ${i} A`, () => {
				loadPrimaryInput({ segment: 'hrs12' })
					.type(`${i}`)
					.should('have.value', `0${i}:30 PM`)
					.then(a11yHasExpectedHtml(a11yInitialHtml().minutes))
					.then(hasPrimaryCpuValue(`${hr24}:30`))
					.type(`${i}`)
					.should('have.value', `0${i}:0${i} PM`)
					.then(a11yHasExpectedHtml(`<p>${i}.</p>`))
					.then(hasPrimaryCpuValue(`${hr24}:0${i}`))
					.type(`${i}`)
					.should('have.value', `0${i}:${i}${i} PM`)
					.then(a11yHasExpectedHtml(a11yInitialHtml().mode))
					.then(hasPrimaryCpuValue(`${hr24}:${i}${i}`))
					.type(`a`)
					.should('have.value', `0${i}:${i}${i} AM`)
					.then(a11yHasExpectedHtml(`<p>AM.</p>`))
					.then(hasPrimaryCpuValue(`${toLeadingZero(hr24 - 12)}:${i}${i}`))
			})
		}
	})
}