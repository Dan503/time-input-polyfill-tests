import { Utils } from "../../support/utils"

export function fromBlankMinutes(utils: Utils) {
	const { loadPrimaryInput, clearAllSegments, use, a11yHasExpectedHtml, hasPrimaryCpuValue } = utils
	describe('Minutes - From blank', () => {
		incrementBlankMinutes()
		decrementBlankMinutes()

		function incrementBlankMinutes() {
			describe('increment blank minutes', () => {
				it('Should increment blank minutes 08:-- PM to 01:30 PM', () => {
					loadPrimaryInput({ segment: 'minutes' })
						.then(use.del)
						.should('have.value', '08:-- PM')
						.then(hasPrimaryCpuValue(''))
						.then(use.upArrow)
						.should('have.value', '08:00 PM')
						.then(a11yHasExpectedHtml(`<p>0.</p>`))
						.then(hasPrimaryCpuValue('20:00'))
				})

				it('Should increment blank minutes from --:-- -- to --:00 --', () => {
					loadPrimaryInput().then(() => {
						clearAllSegments('minutes')
							.then(use.upArrow)
							.should('have.value', '--:00 --')
							.then(a11yHasExpectedHtml(`<p>0.</p>`))
							.then(hasPrimaryCpuValue(''))
					})
				})
			})
		}

		function decrementBlankMinutes() {
			describe('decrement blank minutes', () => {
				it('Should decrement blank minutes 08:-- PM to 08:59 PM', () => {
					loadPrimaryInput({ segment: 'minutes' })
						.then(use.del)
						.should('have.value', '08:-- PM')
						.then(hasPrimaryCpuValue(''))
						.then(use.downArrow)
						.should('have.value', '08:59 PM')
						.then(a11yHasExpectedHtml(`<p>59.</p>`))
						.then(hasPrimaryCpuValue('20:59'))
				})

				it('Should decrement blank minutes from --:-- -- to --:59 --', () => {
					loadPrimaryInput({ segment: 'minutes' }).then(() => {
						clearAllSegments('minutes')
							.then(use.downArrow)
							.should('have.value', '--:59 --')
							.then(a11yHasExpectedHtml(`<p>59.</p>`))
							.then(hasPrimaryCpuValue(''))
					})
				})
			})
		}
	})
}
