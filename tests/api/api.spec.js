// @ts-check
import { test, expect } from '@playwright/test';
let PostManService = require('../../services/PostmanService');
let testName = "Success - Verify Success End Point";
test.describe(testName, async () => {
  test.beforeAll(async () => {
  });

  test.beforeEach(async () => {
  });

  test('Test check the postman status', async ({ request }) => {
    const response = await PostManService().getPostManStatus(request);
    expect.soft(response.ok()).toBeTruthy();
    expect.soft(response.status()).toEqual(200);
    console.log(await response.text());
  });

  test.afterEach(async ({},testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  });

  test.afterAll(async () => {
    console.log('After tests');
  });
});
