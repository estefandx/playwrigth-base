import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('mercado libre', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/')
  await page.locator("//input[@id='cb1-edit']").fill('iphone')
  await page.keyboard.press('Enter')

  await expect(page.locator("//ol[contains(@class,'ui-search-layout')]")).toBeVisible()
  //await page.pause()

  const titles = await page.locator("//ol[contains(@class,'ui-search-layout')]//li//h2").allInnerTexts()
  console.log('total products: ',titles.length)
  for (let value of titles) {
     console.log("title product: ", value)
    }

});


test('mercado libre rol accecibility', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/')
  await page.getByRole('link', {name:'Mis compras',exact: true}).click() //exact define que el texto debe ser exacto
  await page.pause()

});