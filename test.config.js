require('dotenv').config();
module.exports = function () {
    let setUp = {};
    setUp.applicationDevUrl = "https://playwright.dev/";
    setUp.applicationDevApi = "https://echo.getpostman.com/";
    setUp.testEnv = process.env.TEST_ENVIRONMENT || "DEV";
    return setUp;
};