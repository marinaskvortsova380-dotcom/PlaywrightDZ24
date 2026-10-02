export class ProfilePage{
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page){
        this.page=page;
        this.URL = 'https://guest:welcome2qauto@qauto.forstudy.space/panel/profile';
this.userName = page.locator('.profile_name');
this.editProfileButton = page.locator('button:has text("Edit profile")');
    }
    async open(){
        await this.page.goto(this.URL);
    }
}