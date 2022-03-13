import type { Segment } from "@time-input-polyfill/utils"
import type { Utils } from "../../support/utils"
import { staticValues } from "../../../src/core/static-values"

export function toggleButton(utils: Utils) {

	const { loadPrimaryInput, hasPrimaryCpuValue, use, cySelectSegment, cyPrimaryInput, IDs, clickButton } = utils
	const { cpuValue, inputValue } = staticValues.defaultValue

	const clickToggleButton = (segment: Segment) => () => clickButton(IDs.buttonIDs.togglePolyfillID)().then(cySelectSegment(segment))

	/** Time inputs can't be automated other than through direct input like this :( */
	const setNonPolyTime = (newTime: string) => () => cyPrimaryInput().type(newTime)

	describe('Button - Toggle polyfill', () => {
		testToggleWorks()
		testToggleUp()
		testToggleDown()

		function testToggleWorks() {
			it('can toggle on and off', () => {
				loadPrimaryInput()
					.should('have.value', inputValue)
					.then(hasPrimaryCpuValue(cpuValue))
					.then(clickToggleButton('hrs12'))
					.should('have.value', '20:30')
					.then(hasPrimaryCpuValue('20:30'))
					.then(clickToggleButton('hrs12'))
					.should('have.value', '08:30 PM')
			})
		}

		function testToggleUp() {
			describe('up > toggle > up', () => {
				testHrs()
				testMinutes()
				testMode()

				function testHrs() {
					it('hrs: up > toggle > up > toggle > up', () => {
						loadPrimaryInput({ segment: 'hrs12' })
							.then(use.upArrow)
							.should('have.value', '09:30 PM')
							.then(hasPrimaryCpuValue('21:30'))
							.then(clickToggleButton('hrs12'))
							.should('have.value', '21:30')
							.then(setNonPolyTime('22:30'))
							.should('have.value', '22:30')
							.then(hasPrimaryCpuValue('22:30'))
							.then(clickToggleButton('hrs12'))
							.should('have.value', '10:30 PM')
							.then(hasPrimaryCpuValue('22:30'))
							.then(use.upArrow)
							.should('have.value', '11:30 PM')
							.then(hasPrimaryCpuValue('23:30'))
					})
				}

				function testMinutes() {
					it('minutes: up > toggle > up > toggle > up', () => {
						loadPrimaryInput({ segment: 'minutes' })
							.then(use.upArrow)
							.should('have.value', '08:31 PM')
							.then(hasPrimaryCpuValue('20:31'))
							.then(clickToggleButton('minutes'))
							.should('have.value', '20:31')
							.then(setNonPolyTime('20:32'))
							.should('have.value', '20:32')
							.then(hasPrimaryCpuValue('20:32'))
							.then(clickToggleButton('minutes'))
							.should('have.value', '08:32 PM')
							.then(use.upArrow)
							.should('have.value', '08:33 PM')
							.then(hasPrimaryCpuValue('20:33'))
					})
				}

				function testMode() {
					it('mode: up > toggle > up > toggle > up', () => {
						loadPrimaryInput({ segment: 'mode' })
							.then(use.upArrow)
							.should('have.value', '08:30 AM')
							.then(hasPrimaryCpuValue('08:30'))
							.then(clickToggleButton('mode'))
							.should('have.value', '08:30')
							.then(setNonPolyTime('20:30'))
							.then(hasPrimaryCpuValue('20:30'))
							.then(clickToggleButton('mode'))
							.should('have.value', '08:30 PM')
							.then(hasPrimaryCpuValue('20:30'))
							.then(use.upArrow)
							.should('have.value', '08:30 AM')
							.then(hasPrimaryCpuValue('08:30'))
					})
				}
			})
		}

		function testToggleDown() {
			describe('down > toggle > down', () => {
				testHrs()
				testMinutes()
				testMode()

				function testHrs() {
					it('hrs: down > toggle > down > toggle > down', () => {
						loadPrimaryInput({ segment: 'hrs12' })
							.then(use.downArrow)
							.should('have.value', '07:30 PM')
							.then(hasPrimaryCpuValue('19:30'))
							.then(clickToggleButton('hrs12'))
							.should('have.value', '19:30')
							.then(hasPrimaryCpuValue('19:30'))
							.then(setNonPolyTime('18:30'))
							.should('have.value', '18:30')
							.then(hasPrimaryCpuValue('18:30'))
							.then(clickToggleButton('hrs12'))
							.should('have.value', '06:30 PM')
							.then(hasPrimaryCpuValue('18:30'))
							.then(use.downArrow)
							.should('have.value', '05:30 PM')
							.then(hasPrimaryCpuValue('17:30'))
					})
				}

				function testMinutes() {
					it('minutes: down > toggle > down > toggle > down', () => {
						loadPrimaryInput({ segment: 'minutes' })
							.then(use.downArrow)
							.should('have.value', '08:29 PM')
							.then(hasPrimaryCpuValue('20:29'))
							.then(clickToggleButton('minutes'))
							.should('have.value', '20:29')
							.then(hasPrimaryCpuValue('20:29'))
							.then(setNonPolyTime('20:28'))
							.should('have.value', '20:28')
							.then(hasPrimaryCpuValue('20:28'))
							.then(clickToggleButton('minutes'))
							.should('have.value', '08:28 PM')
							.then(hasPrimaryCpuValue('20:28'))
							.then(use.downArrow)
							.should('have.value', '08:27 PM')
							.then(hasPrimaryCpuValue('20:27'))
					})
				}

				function testMode() {
					it('mode: down > toggle > down > toggle > down', () => {
						loadPrimaryInput({ segment: 'mode' })
							.then(use.downArrow)
							.should('have.value', '08:30 AM')
							.then(hasPrimaryCpuValue('08:30'))
							.then(clickToggleButton('mode'))
							.should('have.value', '08:30')
							.then(hasPrimaryCpuValue('08:30'))
							.then(setNonPolyTime('20:30'))
							.then(clickToggleButton('mode'))
							.should('have.value', '08:30 PM')
							.then(hasPrimaryCpuValue('20:30'))
							.then(use.downArrow)
							.should('have.value', '08:30 AM')
							.then(hasPrimaryCpuValue('08:30'))
					})
				}
			})
		}
	})
}