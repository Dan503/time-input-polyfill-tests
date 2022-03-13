import { Utils } from "../../support/utils"

export const manualEntry_0 = (utils: Utils) => {
	const { loadPrimaryInput, a11yHasExpectedHtml, a11yInitialHtml, hasPrimaryCpuValue } = utils
	describe('Manual entry - 0', () => {
		it('0 0 0 0 A', () => {
			loadPrimaryInput({ segment: 'hrs12' })
				.type('0')
				.should('have.value', '12:30 PM')
				.then(a11yHasExpectedHtml('<p>12.</p>'))
				.then(hasPrimaryCpuValue('12:30'))
				.type('0')
				.should('have.value', '12:30 PM')
				.then(a11yHasExpectedHtml(a11yInitialHtml().minutes))
				.then(hasPrimaryCpuValue('12:30'))
				.type('0')
				.should('have.value', '12:00 PM')
				.then(a11yHasExpectedHtml('<p>0.</p>'))
				.then(hasPrimaryCpuValue('12:00'))
				.type('0')
				.should('have.value', '12:00 PM')
				.then(a11yHasExpectedHtml(a11yInitialHtml().mode))
				.then(hasPrimaryCpuValue('12:00'))
				.type('a')
				.should('have.value', '12:00 AM')
				.then(a11yHasExpectedHtml('<p>AM.</p>'))
				.then(hasPrimaryCpuValue('00:00'))
		})
	})
}