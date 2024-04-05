import { test, expect } from '@playwright/test';



test('purchase an item',async ({page},testInfo) => {
  
    await page.goto('https://saucedemo.com')
    await page.getByRole('textbox',{name:'Username'}).fill('standard_user')
   // await page.screenshot({path:'screenshots/username.png',fullPage:true})
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce')
    await page.getByRole('button',{name:'Login'}).click()
    
    //await page.screenshot({path:'screenshots/login.png',fullPage:true})

    await testInfo.attach('Login',{
        body:await page.screenshot(),
        contentType: 'image/png'
    })

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

    const randomIndex = Math.floor(Math.random() * itemsContainer.length)
    const randomItem = itemsContainer[randomIndex]

    const expectedDesc = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Prices: ${expectedPrice} name: ${expectedName} description: ${expectedDesc} `)

    await randomItem .getByRole('button',{name:'Add to cart'}).click()
    await page.locator('a.shopping_cart_link').click()

    expect(page.getByRole('button',{name: 'Checkout'})).toBeVisible()

    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDescription = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectedName)
    expect(actualDescription).toEqual(expectedDesc)
    expect(actualPrice).toEqual(actualPrice)
     
    await page.getByRole('button',{name: 'Checkout'}).click()

     await page.getByRole('textbox',{name:'First Name'}).fill('Goku')
     await page.getByRole('textbox',{name:'Last Name'}).fill('SAyayin')
     await page.getByRole('textbox',{name:'ZIP/Postal Code'}).fill('11000')

     await page.getByRole('button',{name:'Continue'}).click()
     await page.getByRole('button',{name:'Finish'}).click()

     await expect(page.getByRole('heading',{name:'Thank you for your order!'})).toBeVisible()



 // #inventory_container .inventory_item
});