import { expect, $, browser } from '@wdio/globals'

/**
 * Day 5 — ApiDemos > Views > Date Widgets > 1. Dialog
 *        — ApiDemos > Views > Time Widgets > 1. Dialog
 * Flat spec (no Page Object Model). Native DatePickerDialog + TimePickerDialog via UI interaction.
 */

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
    // ── Step 1: Click the current year to open year list ──────────
    const currentYear = await $('android=new UiSelector().className("android.widget.TextView").text("2026")')
    await currentYear.waitForDisplayed({ timeout: 10000 })
    await currentYear.click()
    console.log('✅ Year list opened')

    // ── Step 2: Tap 2027 from the year list ───────────────────────
    const year2027 = await $('android=new UiSelector().text("2027")')
    await year2027.waitForDisplayed({ timeout: 10000 })
    await year2027.click()
    console.log('✅ 2027 selected')

    // ── Step 3: Navigate back to March ────────────────────────────
    const prevMonth = await $('//android.widget.ImageButton[@content-desc="Previous month"]')
    await prevMonth.waitForDisplayed({ timeout: 10000 })
    await prevMonth.click()
    console.log('✅ Previous month clicked once')
    await prevMonth.click()
    console.log('✅ Previous month clicked twice — now on March')

    // ── Step 4: Tap day 15 ────────────────────────────────────────
    const day15 = await $('~15 March 2027')
    await day15.waitForDisplayed({ timeout: 10000 })
    await day15.click()
    console.log('✅ Day 15 selected')
}

async function setTimeTo09_30_AM() {
    // ── Step 1: Tap hour 9 on the clock face ──────────────────────
    const hour9 = await $('~9')
    await hour9.waitForDisplayed({ timeout: 10000 })
    await hour9.click()
    console.log('✅ Hour 9 selected')

    // ── Step 2: Tap minute 30 ─────────────────────────────────────
    // Clock automatically switches to minute face after hour tap
    const minute30 = await $('~30')
    await minute30.waitForDisplayed({ timeout: 10000 })
    await minute30.click()
    console.log('✅ Minute 30 selected')

    // ── Step 3: Select AM ─────────────────────────────────────────
    const amLabel = await $('id:android:id/am_label')
    await amLabel.waitForDisplayed({ timeout: 10000 })
    await amLabel.click()
    console.log('✅ AM selected')
}

describe('ApiDemos — Views > Date & Time Widgets > 1. Dialog (Day 5)', () => {

    before(async () => {
        await openDateDialogScreen()
    })

    it('sets date to 15 March 2027 and verifies displayed date', async () => {
        // ── Open date picker ───────────────────────────────────────
        await changeDateButton().click()

        const picker = await $('android=new UiSelector().className("android.widget.DatePicker")')
        await picker.waitForDisplayed({ timeout: 10000 })
        console.log('✅ Date picker opened')

        // ── Set the date ───────────────────────────────────────────
        await setDateTo15March2027()

        // ── Confirm ────────────────────────────────────────────────
        const ok = await datePickerOk()
        await ok.waitForDisplayed({ timeout: 10000 })
        await ok.click()
        console.log('✅ OK clicked')

        // ── Verify — assert date part only, time changes per run ───
        await dateDisplay().waitForDisplayed({ timeout: 10000 })
        await expect(dateDisplay()).toHaveText('3-15-2027', { containing: true })
        console.log('✅ Date verified: 3-15-2027')
    })

    it('sets time to 09:30 AM and verifies displayed time', async () => {
        // ── Open time picker ───────────────────────────────────────
        await changeTimeButton().click()

        const picker = await $('android=new UiSelector().className("android.widget.TimePicker")')
        await picker.waitForDisplayed({ timeout: 10000 })
        console.log('✅ Time picker opened')

        // ── Set the time ───────────────────────────────────────────
        await setTimeTo09_30_AM()

        // ── Confirm ────────────────────────────────────────────────
        const ok = await datePickerOk()
        await ok.waitForDisplayed({ timeout: 10000 })
        await ok.click()
        console.log('✅ OK clicked')

        // ── Verify — assert time part only, date changes per run ───
        await dateDisplay().waitForDisplayed({ timeout: 10000 })
        await expect(dateDisplay()).toHaveText('09:30', { containing: true })
        console.log('✅ Time verified: 09:30')
    })

})