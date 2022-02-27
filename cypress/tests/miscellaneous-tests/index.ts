import { startTime } from './start-value-8.30pm'
import { TestSuite, Utils } from '../../support/utils'
import { isMonoSpaceFont } from './is-monospace-font'

export class MiscellaneousTests extends TestSuite {
	startTime: () => void
	isMonoSpace: () => void

	constructor(utils: Utils) {
		super(utils)

		this.startTime = () => startTime(utils)
		this.isMonoSpace = () => isMonoSpaceFont(utils)
	}
}
