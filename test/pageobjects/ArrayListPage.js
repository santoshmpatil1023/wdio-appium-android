import { $ } from '@wdio/globals'
import ApiDemosHomePage from './ApiDemosHomePage.js'
import BasePage from './BasePage.js'

const FIRST_ARRAY_ITEM = 'Abbaye de Belloc'

export default class ArrayListPage extends BasePage {
    home = new ApiDemosHomePage()

    scrollToRow(text) {
        return $(
            `android=new UiScrollable(new UiSelector().scrollable(true)).setMaxSearchSwipes(50).scrollIntoView(new UiSelector().text("${text}"))`,
        )
    }

    listItem(text) {
        return $(
            `android=new UiSelector().className("android.widget.ListView").childSelector(new UiSelector().text("${text}"))`,
        )
    }

    get listContainer() {
        return $('android=new UiSelector().className("android.widget.ListView")')
    }

    get firstRow() {
        return this.listItem(FIRST_ARRAY_ITEM)
    }

    async scrollToAndTapRow(rowText, { timeout = 60000 } = {}) {
        await this.scrollToRow(rowText).waitForExist({ timeout })

        const item = this.listItem(rowText)
        await item.waitForDisplayed({ timeout: 10000 })
        await item.click()
    }

    async open() {
        await this.home.resetToHome()
        await this.home.openViews()

        await this.scrollToAndTapRow('Lists')

        await this.waitAndClick(() => this.home.menuItem('01. Array'))
        await this.listItem(FIRST_ARRAY_ITEM).waitForDisplayed({ timeout: 30000 })
    }

    async isListDisplayed() {
        await this.listContainer.waitForDisplayed({ timeout: 10000 })
        return this.listContainer.isDisplayed()
    }

    async scrollToTop() {
        const scrollTop = $(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToBeginning(13)',
        )
        await scrollTop.waitForExist({ timeout: 30000 })
        await this.firstRow.waitForDisplayed({ timeout: 60000 })
    }

    async isFirstRowVisible() {
        return this.firstRow.isDisplayed()
    }

    async getFirstRowText() {
        return this.getElementText(() => this.firstRow)
    }
}
