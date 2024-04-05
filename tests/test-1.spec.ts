import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByPlaceholder('Buscar productos, marcas y má').click();
  await page.getByPlaceholder('Buscar productos, marcas y má').fill('carrros');
  await page.getByRole('button', { name: 'Buscar' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Toyota Fortuner 2.7 Sr5 4x4' }).click();
  const page1 = await page1Promise;
  await page1.getByText('Vehículo en excelentes').click();
});