// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Registration tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
    const SignUpButton = page.locator('button:has-text("Sign Up"), .hero-descriptor_btn');
    await SignUpButton.click();
    const modaleContainer = page.locator('.modal-content');
    await expect(modaleContainer).toBeVisible();
  });
  test('Registration', async ({ page }) => {
    //Шаги воспроизведения
    await page.locator('#signupName').fill('Test');
    await page.locator('#signupLastName').fill('test');
    await page.locator('#signupEmail').fill(`aqa${Date.now()}@test.com`);
    await page.locator('#signupPassword').fill('Qwerty123!');
    await page.locator('#signupRepeatPassword').fill('Qwerty123!');
    await page.locator('button:has-text("Register"), button.btn.btn-primary:text("Register")').click();

    
    //Ожидаемый результат
    
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    await expect(page.locator('h1')).toHaveText('Garage');
  });

  test('Empty Name Field Validation', async ({ page }) => {
    //Шаги воспроизведения
    await page.locator('#signupName').focus();
    await page.locator('#signupName').blur();

    //Ожидаемый результат
    await expect(page.locator('#signupName ~ .invalid-feedback')).toContainText('Name is required');
    await expect(page.locator('#signupName')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
   
  });
  test ("Wrong data - Name is invalid" , async ({ page }) => {
    //Шаги воспроизведения
    await page.locator('#signupName').fill('!');
    await page.locator('#signupName').blur();

    //Ожидаемый результат
    await expect(page.locator('#signupName ~ .invalid-feedback')).toContainText('Name is invalid');
    await expect(page.locator('#signupName')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
   
  });
  test ("Wrong length Field Name -min" , async ({ page }) => {
    //Шаги воспроизведения
    await page.locator('#signupName').fill('a');
    await page.locator('#signupName').blur();

    //Ожидаемый результат
    await expect(page.locator('#signupName ~ .invalid-feedback')).toContainText('Name has to be from 2 to 20 characters long');
    await expect(page.locator('#signupName')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
   
  });
  test  ("Wrong length Field Name -max" , async ({ page }) => {
    //Шаги воспроизведения
    await page.locator('#signupName').fill('aaaaaaaaaaaaaaaaaaaaa');
    await page.locator('#signupName').blur();

    //Ожидаемый результат
    await expect(page.locator('#signupName ~ .invalid-feedback')).toContainText('Name has to be from 2 to 20 characters long');
    await expect(page.locator('#signupName')).toBeVisible();
    await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
   
  });
  test  ("Empty Last Name Field Validation" , async ({ page }) => {
    //Шаги воспроизведения

    await page.locator('#signupLastName').focus();
    await page.locator('#signupLastName').blur();

    //Ожидаемый результат
    await expect(page.locator('#signupLastName ~ .invalid-feedback')).toContainText('Last name is required');
    await expect(page.locator('#signupLastName')).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
   
  });
  test  ("Wrong length Field Last Name -min" , async ({ page }) => {
    //Шаги воспроизведения
    await page.locator('#signupLastName').fill('a');
    await page.locator('#signupLastName').blur();

    //Ожидаемый результат
    await expect(page.locator('#signupLastName ~ .invalid-feedback')).toContainText('Last name has to be from 2 to 20 characters long');
    await expect(page.locator('#signupLastName')).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
   
  });
  test("Wrong length Field Last Name -max", async ({ page }) => {
    //Шаги воспроизведения
    await page.locator('#signupLastName').fill('aaaaaaaaaaaaaaaaaaaaa');
    await page.locator('#signupLastName').blur();

    //Ожидаемый результат
    await expect(page.locator('#signupLastName ~ .invalid-feedback')).toContainText('Last name has to be from 2 to 20 characters long');
    await expect(page.locator('#signupLastName')).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
   
  });
  test("Wrong data - Last Name is invalid" , async ({ page }) => {
    //Шаги воспроизведения
    await page.locator('#signupLastName').fill('!');
    await page.locator('#signupLastName').blur();
    //Ожидаемый результат
    await expect(page.locator('#signupLastName ~ .invalid-feedback')).toContainText('Last name is invalidLast name has to be from 2 to 20 characters long');
    await expect(page.locator('#signupLastName')).toBeVisible();
    await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');  
   
  });
  });

/*test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/ 

