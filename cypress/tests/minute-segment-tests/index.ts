import { decrementMinutes } from './decrementMinutes'
import { deleteMinutes } from './deleteMinutes'
import { incrementMinutes } from './incrementMinutes'
import { fromBlankMinutes } from './fromBlankMinutes'
import { TestSuite, Utils } from '../../support/utils'

export class MinuteSegmentTests extends TestSuite {
	increment: () => void
	decrement: () => void
	delete: () => void
	fromBlank: () => void

	constructor(utils: Utils) {
		super(utils)

		this.increment = () => incrementMinutes(utils)
		this.decrement = () => decrementMinutes(utils)
		this.delete = () => deleteMinutes(utils)
		this.fromBlank = () => fromBlankMinutes(utils)
	}
}
