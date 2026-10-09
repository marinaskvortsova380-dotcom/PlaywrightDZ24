import { test } from "../DZ28Fixtures/userGaragePage";
import { expect } from "@playwright/test";

test.describe('Garage Page tests with UserGaragePage Fixture',() => {
    test('User should be automatically logged in and see Garage header', async ({userGaragePage}) => {
        await expect(userGaragePage.pageHeader).toBeVisible();
        await expect(userGaragePage.pageHeader).toHaveText('Garage');
    });
    test('User should see Add Car button in Garage',async ({userGaragePage})=>{
        await expect(userGaragePage.addCarButton).toBeVisible();
    });
    
});