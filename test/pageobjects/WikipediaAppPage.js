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
        const taps = [
            () => $('android=new UiSelector().textContains("Skip")'),
            () => $('android=new UiSelector().text("SKIP")'),
            () => $('id:org.wikipedia:id/fragment_onboarding_skip_button'),
            () => $('android=new UiSelector().text("Continue")'),
            () => $('android=new UiSelector().text("Get started")'),
        ]

        for (let round = 0; round < 6; round++) {
            for (const getEl of taps) {
                const el = getEl()
                if (await el.isExisting() && await el.isDisplayed()) {
                    await el.click()
                    await browser.pause(600)
                }
            }

            const searchEntry = await $('android=new UiSelector().textContains("Search")')
            if (await searchEntry.isExisting() && await searchEntry.isDisplayed()) {
                return
            }
        }
    }
}
