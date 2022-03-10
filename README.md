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

https://github.com/Dan503/time-input-polyfill-tests/raw/main/cypress/integration.zip

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

https://github.com/Dan503/time-input-polyfill-tests/blob/main/src/TestComponent.tsx

## Running the project

Using a split terminal, have one terminal run `npm run start` (this runs the site) and the other run `npm run test` (this runs the Cypress UI).

Use the Cypress UI to determine what tests to run.

## IMPORTANT: Tab key testing cannot be automated

Due to `event.preventDefault()` not being detected by the automated Tab functionality, it is currently not possible to automate the testing of the Tab key.

Expected Tab functionality:

-   When input receives focus via the Tab key, select the Hours segment
-   While Hours segment is selected, pressing Tab selects the Minutes segment
-   While Minutes segment is selected, pressing Tab selects the Mode segment
-   While Mode segment is selected, pressing Tab sends focus to the next focusable element on the page

Expected Shift + Tab functionality:

-   When input receives focus via Shift + Tab, select the Mode segment
-   While Mode segment is selected, pressing Shift + Tab selects the Minutes segment
-   While Minutes segment is selected, pressing Shift + Tab selects the Hours segment
-   While Hours segment is selected, pressing Shift + Tab sends focus to the previous focusable element on the page
