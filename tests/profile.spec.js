import {test, expect} from '@playwright/test';
import { ProfilePage } from '../PagesPOM/ProfilePage';

const authFile = 'session/userState.json';

    test.describe('Profile page mock tests', () => {
        test.use({ storageState: authFile });

        test('Mock user profile response body and verify UI', async ({ page }) => {
            const profilePage = new ProfilePage(page);
            const mockUserData = {
                status: 'ok',
                data: {
                    userId: 1234567,
                    name: 'Lara',
                    lastName: 'Croft',
                }
            };

            await page.route('**/api/users/profile', async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(mockUserData)
                });
            });

            await profilePage.open();
            await expect(profilePage.userName).toBeVisible();
            await expect(profilePage.userName).toContainText('Lara Croft');
        });
    });