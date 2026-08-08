import {test, expect} from '@playwright/test';  
import {LoginPage} from '../pages/LoginPage'; //importing the class from loginPage.ts file
import {readCSV} from '../utils/csvReader'; //importing the function from csvReader.ts file
//import loginDataNew from '../test-data/loginDataNew.json';

const loginData = readCSV('test-data/loginData.csv'); //reading the csv file and storing the data in a variable

loginData.forEach((data: any) => {
    if(data.run !== 'true') return;

    test(`Login Test - ${data.username}`, async ({page}) => {
         const loginPage = new LoginPage(page); //creating an instance of the LoginPage class
         await loginPage.gotoLoginPage();
         await loginPage.Login(data.username, data.password); //calling the login method from the LoginPage class and passing the username and password from the csv file

         if(data.expected === 'success') {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
         }else{
            await expect(loginPage.errorMessage).toBeVisible(); //Assertion to verify error message is visible
         }
    })
})