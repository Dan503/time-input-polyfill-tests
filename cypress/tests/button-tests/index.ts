import { TestSuite, Utils } from '../../support'
import { button_1 } from './button-1'
import { button_2 } from './button-2'
import { button_3 } from './button-3'
import { toggleButton } from './toggle-polyfill'

export class ButtonTests extends TestSuite {
	am: () => void
	pm: () => void
	blank: () => void
	togglePolyfill: () => void

	constructor(utils: Utils) {
		super(utils)

		this.am = () => button_1(utils)
		this.pm = () => button_2(utils)
		this.blank = () => button_3(utils)
		this.togglePolyfill = () => toggleButton(utils)
	}
}