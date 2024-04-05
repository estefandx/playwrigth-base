import { Locator, Page, expect } from "@playwright/test"

export class LoginPage {

    private readonly usernameTextbox: Locator
    private readonly PasswordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator

    constructor(page: Page) {
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' })
        this.PasswordTextbox = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.shoppingCartIcon = page.locator("//a[contains(@class,'shopping_cart_link')]")
    }

    async fillUsername(username: string) {
        await this.usernameTextbox.fill(username)
    }

    async fillPassword(Password: string) {
        await this.PasswordTextbox.fill(Password)
    }

    async clickOnLogin() {
        await this.loginButton.click()
    }


    async LoginWithCredentilas(username:string,passwod:string){
        await this.fillUsername(username)
        await this.fillPassword(passwod)
        await this.clickOnLogin()
    }

    async checkSuccesfullLogin(){
          await expect(this.shoppingCartIcon).toBeVisible()
    }

}