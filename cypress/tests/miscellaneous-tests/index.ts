import { startTime } from './start-value-8.30pm'
import { TestSuite, Utils } from '../../support/utils'

export class MiscellaneousTests extends TestSuite {
	startTime: () => void

	constructor(utils: Utils) {
		super(utils)

		this.startTime = () => startTime(utils)
	}
}
