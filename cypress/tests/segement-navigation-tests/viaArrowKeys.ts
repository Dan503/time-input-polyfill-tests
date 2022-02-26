import { getCursorSegment, Segment } from "@time-input-polyfill/utils"
import { Utils } from "../../support"

export function viaArrowKeys(utils: Utils) {
	const { $input, a11yHasExpectedHtml, a11yInitialHtml, loadPrimaryInput, use } = utils
	describe('Via Arrow keys', () => {
		it('hours [->] minutes', () => {
			loadPrimaryInput({ segment: 'hrs12' })
				.then(use.rightArrow)
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'minutes'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
				.then(a11yHasExpectedHtml(a11yInitialHtml().minutes))

		})
		it('minutes [->] mode', () => {
			loadPrimaryInput({ segment: 'minutes' })
				.then(use.rightArrow)
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'mode'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
				.then(a11yHasExpectedHtml(a11yInitialHtml().mode))
		})
		it('mode [->] mode', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.rightArrow)
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'mode'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
				.then(a11yHasExpectedHtml(a11yInitialHtml().mode))
		})
		it('mode [<-] minutes', () => {
			loadPrimaryInput({ segment: 'mode' })
				.then(use.leftArrow)
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'minutes'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
				.then(a11yHasExpectedHtml(a11yInitialHtml().minutes))
		})
		it('minutes [<-] hours', () => {
			loadPrimaryInput({ segment: 'minutes' })
				.then(use.leftArrow)
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'hrs12'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
				.then(a11yHasExpectedHtml(a11yInitialHtml().hrs12))
		})
		it('hours [<-] hours', () => {
			loadPrimaryInput({ segment: 'hrs12' })
				.then(use.leftArrow)
				.then((jQueryInputElem) => {
					const segment = getCursorSegment($input(jQueryInputElem))
					const expectation: Segment = 'hrs12'
					expect(segment).to.eq(expectation)
					return jQueryInputElem
				})
				.then(a11yHasExpectedHtml(a11yInitialHtml().hrs12))
		})
	})
}
