import { test as base } from "@playwright/test";
import { GaragePage } from "../PagesPOM/GaragePage";
const authFile = 'session/userState.json';

export const test = base.extend({
    userGaragePage: async({browser}, use) => {
        const context = await browser.newContext({ storageState: authFile });
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        await garagePage.open();
        await use(garagePage);
        await context.close();
    } 
});
