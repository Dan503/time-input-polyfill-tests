# Time Input Polyfill Tests

This project aims to bring consistent high quality tests to all of my Time Input Polyfill projects.

By incorporating these tests I can feel confident that any current and future time input polyfills behave consistently and as expected.

## Getting started

### Install

```
npm i -D @time-input-polyfill/tests
```

You will also need to install [Cypress](https://www.cypress.io/) into your project:

```
npm install cypress
npx cypress open
```

### Setting up

Then delete everything inside the `cypress/integration` folder and replace it with the contents of this zip file:

https://github.com/Dan503/time-input-polyfill-tests/raw/master/cypress/integration.zip

Next create a `testSuite.js` file in the `cypress/support` folder.

```js
import { TimeInputTestSuite } from '@time-input-polyfill/tests'

export const testSuite = new TimeInputTestSuite({
	localHostUrl: 'http://localhost:3000',
	primaryTestsLabel: 'Label for the primary test input', // default = 'Primary tests'
	eventTestsLabel: 'Label for the events test input', // default = 'Event tests'
})
```

Finally, you will need to create a test component. Model this test component after the test component found here:

https://github.com/Dan503/time-input-polyfill-tests/blob/master/src/TestComponent.tsx

Now run `npx cypress open` to run the tests against your component.
