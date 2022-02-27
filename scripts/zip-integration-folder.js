var zipFolder = require('zip-folder')

zipFolder('./cypress/integration', './cypress/integration.zip', (e) => {
	if (e) {
		console.error(e)
	} else {
		console.log('\nSuccessfully zipped the integration folder\n')
	}
})
