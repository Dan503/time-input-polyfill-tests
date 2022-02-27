import { Utils } from "../../support/utils"

export const manualEntry_1 = (utils: Utils) => {
	const { loadPrimaryInput, a11yHasExpectedHtml, a11yInitialHtml, hasReturnVal } = utils
	describe('Manual entry - 1', () => {
		it('1 1 1 1 A', () => {
			loadPrimaryInput({ segment: 'hrs12' })
				.type('1')
				.should('have.value', '01:30 PM')
				.then(a11yHasExpectedHtml('<p>1.</p>'))
				.then(hasReturnVal('13:30'))
				.type('1')
				.should('have.value', '11:30 PM')
				.then(a11yHasExpectedHtml(a11yInitialHtml().minutes))
				.then(hasReturnVal('23:30'))
				.type('1')
				.should('have.value', '11:01 PM')
				.then(a11yHasExpectedHtml('<p>1.</p>'))
				.then(hasReturnVal('23:01'))
				.type('1')
				.should('have.value', '11:11 PM')
				.then(a11yHasExpectedHtml(a11yInitialHtml().mode))
				.then(hasReturnVal('23:11'))
				.type('a')
				.should('have.value', '11:11 AM')
				.then(a11yHasExpectedHtml('<p>AM.</p>'))
				.then(hasReturnVal('11:11'))
		})
	})
}