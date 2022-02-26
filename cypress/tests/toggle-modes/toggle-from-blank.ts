import { Utils } from "../../support"

export const toggleModeFromBlank = (utils: Utils) => {
	const { a11yHasExpectedHtml, hasReturnVal, loadPrimaryInput, use } = utils
	describe('BLANK mode toggle', () => {
		it('UP from blank mode', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.del)
				.then(use.upArrow)
				.should('have.value', '08:30 AM')
				.then(a11yHasExpectedHtml(`<p>AM.</p>`))
				.then(hasReturnVal('08:30'))
		})
		it('DOWN from blank mode', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.del)
				.then(use.downArrow)
				.should('have.value', '08:30 PM')
				.then(a11yHasExpectedHtml(`<p>PM.</p>`))
				.then(hasReturnVal('20:30'))
		})
	})
}
