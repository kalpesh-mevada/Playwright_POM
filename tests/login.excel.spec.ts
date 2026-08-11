import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; //importing the class from loginPage.ts file
import { LoginData, readExcel } from '../utils/excelReader'; //importing the function from excelReader.ts file

const testData: LoginData[] = readExcel('./test-data/LoginExcel.xlsx', 'Sheet1'); //reading the excel file and storing the data in a variable

test.describe('Login Tests from Excel Data', () => {
    for (const data of testData) {
        if (data.run !== 'yes') continue; // Skip this iteration if run is not true
        test(`Login Test for ${data.username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await test.step(`Navigating to login page`, async () => {

                await loginPage.gotoLoginPage();
            })

            //const loginPage = new LoginPage(page); //creating an instance of the LoginPage class
            //await loginPage.gotoLoginPage();
            await test.step(`Performing login with username`, async () => {
                await loginPage.Login(data.username, data.password); //calling the login method from the LoginPage class and passing the username and password from the excel file
            })
            await test.step(`Checking login result`, async () => {
                if (data.expected === 'success') {
                    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                } else {
                    await expect(loginPage.errorMessage).toBeVisible(); //Assertion to verify error message is visible
                }
            })
        })
    }
})