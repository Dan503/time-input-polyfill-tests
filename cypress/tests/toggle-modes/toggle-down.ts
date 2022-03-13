import { Utils } from "../../support/utils"

export const toggleModeDown = (utils: Utils) => {
	const { a11yHasExpectedHtml, hasPrimaryCpuValue, loadPrimaryInput, use } = utils
	describe('Mode - DOWN toggle', () => {
		it('DOWN Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.downArrow)
				.should('have.value', '08:30 AM')
				.then(a11yHasExpectedHtml(`<p>AM.</p>`))
				.then(hasPrimaryCpuValue('08:30'))
		})
		it('DOWN DOWN Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.downArrow)
				.then(use.downArrow)
				.should('have.value', '08:30 PM')
				.then(a11yHasExpectedHtml(`<p>PM.</p>`))
				.then(hasPrimaryCpuValue('20:30'))
		})
		it('DOWN UP Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.downArrow)
				.then(use.upArrow)
				.should('have.value', '08:30 PM')
				.then(a11yHasExpectedHtml(`<p>PM.</p>`))
				.then(hasPrimaryCpuValue('20:30'))
		})
	})
}
