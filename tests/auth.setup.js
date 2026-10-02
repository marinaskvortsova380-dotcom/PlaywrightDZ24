import {test as setup, expect} from '@playwright/test';
import { HomePage } from '../PagesPOM/HomePage';
import { SignInModal } from '../PagesPOM/SignInModal';

const authFile = 'session/userState.json';

setup('Authenticate user and save storage state', async({page}) => {

    const homePage = new HomePage(page);
    const signInModal = new SignInModal(page);
    await homePage.open();
    await homePage.openSignInModal();
    await signInModal.verifyModalVisible();
    await signInModal.login('admin12345@gmail.com', 'Admin123');

    await expect(page).toHaveURL(/.*panel\/garage/);
    await page.context().storageState({ path: authFile });

})