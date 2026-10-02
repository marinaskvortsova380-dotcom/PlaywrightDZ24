import { expect } from "@playwright/test";
export class SignInModal {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.modalContainer = page.locator('.modal-content');
        this.emailInput = page.locator('#signinEmail');
        this.passwordInput = page.locator('#signinPassword');
        this.loginButton = page.locator('button:has-text("Login")');

    }
    async verifyModalVisible() {
        await expect(this.modalContainer).toBeVisible();
    }
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
