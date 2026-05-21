import { browser } from '@wdio/globals'
import { APP } from '../../config/app.config.js'

export default class BasePage {
    async waitAndClick(element, timeout = 10000) {
        const el = typeof element === 'function' ? element() : element
        await el.waitForDisplayed({ timeout })
        await el.click()
    }

    async waitAndSetValue(element, value, timeout = 10000) {
        const el = typeof element === 'function' ? element() : element
        await el.waitForDisplayed({ timeout })
        await el.setValue(value)
    }

    async getElementText(element, timeout = 10000) {
        const el = typeof element === 'function' ? element() : element
        await el.waitForDisplayed({ timeout })
        return el.getText()
    }

    async isChecked(element) {
        const el = typeof element === 'function' ? element() : element
        const checked = await el.getAttribute('checked')
        return checked === 'true' || checked === true
    }

    async isUnchecked(element) {
        return !(await this.isChecked(element))
    }

    async resetApp() {
        await browser.startActivity(APP.package, APP.activity)
        await browser.pause(2000)
    }
}
