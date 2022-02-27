import { toggleModeUp } from './toggle-up'
import { toggleModeDown } from './toggle-down'
import { toggleModeFromBlank } from './toggle-from-blank'
import { TestSuite, Utils } from '../../support/utils'

export class ModeSegmentTests extends TestSuite {
	up: () => void
	down: () => void
	fromBlank: () => void

	constructor(utils: Utils) {
		super(utils)

		this.up = () => toggleModeUp(utils)
		this.down = () => toggleModeDown(utils)
		this.fromBlank = () => toggleModeFromBlank(utils)
	}
}
