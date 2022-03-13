import { staticValues } from "../../.."
import { Utils } from "../../support/utils"

export function inputEventTests(utils: Utils) {
	const { loadEventsInput, cyEventsInput, hasEventsInputValue, hasEventsMainName, hasEventsAltName } = utils

	const keyDown = () => cyEventsInput().trigger('keydown', { key: 'ArrowUp' }).then(cyEventsInput)
	const keyUp = () => cyEventsInput().trigger('keyup', { key: 'ArrowUp' }).then(cyEventsInput)

	const mouseDown = () => cyEventsInput().trigger('mousedown')
	const mouseUp = () => cyEventsInput().trigger('mouseup')

	describe('Input events', () => {
		it('ensures events work', () => {
			loadEventsInput()
				.then(hasEventsInputValue(staticValues.defaultValue.inputValue))
				.then(hasEventsMainName('none'))
				.then(hasEventsAltName('none'))
				.focus()
				.then(hasEventsInputValue('08:30 PM'))
				.then(hasEventsMainName('focus'))
				.then(hasEventsAltName('none'))
				.then(keyDown)
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('keyDown'))
				.then(hasEventsAltName('change'))
				.then(keyUp)
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('keyUp'))
				.then(hasEventsAltName('change'))
				.blur()
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('blur'))
				.then(hasEventsAltName('change'))
				.then(mouseDown)
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('mouseDown'))
				.then(hasEventsAltName('change'))
				.then(mouseUp)
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('mouseUp'))
				// For normal users this would trigger a 'click' event but for Cypress it doesn't
				.then(hasEventsAltName('change'))
				.click()
				.then(hasEventsInputValue('09:30 PM'))
				.then(hasEventsMainName('mouseUp'))
				.then(hasEventsAltName('click'))
		})
	})
}
