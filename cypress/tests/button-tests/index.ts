import { Utils } from '../../support'
import { button_1 } from './button-1'
import { button_2 } from './button-2'
import { button_3 } from './button-3'
import { toggleButton } from './toggle-polyfill'

export class ButtonTests {
	am: () => void
	pm: () => void
	blank: () => void
	togglePolyfill: () => void
	all: () => void

	constructor(utils: Utils) {
		this.am = () => button_1(utils)
		this.pm = () => button_2(utils)
		this.blank = () => button_3(utils)
		this.togglePolyfill = () => toggleButton(utils)

		this.all = () => {
			this.am()
			this.pm()
			this.blank()
		}
	}
}