import { $, browser } from '@wdio/globals'
import { WIKIPEDIA } from '../../config/app.config.js'
import BasePage from './BasePage.js'

export default class WikipediaAppPage extends BasePage {
    async launch() {
        try {
            await browser.terminateApp(WIKIPEDIA.package)
        } catch {
            // app may not be running
        }

        await browser.startActivity(WIKIPEDIA.package, WIKIPEDIA.activity)
        await browser.pause(3000)
    }

    async skipOnboarding() {
        const skipBtn = await $('android=new UiSelector().textContains("Skip")');

        if (await skipBtn.isExisting() && await skipBtn.isDisplayed()) {
            await skipBtn.click()
            console.log("Clicked Skip button")
            await browser.pause(600)
        }

        const optionalBtn = await $('android=new UiSelector().className("android.view.View").instance(2)')
        
        if (await optionalBtn.isDisplayed()) {
            await optionalBtn.click()
            console.log("Clicked optional page button")
            await browser.pause(1000)
        }

        const optionalCloseBtn = await $('~Close')
        if (await optionalCloseBtn.isDisplayed()) {
            await optionalCloseBtn.click()
            console.log("Clicked optional close popup page button")
            await browser.pause(1000)
        }
        console.log(" No onboarding button found - already on main screen")

        const searchEntry = await $(`android=new UiSelector().resourceId("org.wikipedia:id/search_text_view")`)
        if (await searchEntry.isExisting() && await searchEntry.isDisplayed()) {
            return
        }
    }
}
