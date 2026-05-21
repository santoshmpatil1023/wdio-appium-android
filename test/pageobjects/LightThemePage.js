import { $ } from '@wdio/globals'
import { APP } from '../../config/app.config.js'
import ApiDemosHomePage from './ApiDemosHomePage.js'
import BasePage from './BasePage.js'

export default class LightThemePage extends BasePage {
    home = new ApiDemosHomePage()

    get editField() {
        return $(`id:${APP.package}:id/edit`)
    }

    get checkbox() {
        return $(`id:${APP.package}:id/check1`)
    }

    get radioOn() {
        return $(`id:${APP.package}:id/radio1`)
    }

    get radioOff() {
        return $(`id:${APP.package}:id/radio2`)
    }

    async open() {
        await this.home.resetToHome()
        await this.home.openViews()
        await this.waitAndClick(() => this.home.menuItem('Controls'))
        await this.waitAndClick(() => this.home.menuItem('1. Light Theme'))
        await this.editField.waitForDisplayed({ timeout: 10000 })
    }

    async enterText(text) {
        await this.waitAndSetValue(() => this.editField, text)
    }

    async toggleCheckbox() {
        await this.waitAndClick(() => this.checkbox)
    }

    async selectRadioOn() {
        await this.waitAndClick(() => this.radioOn)
    }

    async isRadioOffInitiallyUnchecked() {
        return this.isUnchecked(() => this.radioOff)
    }

    async isRadioOnUnchecked() {
        return this.isUnchecked(() => this.radioOn)
    }

    async isRadioOnChecked() {
        return this.isChecked(() => this.radioOn)
    }

    async isRadioOffUnchecked() {
        return this.isUnchecked(() => this.radioOff)
    }
}
