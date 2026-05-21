import { $ } from '@wdio/globals'
import { APP } from '../../config/app.config.js'
import ApiDemosHomePage from './ApiDemosHomePage.js'
import BasePage from './BasePage.js'

export default class DateWidgetsDialogPage extends BasePage {
    home = new ApiDemosHomePage()

    get changeDateButton() {
        return $(`id:${APP.package}:id/pickDate`)
    }

    get changeTimeButton() {
        return $(`id:${APP.package}:id/pickTime`)
    }

    get dateDisplay() {
        return $(`id:${APP.package}:id/dateDisplay`)
    }

    get pickerOkButton() {
        return $('id:android:id/button1')
    }

    get datePicker() {
        return $('android=new UiSelector().className("android.widget.DatePicker")')
    }

    get timePicker() {
        return $('android=new UiSelector().className("android.widget.TimePicker")')
    }

    async open() {
        await this.home.resetToHome()
        await this.home.openViews()
        await this.waitAndClick(() => $('~Date Widgets'))
        await this.waitAndClick(() => this.home.menuItem('1. Dialog'))
        await this.changeDateButton.waitForDisplayed({ timeout: 10000 })
    }

    async openDatePicker() {
        await this.waitAndClick(() => this.changeDateButton)
        await this.datePicker.waitForDisplayed({ timeout: 10000 })
    }

    async openTimePicker() {
        await this.waitAndClick(() => this.changeTimeButton)
        await this.timePicker.waitForDisplayed({ timeout: 10000 })
    }

    async selectDate15March2027() {
        const currentYear = await $('android=new UiSelector().className("android.widget.TextView").text("2026")')
        await this.waitAndClick(() => currentYear)

        const year2027 = await $('android=new UiSelector().text("2027")')
        await this.waitAndClick(() => year2027)

        const prevMonth = await $('//android.widget.ImageButton[@content-desc="Previous month"]')
        await this.waitAndClick(() => prevMonth)
        await this.waitAndClick(() => prevMonth)

        const day15 = await $('~15 March 2027')
        await this.waitAndClick(() => day15)
    }

    async selectTime0930AM() {
        const hour9 = await $('~9')
        await this.waitAndClick(() => hour9)

        const minute30 = await $('~30')
        await this.waitAndClick(() => minute30)

        const amLabel = await $('id:android:id/am_label')
        await this.waitAndClick(() => amLabel)
    }

    async confirmPicker() {
        await this.waitAndClick(() => this.pickerOkButton)
    }

    async getDisplayedText() {
        return this.getElementText(() => this.dateDisplay)
    }
}
