// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Adds Tab support to Cypress
import 'cypress-plugin-tab'

// Import commands.js using ES2015 syntax:
import './commands'

import { TimeInputTestSuite } from '../../index'
import { label, eventTestsLabel } from '../../src/TestComponent'

// Alternatively you can use CommonJS syntax:
// require('./commands')

export * from './utils'
export * from './supportTypes'

export const localHostUrl = 'http://localhost:3000'

export const testSuite = new TimeInputTestSuite({
	localHostUrl,
	primaryTestsLabel: label,
	eventTestsLabel,
})
