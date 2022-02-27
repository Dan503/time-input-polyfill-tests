import { expect } from 'chai'
import { getCursorSegment, Segment } from "@time-input-polyfill/utils"
import { Utils } from "../../support/utils"

export function viaJS(utils: Utils) {
	const { $input, a11yHasExpectedHtml, a11yInitialHtml, loadPrimaryInput } = utils
	describe('Segment Navigation - via JS', () => {
		it('Should send focus to hours segment', () => {
			loadPrimaryInput()
				.focus()
				.wait(100)
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'hrs12'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
				.blur()
				.focus()
				.then(a11yHasExpectedHtml(a11yInitialHtml().focus))
		})
	})
}
