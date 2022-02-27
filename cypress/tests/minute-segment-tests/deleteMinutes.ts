import { Utils } from "../../support/utils"

export function deleteMinutes(utils: Utils) {
	const { a11yHasExpectedHtml, hasReturnVal, loadPrimaryInput, use } = utils
	describe('Delete minutes', () => {
		it('Should clear minutes on delete key press', () => {
			loadPrimaryInput({ segment: 'minutes' })
				.then(use.del)
				.should('have.value', '08:-- PM')
				.then(a11yHasExpectedHtml(`<p>blank.</p>`))
				.then(hasReturnVal(''))
		})
		it('Should clear minutes on backspace key press', () => {
			loadPrimaryInput({ segment: 'minutes' })
				.then(use.backspace)
				.should('have.value', '08:-- PM')
				.then(a11yHasExpectedHtml(`<p>blank.</p>`))
				.then(hasReturnVal(''))
		})
	})
}
