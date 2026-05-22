import { $, browser } from '@wdio/globals'
import { scrollToListTop } from '../../utils/scroll.js'
import ApiDemosHomePage from './ApiDemosHomePage.js'
import BasePage from './BasePage.js'

export default class ArrayListPage extends BasePage {
    home = new ApiDemosHomePage()

    listRow(text) {
        return browser.scrollUntilVisible(text)
    }

    get listContainer() {
        return $('android=new UiSelector().className("android.widget.ListView")')
    }

    get firstVisibleRow() {
        return $('android=new UiSelector().className("android.widget.TextView").instance(0)')
    }

    async open() {
        await this.home.resetToHome()
        await this.home.openViews()
        await this.waitAndClick(() => this.listRow('Lists'))
        await this.waitAndClick(() => this.home.menuItem('01. Array'))
        await this.listRow('Abbaye de Belloc').waitForDisplayed({ timeout: 30000 })
    }

    async scrollToAndTapRow(rowText) {
        const row = await browser.scrollUntilVisible(rowText, { timeout: 30000 })
        await row.click()
    }

    async longPressRow(rowText, duration = 2000) {
        const row = await browser.scrollUntilVisible(rowText, { timeout: 30000 })
        await browser.longPressElement(row, duration)
    }

    async isListDisplayed() {
        await this.listContainer.waitForDisplayed({ timeout: 10000 })
        return this.listContainer.isDisplayed()
    }

    async scrollToTop() {
        await $(scrollToListTop)
        await this.firstVisibleRow.waitForDisplayed({ timeout: 15000 })
    }

    async isFirstRowVisible() {
        return this.firstVisibleRow.isDisplayed()
    }

    async getFirstRowText() {
        return this.getElementText(() => this.firstVisibleRow)
    }
}
