import { Utils } from "../../support"

export const toggleModeDown = (utils: Utils) => {
	const { a11yHasExpectedHtml, hasReturnVal, loadPrimaryInput, use } = utils
	describe('DOWN mode toggle', () => {
		it('DOWN Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.downArrow)
				.should('have.value', '08:30 AM')
				.then(a11yHasExpectedHtml(`<p>AM.</p>`))
				.then(hasReturnVal('08:30'))
		})
		it('DOWN DOWN Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.downArrow)
				.then(use.downArrow)
				.should('have.value', '08:30 PM')
				.then(a11yHasExpectedHtml(`<p>PM.</p>`))
				.then(hasReturnVal('20:30'))
		})
		it('DOWN UP Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.downArrow)
				.then(use.upArrow)
				.should('have.value', '08:30 PM')
				.then(a11yHasExpectedHtml(`<p>PM.</p>`))
				.then(hasReturnVal('20:30'))
		})
	})
}
