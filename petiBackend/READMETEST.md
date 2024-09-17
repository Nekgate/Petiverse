## Testing

# Testing Frameworks
+ Mocha: 
A testing framework that provides the structure for writing and running tests.
+ Chai:
An assertion library that works well with Mocha to make assertions in your tests.
+ Supertest:
A utility for testing HTTP requests, ideal for API endpoint testing.
+ Sinon:
A library for creating spies, mocks, and stubs, useful for testing code that interacts with external systems (like databases or APIs) by controlling or observing behavior without real calls.
Running Tests
Install Dependencies: Make sure you have the necessary testing libraries installed:

bash
npm install mocha chai supertest sinon --save-dev

To run all tests in your project, use:

bash

npm test
Test Individual Files: To run tests from a specific file (e.g., registerController.test.js), use:

bash

npx mocha test/registerController.test.js
