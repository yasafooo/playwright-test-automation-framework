# prime-olo-test-automation
Test automation code for prime online ordering 

To run the specific test you can give the vlue for project parameter

npx playwright test --project=api_regression_test

npx playwright test --project=ui_regression_test

To post the resluts to the team web hook

npx test-results-reporter publish -c teams.config.json
