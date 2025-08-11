import { test, expect } from '@playwright/test';

// Test para verificar el login y la visualización de productos en saucedemo

test('login y ver productos', async ({ page }, testInfo) => {
  await page.goto('https://saucedemo.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await testInfo.attach('Login', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Verifica que los productos se muestran
  const items = await page.locator('#inventory_container .inventory_item').all();
  expect(items.length).toBeGreaterThan(0);

  // Verifica que el nombre y precio del primer producto existen
  const firstItem = items[0];
  const name = await firstItem.locator('.inventory_item_name').innerText();
  const price = await firstItem.locator('.inventory_item_price').innerText();
  expect(name).not.toBe('');
  expect(price).toMatch(/\$/);

  // Adjunta screenshot de productos
  await testInfo.attach('Productos', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});
