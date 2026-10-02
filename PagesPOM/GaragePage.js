export class GaragePage {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.URL = 'https://guest:welcome2qauto@qauto.forstudy.space/panel/garage'
        this.pageHeader = page.locator('h1');
        this.addCarButton = page.locator('button:has-text("Add car")')
    }
    async open() {
        await this.page.goto(this.URL);
    }
}