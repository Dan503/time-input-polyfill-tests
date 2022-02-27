import { Utils } from '../../support/utils'
import { eventTests } from './event-tests'

export class EventTests {
	all: () => void

	constructor(utils: Utils) {
		this.all = () => eventTests(utils)
	}
}
