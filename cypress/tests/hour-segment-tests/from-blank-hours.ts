import { Utils } from "../../support/utils"

export function fromBlankHours(utils: Utils) {
	const { loadPrimaryInput, clearAllSegments, use, a11yHasExpectedHtml, hasReturnVal } = utils

	describe('Hours - From blank', () => {
		incrementBlankHours()
		decrementBlankHours()

		function incrementBlankHours() {
			describe('increment blank hours', () => {
				it('Should increment blank hours --:30 PM to 01:30 PM', () => {
					loadPrimaryInput({ segment: 'hrs12' })
						.then(use.del)
						.should('have.value', '--:30 PM')
						.then(use.upArrow)
						.should('have.value', '01:30 PM')
						.then(a11yHasExpectedHtml(`<p>1.</p>`))
						.then(hasReturnVal('13:30'))
				})

				it('Should increment blank hours from --:-- -- to 01:-- --', () => {
					loadPrimaryInput({ segment: 'hrs12' }).then(() =>
						clearAllSegments('hrs12')
							.then(use.upArrow)
							.should('have.value', '01:-- --')
							.then(a11yHasExpectedHtml(`<p>1.</p>`))
							.then(hasReturnVal(''))
					)
				})
			})
		}

		function decrementBlankHours() {
			describe('decrement blank hours', () => {
				it('Should decrement blank hours --:30 PM to 12:30 PM', () => {
					loadPrimaryInput({ segment: 'hrs12' })
						.then(use.del)
						.should('have.value', '--:30 PM')
						.then(use.downArrow)
						.should('have.value', '12:30 PM')
						.then(a11yHasExpectedHtml(`<p>12.</p>`))
						.then(hasReturnVal('12:30'))
				})

				it('Should decrement blank hours from --:-- -- to 12:-- --', () => {
					loadPrimaryInput({ segment: 'hrs12' }).then(() =>
						clearAllSegments('hrs12')
							.then(use.downArrow)
							.should('have.value', '12:-- --')
							.then(a11yHasExpectedHtml(`<p>12.</p>`))
							.then(hasReturnVal(''))
					)
				})
			})
		}
	})
}
