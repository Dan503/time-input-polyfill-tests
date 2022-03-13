import { Utils, TestSuite } from '../../support/utils'
import { inputEventTests, InputEventTestOptions } from './input-event-tests'
import { formSubmitTests } from './form-submit-tests'

export class EventTests extends TestSuite {
	inputEvents: (options?: InputEventTestOptions) => void
	formSubmit: () => void

	constructor(utils: Utils) {
		super(utils)

		this.inputEvents = (options) => inputEventTests(utils, options)
		this.formSubmit = () => formSubmitTests(utils)
	}
}
