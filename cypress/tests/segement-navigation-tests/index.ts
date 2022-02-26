import { TestSuite, Utils } from '../../support'
import { viaArrowKeys } from './viaArrowKeys'
import { viaJS } from './viaJS'
// Via Tab Key doesn't work
// import { viaTabKey } from './viaTabKey'

export class SegmentNavigationTests extends TestSuite {
	viaArrowKeys: () => void
	viaJS: () => void
	// viaTabKey:() => void

	constructor(utils: Utils) {
		super(utils)

		this.viaArrowKeys = () => viaArrowKeys(utils)
		this.viaJS = () => viaJS(utils)
		// this.viaTabKey = () => viaTabKey(utils)
	}
}
