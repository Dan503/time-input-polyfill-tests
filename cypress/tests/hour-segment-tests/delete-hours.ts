import { Utils } from "../../support/utils"

export function deleteHours(utils: Utils) {
	const { loadPrimaryInput, a11yHasExpectedHtml, use, hasPrimaryCpuValue } = utils

	describe('Hours - Delete', () => {
		it('Should clear hours on delete key press', () => {
			loadPrimaryInput({ segment: 'hrs12' })
				.then(use.del)
				.should('have.value', '--:30 PM')
				.then(a11yHasExpectedHtml(`<p>blank.</p>`))
				.then(hasPrimaryCpuValue(''))
		})
		it('Should clear hours on backspace key press', () => {
			loadPrimaryInput({ segment: 'hrs12' })
				.then(use.backspace)
				.should('have.value', '--:30 PM')
				.then(a11yHasExpectedHtml(`<p>blank.</p>`))
				.then(hasPrimaryCpuValue(''))
		})
	})
}