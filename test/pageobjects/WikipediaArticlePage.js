import { $, browser } from '@wdio/globals'
import { scrollDown } from '../../utils/gestures.js'
import BasePage from './BasePage.js'

export default class WikipediaArticlePage extends BasePage {
    get saveButton() {
        return $('id:org.wikipedia:id/page_save')
    }

    sectionHeading(name) {
        return $(`android=new UiSelector().text("${name}")`)
    }

    async waitForArticleLoaded() {
        await browser.pause(2000)
    }

    async scrollToSection(heading) {
        const section = this.sectionHeading(heading)

        for (let i = 0; i < 20; i++) {
            if (await section.isExisting() && await section.isDisplayed()) {
                return
            }
            await scrollDown()
            await browser.pause(400)
        }

        await section.waitForDisplayed({ timeout: 10000 })
    }

    async saveToReadingList() {
        const saveTargets = [
            () => this.saveButton,
            () => $('android=new UiSelector().descriptionContains("Save")'),
            () => $('android=new UiSelector().textContains("Save")'),
        ]

        for (const getEl of saveTargets) {
            const el = getEl()
            if (await el.isExisting() && await el.isDisplayed()) {
                await this.waitAndClick(() => el)
                await browser.pause(1000)
                return
            }
        }

        await this.waitAndClick(() => this.saveButton)
    }
}
