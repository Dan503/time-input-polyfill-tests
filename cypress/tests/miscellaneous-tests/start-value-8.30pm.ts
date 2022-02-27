import { Utils } from "../../support/utils"

export function startTime(utils: Utils) {
	const { loadPrimaryInput } = utils

	it('Should start with value of 08:30 PM', () => {
		loadPrimaryInput().should('have.value', '08:30 PM')
	})
}
