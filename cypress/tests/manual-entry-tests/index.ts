import { TestSuite, Utils } from '../../support/utils'
import { manualEntry_0 } from './0_manual-entry'
import { manualEntry_1 } from './1_manual-entry'
import { manualEntry_2_5 } from './2-5_manual-entry'
import { manualEntry_6_9 } from './6-9_increments'
import { manualEntry_other } from './other-manual-entry-tests'

export class ManualEntryTests extends TestSuite {
	_0: () => void
	_1: () => void
	_2_5: () => void
	_6_9: () => void
	other: () => void

	constructor(utils: Utils) {
		super(utils)

		this._0 = () => manualEntry_0(utils)
		this._1 = () => manualEntry_1(utils)
		this._2_5 = () => manualEntry_2_5(utils)
		this._6_9 = () => manualEntry_6_9(utils)
		this.other = () => manualEntry_other(utils)
	}
}
