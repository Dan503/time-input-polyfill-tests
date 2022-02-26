import { getCursorSegment, Segment } from "@time-input-polyfill/utils"
import { Utils } from "../../support"

// These tests don't work
// Cypress Tab plugin doesn't support `event.preventDefault()` yet
// https://github.com/Bkucera/cypress-plugin-tab/issues/52

export function viaTabKey(utils: Utils) {
	const { loadPrimaryInput, use, $input } = utils
	describe('Via Tab key', () => {
		it('hours [tab] minutes', () => {
			loadPrimaryInput({ segment: 'hrs12' })
				.then(use.tab)
				.should('have.focus')
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'minutes'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
		})
		it('minutes [tab] mode', () => {
			loadPrimaryInput({ segment: 'minutes' })
				.then(use.tab)
				.should('have.focus')
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'mode'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
		})
		it('mode [tab] off', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.tab)
				.should('not.have.focus')
		})
		it('mode [shift + tab] minutes', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.shiftTab)
				.should('have.focus')
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'minutes'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
		})
		it('minutes [shift + tab] hours', () => {
			loadPrimaryInput({ segment: 'minutes' })
				.then(use.shiftTab)
				.should('have.focus')
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'hrs12'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
		})
		it('hours [shift + tab] off', () => {
			loadPrimaryInput({ segment: 'hrs12' })
				.then(use.shiftTab)
				.should('not.have.focus')
		})
	})
}