export class GaragePage {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.pageHeader = page.locator('h1');
    }
}