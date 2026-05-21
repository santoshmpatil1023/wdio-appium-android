import { $ } from '@wdio/globals'
import BasePage from './BasePage.js'

export default class ApiDemosHomePage extends BasePage {
    get viewsMenu() {
        return $('~Views')
    }

    menuItem(label) {
        return $(`android=new UiSelector().text("${label}")`)
    }

    async resetToHome() {
        await this.resetApp()
        await this.viewsMenu.waitForDisplayed({ timeout: 15000 })
    }

    async openViews() {
        await this.waitAndClick(() => this.menuItem('Views'))
    }
}
