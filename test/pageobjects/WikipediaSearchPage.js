import { $ } from '@wdio/globals'
import BasePage from './BasePage.js'

export default class WikipediaSearchPage extends BasePage {
    get searchContainer() {
        return $('id:org.wikipedia:id/search_container')
    }

    get searchInput() {
        return $('id:org.wikipedia:id/search_src_text')
    }

    get openSearchInput() {
        return $('android=new UiSelector().className("android.view.View").instance(2)')
    }

    get openAndWait() {
        return $('android=new UiSelector().className("android.view.View").instance(2)')
    }

    async openSearch() {

        if (await this.searchContainer.isExisting()) {
            await this.waitAndClick(this.searchContainer)
            await this.searchInput.waitForDisplayed({ timeout: 10000 })
        }

        await this.searchInput.waitForDisplayed({ timeout: 10000 })
    }

    async searchArticle(term) {
        await this.openSearch()
        await this.waitAndSetValue(this.searchInput, term)
    }
    async OpenArticle() {
        await this.waitAndClick(this.openSearchInput)
        await this.searchInput.waitForDisplayed({ timeout: 10000 })

        const optionalCloseBtn = await $('~Close')
        if (await optionalCloseBtn.isDisplayed()) {
            await optionalCloseBtn.click()
            console.log("✅ Clicked optional close popup page button")
            await browser.pause(1000)
        }
    }
}
