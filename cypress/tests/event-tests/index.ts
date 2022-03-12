import { Utils, TestSuite } from '../../support/utils'
import { inputEventTests } from './input-event-tests'
import { formSubmitTests } from './form-submit-tests'

export class EventTests extends TestSuite {
	inputEvents: () => void
	formSubmit: () => void

	constructor(utils: Utils) {
		super(utils)

		this.inputEvents = () => inputEventTests(utils)
		this.formSubmit = () => formSubmitTests(utils)
	}
}
