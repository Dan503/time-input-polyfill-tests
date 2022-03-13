import { Utils } from "../../support/utils"

export function deleteMinutes(utils: Utils) {
	const { a11yHasExpectedHtml, hasPrimaryCpuValue, loadPrimaryInput, use } = utils
	describe('Minutes - Delete', () => {
		it('Should clear minutes on delete key press', () => {
			loadPrimaryInput({ segment: 'minutes' })
				.then(use.del)
				.should('have.value', '08:-- PM')
				.then(a11yHasExpectedHtml(`<p>blank.</p>`))
				.then(hasPrimaryCpuValue(''))
		})
		it('Should clear minutes on backspace key press', () => {
			loadPrimaryInput({ segment: 'minutes' })
				.then(use.backspace)
				.should('have.value', '08:-- PM')
				.then(a11yHasExpectedHtml(`<p>blank.</p>`))
				.then(hasPrimaryCpuValue(''))
		})
	})
}
