import {test, expect} from '@playwright/test';  
import {LoginPage} from '../pages/LoginPage'; //importing the class from loginPage.ts file
import loginDataNew from '../test-data/loginDataNew.json';

loginDataNew.forEach((data) => {
    if(!data.run)  return; // Skip this iteration if run is false
    
    test(`Login Test - ${data.username}`, async ({page}) => {
         const loginPage = new LoginPage(page); //creating an object of the class LoginPage and passing the page object to the constructor
         await loginPage.gotoLoginPage(); //calling the method to navigate to the login page
         await loginPage.Login(data.username, data.password); //calling the method to perform login action

         if(data.expected === 'success') {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); //Assertion to verify login success
         }else{
            await expect(loginPage.errorMessage).toBeVisible(); //Assertion to verify error message is visible
         }
    })
})