import { staticValues } from "../../.."
import { Utils } from "../../support/utils"

export type InputEventTestOptions = {
	/**
	 * Set to `false` if events are fired before component state has settled.
	 *
	 * Depending on how the polyfill is implemented, the events may or may not be synchronized.
	 * Eg. There is a delay between the keyDown event firing and the React state updating in the React version of the polyfill.
	 *
	 * Due to the event getting fired before the state has settled, the value ends up being out of sync with the state in React.
	 * It is out of scope to adjust the timing of all possible events so that they align with when the state has finished updating.
	 *
	 * @default true
	 */
	hasSynchronizedEvents?: boolean
}

export function inputEventTests(utils: Utils, { hasSynchronizedEvents = true }: InputEventTestOptions = {}) {
	const { loadEventsInput, cyEventsInput, hasEventsInputValue, hasEventsDisplayValue, hasEventsMainName, hasEventsAltName } = utils

	const keyDown = () => cyEventsInput().trigger('keydown', { key: 'ArrowUp' }).then(cyEventsInput)
	const keyUp = () => cyEventsInput().trigger('keyup', { key: 'ArrowUp' }).then(cyEventsInput)

	const mouseDown = () => cyEventsInput().trigger('mousedown')
	const mouseUp = () => cyEventsInput().trigger('mouseup')

	describe('Input events', () => {
		it('ensures input events work', () => {
			loadEventsInput()
				.then(hasEventsInputValue(staticValues.defaultValue.inputValue))
				.then(hasEventsMainName('none'))
				.then(hasEventsAltName('none'))
				.focus()
				.then(hasEventsDisplayValue('08:30 PM'))
				.then(hasEventsInputValue('08:30 PM'))
				.then(hasEventsMainName('focus'))
				.then(hasEventsAltName('none'))
				.then(keyDown)

				.then(hasEventsDisplayValue(hasSynchronizedEvents ? '09:30 PM' : '08:30 PM'))
				.then(hasEventsInputValue('09:30 PM'))

				.then(hasEventsMainName('keyDown'))
				.then(hasEventsAltName('change'))
				.then(keyUp)
				.then(hasEventsDisplayValue('09:30 PM'))
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('keyUp'))
				.then(hasEventsAltName('change'))
				.blur()
				.then(hasEventsDisplayValue('09:30 PM'))
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('blur'))
				.then(hasEventsAltName('change'))
				.then(mouseDown)
				.then(hasEventsDisplayValue('09:30 PM'))
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('mouseDown'))
				.then(hasEventsAltName('change'))
				.then(mouseUp)
				.then(hasEventsDisplayValue('09:30 PM'))
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('mouseUp'))
				// For normal users this would trigger a 'click' event but for Cypress it doesn't
				.then(hasEventsAltName('change'))
				.click()
				.then(hasEventsDisplayValue('09:30 PM'))
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('mouseUp'))
				.then(hasEventsAltName('click'))
		})
	})
}
