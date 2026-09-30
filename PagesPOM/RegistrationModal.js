import { expect } from "@playwright/test";
export class RegistrationModal {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.modalContainer = page.locator('.modal-content');
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');
        this.registerButton = page.locator('button:has-text("Register"), button.btn.btn-primary:text("Register")');
        
        this.nameError = page.locator('#signupName ~ .invalid-feedback');
        this.lastNameError = page.locator('#signupLastName ~ .invalid-feedback');
        this.emailError = page.locator('#signupEmail ~ .invalid-feedback');
        this.passwordError = page.locator('#signupPassword ~ .invalid-feedback');
        this.repeatPasswordError = page.locator('#signupRepeatPassword ~ .invalid-feedback');
    }


    async verifyModalVisible() {
      await expect(this.modalContainer).toBeVisible();
    }
    async triggerNameValidation() {
      await this.nameInput.focus();
      await this.nameInput.blur();

    }
    async triggerLastNameValidation() {
        await this.lastNameInput.focus();
        await this.lastNameInput.blur();
    }
    async fillName(name) {
        await this.nameInput.fill(name);
        await this.nameInput.blur();
    }
    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
        await this.lastNameInput.blur();
    }
    async register({name, lastName, email, password, repeatPassword}) {
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.repeatPasswordInput.fill(repeatPassword);
        await this.registerButton.click();
    }
}