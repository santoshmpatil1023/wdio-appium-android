import { $ } from '@wdio/globals'
import BasePage from './BasePage.js'

export default class WikipediaSavedPage extends BasePage {
    async openSavedTab() {
        await this.waitAndClick(() => $('android=new UiSelector().text("Saved")'))
    }

    async openDefaultReadingList() {
        const defaultList = await $('android=new UiSelector().textContains("Default list")')
        if (await defaultList.isExisting() && await defaultList.isDisplayed()) {
            await this.waitAndClick(() => defaultList)
        }
    }

    async isArticleInList(titleFragment) {
        const article = await $(`android=new UiSelector().textContains("${titleFragment}")`)
        await article.waitForDisplayed({ timeout: 15000 })
        return article.isDisplayed()
    }
}
