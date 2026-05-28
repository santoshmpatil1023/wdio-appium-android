import { expect, $, browser } from '@wdio/globals'

const PACKAGE = 'io.appium.android.apis'

const menuItem = (label) => $(`android=new UiSelector().text("${label}")`)
const changeDateButton = () => $(`id:${PACKAGE}:id/pickDate`)
const dateDisplay = () => $(`id:${PACKAGE}:id/dateDisplay`)
const changeTimeButton = () => $(`id:${PACKAGE}:id/pickTime`)
const timeDisplay = () => $(`id:${PACKAGE}:id/timeDisplay`)
const datePickerOk = () => $('id:android:id/button1')

async function openDateDialogScreen() {
    await browser.startActivity(PACKAGE, '.ApiDemos')

    await browser.pause(2000)

    const views = await menuItem('Views')
    await views.waitForDisplayed({ timeout: 15000 })
    await views.click()

    const dateWidgets = await $('~Date Widgets')
    await dateWidgets.waitForDisplayed({ timeout: 15000 })
    await dateWidgets.click()

    const dialog = await menuItem('1. Dialog')
    await dialog.waitForDisplayed({ timeout: 15000 })
    await dialog.click()

    await changeDateButton().waitForDisplayed({ timeout: 10000 })
}

async function setDateTo15March2027() {
    const currentYear = await $('android=new UiSelector().className("android.widget.TextView").text("2026")')
    await currentYear.waitForDisplayed({ timeout: 10000 })
    await currentYear.click()
    console.log(' Year list opened')

    const year2027 = await $('android=new UiSelector().text("2027")')
    await year2027.waitForDisplayed({ timeout: 10000 })
    await year2027.click()
    console.log(' 2027 selected')

    const prevMonth = await $('//android.widget.ImageButton[@content-desc="Previous month"]')
    await prevMonth.waitForDisplayed({ timeout: 10000 })
    await prevMonth.click()
    console.log(' Previous month clicked once')
    await prevMonth.click()
    console.log(' Previous month clicked twice — now on March')

    const day15 = await $('~15 March 2027')
    await day15.waitForDisplayed({ timeout: 10000 })
    await day15.click()
    console.log(' Day 15 selected')
}

async function setTimeTo09_30_AM() {
    const hour9 = await $('~9')
    await hour9.waitForDisplayed({ timeout: 10000 })
    await hour9.click()
    console.log(' Hour 9 selected')

    const minute30 = await $('~30')
    await minute30.waitForDisplayed({ timeout: 10000 })
    await minute30.click()
    console.log(' Minute 30 selected')

    const amLabel = await $('id:android:id/am_label')
    await amLabel.waitForDisplayed({ timeout: 10000 })
    await amLabel.click()
    console.log(' AM selected')
}

describe('ApiDemos — Views > Date & Time Widgets > 1. Dialog (Day 5)', () => {

    before(async () => {
        await openDateDialogScreen()
    })

    it('sets date to 15 March 2027 and verifies displayed date', async () => {
        await changeDateButton().click()

        const picker = await $('android=new UiSelector().className("android.widget.DatePicker")')
        await picker.waitForDisplayed({ timeout: 10000 })
        console.log(' Date picker opened')

        await setDateTo15March2027()

        const ok = await datePickerOk()
        await ok.waitForDisplayed({ timeout: 10000 })
        await ok.click()
        console.log(' OK clicked')

        await dateDisplay().waitForDisplayed({ timeout: 10000 })
        await expect(dateDisplay()).toHaveText('3-15-2027', { containing: true })
        console.log(' Date verified: 3-15-2027')
    })

    it('sets time to 09:30 AM and verifies displayed time', async () => {
        await changeTimeButton().click()

        const picker = await $('android=new UiSelector().className("android.widget.TimePicker")')
        await picker.waitForDisplayed({ timeout: 10000 })
        console.log(' Time picker opened')

        await setTimeTo09_30_AM()

        const ok = await datePickerOk()
        await ok.waitForDisplayed({ timeout: 10000 })
        await ok.click()
        console.log(' OK clicked')

        await dateDisplay().waitForDisplayed({ timeout: 10000 })
        await expect(dateDisplay()).toHaveText('09:30', { containing: true })
        console.log(' Time verified: 09:30')
    })

})
