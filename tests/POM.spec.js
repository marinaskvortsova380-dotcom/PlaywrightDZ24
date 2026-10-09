import {test, expect} from '@playwright/test';
import { HomePage } from '../PagesPOM/HomePage';
import { RegistrationModal } from '../PagesPOM/RegistrationModal';
import { GaragePage } from '../PagesPOM/GaragePage';

    test.describe('Registration tests (POM)', () => {
        let homePage;
        let registrationModal;
        let garagePage;

        test.beforeEach(async ({ page }) => {
            homePage = new HomePage(page);
            registrationModal = new RegistrationModal(page);
            garagePage = new GaragePage(page);

            await homePage.open();
            await homePage.openRegistrationModal();
            await registrationModal.verifyModalVisible();
        });
        test('Successful registration', async ({ page }) => {
            const uniqueEmail = `aqa${Date.now()}@test.com`;
            await registrationModal.register({
                name: 'Test',
                lastName: 'test',
                email: uniqueEmail,
                password: 'Qwerty123!',
                repeatPassword: 'Qwerty123!'
            });
            await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
            await expect(garagePage.pageHeader).toHaveText('Garage');
        });
        test('Empty name field validation', async () => {
            await registrationModal.triggerNameValidation()
            await expect(registrationModal.nameError).toContainText('Name is required');
            await expect(registrationModal.nameInput).toBeVisible();
            await expect(registrationModal.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
      test('Wrong data - Name is invalid', async() => {
        await registrationModal.fillName('!');
        await expect(registrationModal.nameError).toContainText('Name is invalid');
        await expect(registrationModal.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registrationModal.nameInput).toBeVisible();
      });
      test('Wrong length Field Name -min', async() => {
        await registrationModal.fillName('a');
        await expect(registrationModal.nameError).toContainText('Name has to be from 2 to 20 characters long');
        await expect(registrationModal.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registrationModal.nameInput).toBeVisible();
      });
      test('Wrong length Field Name -max', async() => {
        await registrationModal.fillName('aaaaaaaaaaaaaaaaaaaaaaaaa');
        await expect(registrationModal.nameError).toContainText('Name has to be from 2 to 20 characters long');
        await expect(registrationModal.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registrationModal.nameInput).toBeVisible();
      });
      test('Empty Last Name Field Validation', async() => {
        await registrationModal.triggerLastNameValidation();
        await expect(registrationModal.lastNameError).toContainText('Last name is required');
        await expect(registrationModal.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registrationModal.lastNameInput).toBeVisible();
      });
      test('Wrong length Field Last Name -min', async() => {
        await registrationModal.fillLastName('a');
        await expect(registrationModal.lastNameError).toContainText('Last name has to be from 2 to 20 characters long');
        await expect(registrationModal.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registrationModal.lastNameInput).toBeVisible();
      });
      test('Wrong length Field Last Name -max', async() => {
        await registrationModal.fillLastName('aaaaaaaaaaaaaaaaaaaaa');
        await expect(registrationModal.lastNameError).toContainText('Last name has to be from 2 to 20 characters long');
        await expect(registrationModal.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registrationModal.lastNameInput).toBeVisible();
      });
      test('Wrong data - Last Name is invalid', async() => {
        await registrationModal.fillLastName('!');
        await expect(registrationModal.lastNameError).toContainText('Last name is invalidLast name has to be from 2 to 20 characters long');
        await expect(registrationModal.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registrationModal.lastNameInput).toBeVisible();

      });
    });
    