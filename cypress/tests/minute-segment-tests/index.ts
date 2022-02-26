import { decrementMinutes } from './decrementMinutes'
import { deleteMinutes } from './deleteMinutes'
import { incrementMinutes } from './incrementMinutes'
import { fromBlankMinutes } from './fromBlankMinutes'
import { TestSuite, Utils } from '../../support/utils'

export class MinuteSegmentTests extends TestSuite {
	decrementMinutes: () => void
	deleteMinutes: () => void
	incrementMinutes: () => void
	fromBlankMinutes: () => void

	constructor(utils: Utils) {
		super(utils)

		this.decrementMinutes = () => decrementMinutes(utils)
		this.deleteMinutes = () => deleteMinutes(utils)
		this.incrementMinutes = () => incrementMinutes(utils)
		this.fromBlankMinutes = () => fromBlankMinutes(utils)
	}
}
