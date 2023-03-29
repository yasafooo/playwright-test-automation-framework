const imageBase64 = require('image-base64');
const {request} = require('@playwright/test');
const testConfigs = require('../test.config');
let stack = [];
let title;

class CustomReporter {
    async onBegin(config, suite) {
      console.log(`Starting the run with ${suite.allTests().length} tests`);
      title = suite.suites[0].suites[0].suites[0].title;
      console.log(`Running ${title}`);
    }
  
    async onTestBegin(test) {
      console.log(`Starting test ${test.title}`);
    }
  
    async onTestEnd(test, result) {
      console.log(`Finished test ${test.title}: ${result.status}`);
      let mtest;
        if (result.attachments[0] !== undefined) {
            mtest = {
                name: test.title,
                id: test.title,
                type: "scenario",
                keyword: "Test Case",
                steps: [{
                    name: test.title,
                    keyword: "Duration",
                    result: {
                        duration: result.duration * 1000 * 1000,
                        error_message: result.status === "failed" ? result.error.stack.replace(/[\u0000-\u001f]/g, "").replace(/\[.*?m/g, " ").replace(/\n/g, " ") : "",
                        status: result.status !== undefined ? result.status : 'skipped',

                    },
                    embeddings: [{
                        data: result.status === "failed" ? imageBase64.local(result.attachments[0].path).replace('data:image/png;base64,', '') : "",
                        mime_type: "image/png"
                    }]
                }]
            };
        } else {
            mtest = {
                name: test.title,
                id: test.title,
                type: "scenario",
                keyword: "Test Case",
                steps: [{
                    name: test.title,
                    keyword: "Duration",
                    result: {
                        duration: result.duration * 1000 * 1000,
                        error_message: result.status === "failed" ? result.error.stack.replace(/[\u0000-\u001f]/g, "").replace(/\[.*?m/g, " ").replace(/\n/g, " ") : "",
                        status: result.status !== undefined ? result.status : 'skipped',

                    },
                    embeddings: [{
                        data: result.status === "failed" ? '' : "",
                        mime_type: "image/png"
                    }]
                }]
            };
        }
    stack.push(mtest);
    }
  
    async onEnd(result) {
      let msuite = {
        env: testConfigs().testEnv,
        duration: '',
        name: title,
        elements: stack
    };
    console.log(JSON.stringify(msuite));
    console.log(`Finished the run: ${result.status}`);
    }

  }
  
  module.exports = CustomReporter;
