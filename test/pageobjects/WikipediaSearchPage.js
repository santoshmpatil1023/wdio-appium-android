import { $ } from '@wdio/globals'
import BasePage from './BasePage.js'

export default class WikipediaSearchPage extends BasePage {
    get searchContainer() {
        return $('id:org.wikipedia:id/search_container')
    }

    get searchInput() {
        return $('id:org.wikipedia:id/search_src_text')
    }

    async openSearch() {
        const entryPoints = [
            () => this.searchContainer,
            () => $('android=new UiSelector().textContains("Search Wikipedia")'),
            () => $('android=new UiSelector().descriptionContains("Search")'),
        ]

        for (const getEl of entryPoints) {
            const el = getEl()
            if (await el.isExisting()) {
                await this.waitAndClick(() => el)
                await this.searchInput.waitForDisplayed({ timeout: 10000 })
                return
            }
        }

        await this.searchInput.waitForDisplayed({ timeout: 10000 })
    }

    async searchAndOpenArticle(term) {
        await this.openSearch()
        await this.waitAndSetValue(() => this.searchInput, term)

        const result = await $('id:org.wikipedia:id/page_list_item_title')
        await result.waitForDisplayed({ timeout: 15000 })
        await this.waitAndClick(() => result)
    }
}
