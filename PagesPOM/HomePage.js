export class HomePage {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.URL = 'https://guest:welcome2qauto@qauto.forstudy.space/';
        this.signUpButton = page.locator('button:has-text("Sign Up"), .hero-descriptor_btn');
        this.signInButton = page.locator('button:has-text("Sign In")');
    }
    async open() {
        await this.page.goto(this.URL);
    }
    async openRegistrationModal () {
        await this.signUpButton.click();
    }
    async openSignInModal(){
        await this.signInButton.click();
    }
}