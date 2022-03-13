import { Utils } from "../../support/utils"

export const toggleModeUp = (utils: Utils) => {
	const { a11yHasExpectedHtml, hasPrimaryCpuValue, loadPrimaryInput, use } = utils
	describe('Mode - UP toggle', () => {
		it('UP Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.upArrow)
				.should('have.value', '08:30 AM')
				.then(a11yHasExpectedHtml(`<p>AM.</p>`))
				.then(hasPrimaryCpuValue('08:30'))
		})
		it('UP UP Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.upArrow)
				.then(use.upArrow)
				.should('have.value', '08:30 PM')
				.then(a11yHasExpectedHtml(`<p>PM.</p>`))
				.then(hasPrimaryCpuValue('20:30'))
		})
		it('UP DOWN Updates mode correctly', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.upArrow)
				.then(use.upArrow)
				.should('have.value', '08:30 PM')
				.then(a11yHasExpectedHtml(`<p>PM.</p>`))
				.then(hasPrimaryCpuValue('20:30'))
		})
	})
}
