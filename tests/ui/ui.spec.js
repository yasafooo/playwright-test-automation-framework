// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');
let home;
let testName = "Home Page - Verify Home Page";
test.describe(testName, async () => {
  let page,context,browser;
  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    home = new HomePage(page);
  });

  test.beforeEach(async () => {
    await home.goto();
  });
  
  test('getting started should contain table of contents', async () => {
    await home.getStarted();
    await expect.soft(home.tocList).toHaveText([
      `How to install Playwright`,
      `What's Installed`,
      `How to run the example test`,
      `How to open the HTML test report`,
      `Write tests using web first assertions, page fixtures and locators`,
      `Run single test, multiple tests, headed mode`,
      `Generate tests with Codegen`,
      `See a trace of your tests`
    ]);
  });
  
  test('should show Page Object Model article', async () => {
    await home.pageObjectModel();
    await expect.soft(page.locator('article')).toContainText('Page Object Model is a common pattern');
  });

  test.afterEach(async ({},testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  });

  test.afterAll(async () => {
    await context.close();
    await browser.close();
    console.log('After tests');
  });
});
