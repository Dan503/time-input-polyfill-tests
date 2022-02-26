import { Utils } from "../../support"

export const toggleModeUp = (utils: Utils) => {
	const { a11yHasExpectedHtml, hasReturnVal, loadPrimaryInput, use } = utils
	describe('UP mode toggle', () => {
		it('UP Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.upArrow)
				.should('have.value', '08:30 AM')
				.then(a11yHasExpectedHtml(`<p>AM.</p>`))
				.then(hasReturnVal('08:30'))
		})
		it('UP UP Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.upArrow)
				.then(use.upArrow)
				.should('have.value', '08:30 PM')
				.then(a11yHasExpectedHtml(`<p>PM.</p>`))
				.then(hasReturnVal('20:30'))
		})
		it('UP DOWN Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.upArrow)
				.then(use.upArrow)
				.should('have.value', '08:30 PM')
				.then(a11yHasExpectedHtml(`<p>PM.</p>`))
				.then(hasReturnVal('20:30'))
		})
	})
}
