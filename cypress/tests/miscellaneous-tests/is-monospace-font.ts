import { Utils } from "../../support/utils"

export function isMonoSpaceFont(utils: Utils) {
	const { loadPrimaryInput } = utils

	it('Should be monospace font by default', () => {
		loadPrimaryInput().then(inputElem => inputElem.css('font-family')).should('eq', 'monospace')
	})
}
