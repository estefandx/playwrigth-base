import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';
import * as dotenv from 'dotenv'
import { log } from 'console';
dotenv.config()

test('purchase an item POM ',async ({page}) => {

 const  loginPage = new LoginPage(page)

 await page.goto('https://saucedemo.com')

 await loginPage.LoginWithCredentilas('standard_user','secret_sauce')

 await loginPage.checkSuccesfullLogin()

});


test('navigate',async ({page}) => {
  await  page.goto(process.env.URL)
  await page.pause

});

test('table',async ({page}) => {
    await page.goto('https://cosmocode.io/automation-practice-webtable/')

    const tableContainer = await page.locator("//table[@id='countries']")

    const rows = await tableContainer.locator("//tr").all()

    console.log(rows.length)

    const countries:Country[] =[]


    for(const row of rows) {
        let country:Country={
            name: await row.locator("//td[2]").innerText(),
            capital: await row.locator("//td[3]").innerText(),
            currenct:await row.locator("//td[4]").innerText(),
            primaryLanguaje: await row.locator("//td[5]").innerText(),
        }
        countries.push(country)
    }

   /* for(let country of countries){
        console.log(country)
    }*/

    const countryWherePeopleSpeakPortuguese = countries
    .filter(country => country.primaryLanguaje === 'Portuguese')

    console.log(countryWherePeopleSpeakPortuguese)
    //console.log(`Country Name: ${countryName} Capital: ${countryCapital} Currentcy: ${countryCurrency}`) 

});

interface Country{

    name:string
    capital:string
    currenct:string
    primaryLanguaje:string


}


