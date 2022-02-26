import { toggleModeUp } from './toggle-up'
import { toggleModeDown } from './toggle-down'
import { toggleModeFromBlank } from './toggle-from-blank'
import { TestSuite, Utils } from '../../support/utils'

export class ModeSegmentTests extends TestSuite {
	toggleModeUp: () => void
	toggleModeDown: () => void
	toggleModeFromBlank: () => void

	constructor(utils: Utils) {
		super(utils)

		this.toggleModeUp = () => toggleModeUp(utils)
		this.toggleModeDown = () => toggleModeDown(utils)
		this.toggleModeFromBlank = () => toggleModeFromBlank(utils)
	}
}
