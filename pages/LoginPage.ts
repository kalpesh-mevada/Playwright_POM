import{Page, Locator, expect} from "@playwright/test";

export class LoginPage {  
    readonly page: Page; //readonly means this can not be accessed outside of the class, it can be access only through the class methods
    readonly username: Locator; //radyonly means this can not be accessed outside of the class, it can be access only through the class methods
    readonly password: Locator; //radyonly means this can not be accessed outside of the class, it can be access only through the class methods
    readonly loginButton: Locator; //radyonly means this can not be accessed outside of the class, it can be access only through the class methods

    constructor(page: Page) { //constructor is a special method that is called when an instance of the class is created
        this.page = page; //this.page means it refer to this page, so this will continue the test for same browser class
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }  
    // add function to perform login action
    async gotoLoginPage(){
        await this.page.goto('https://www.saucedemo.com/');
    } 
    async Login(user:string, pass:string){
        await this.username.fill(user)
        await this.password.fill(pass)
        await this.loginButton.click()
    }
    async verifyLoginSuccess(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }
}