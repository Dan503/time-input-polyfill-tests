import { TestSuite, Utils } from '../../support/utils'
import { button_am } from './am-button'
import { button_pm } from './pm-button'
import { button_blank } from './blank-button'
import { toggleButton } from './toggle-polyfill'

export class ButtonTests extends TestSuite {
	am: () => void
	pm: () => void
	blank: () => void
	togglePolyfill: () => void

	constructor(utils: Utils) {
		super(utils)

		this.am = () => button_am(utils)
		this.pm = () => button_pm(utils)
		this.blank = () => button_blank(utils)
		this.togglePolyfill = () => toggleButton(utils)
	}
}