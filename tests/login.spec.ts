import {test, expect} from '@playwright/test';  
import {LoginPage} from '../pages/LoginPage'; //importing the class from loginPage.ts file
import loginData from '../test-data/loginData.json'; //importing the data from loginData.ts file

test('login test', async ({page}) =>{ // page is fixture provided by playwright test runner or global variable
   //Create fist object of the class LoginPage
   const loginPage = new LoginPage(page); //creating an object of the class LoginPage and passing the page object to the constructor
   
   await loginPage.gotoLoginPage(); //calling the method to navigate to the login page

   await loginPage.Login(
      loginData.validUser.username,
      loginData.validUser.password
   ); //calling the method to perform login action

   // await loginPage.verifyLoginSuccess(); //calling the method to verify login success
   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); //Assertion to verify login success
});