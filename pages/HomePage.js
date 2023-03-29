// playwright-dev-page.js
const { expect } = require('@playwright/test');
const testConfig = require('../test.config');

exports.HomePage = class HomePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.getStartedLink = page.locator('a', { hasText: 'Get started' });
        this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
        this.pomLink = page.locator('li', { hasText: 'Guides' }).locator('a', { hasText: 'Page Object Model' });
        this.tocList = page.locator('article div.markdown ul > li > a');
    }

    async goto() {
        await this.page.goto(testConfig().applicationDevUrl);
    }

    async getStarted() {
        await this.getStartedLink.first().click();
        await expect(this.gettingStartedHeader).toBeVisible();
    }

    async pageObjectModel() {
        await this.getStarted();
        await this.pomLink.click();
    }
}