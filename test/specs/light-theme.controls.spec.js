import { expect, $, browser } from '@wdio/globals'

/**
 * Day 3 — ApiDemos > Views > Controls > 1. Light Theme
 * Intentionally flat (no Page Object Model yet).
 */

const PACKAGE = 'io.appium.android.apis'

const menuItem = (label) => $(`android=new UiSelector().text("${label}")`)

const editField = () => $(`id:${PACKAGE}:id/edit`)
const checkbox = () => $(`id:${PACKAGE}:id/check1`)
const radioOff = () => $(`id:${PACKAGE}:id/radio2`)
const radioOn = () => $(`id:${PACKAGE}:id/radio1`)

async function openLightThemeScreen() {
    await browser.startActivity(PACKAGE, '.ApiDemos')

    await browser.pause(2000)


    const views = await menuItem('Views')
    await views.waitForDisplayed({ timeout: 15000 })
    await views.click()

    const controls = await menuItem('Controls')
    await controls.waitForDisplayed({ timeout: 15000 })
    await controls.click()

    const lightTheme = await menuItem('1. Light Theme')
    await lightTheme.waitForDisplayed({ timeout: 15000 })
    await lightTheme.click()

    await editField().waitForDisplayed({ timeout: 10000 })
}

// isUnchecked() → true when element is NOT selected
async function isUnchecked(element) {
    const checked = await element.getAttribute('checked')
    return checked === 'false' || checked === false
}

// isChecked() → true when element IS selected
async function isChecked(element) {
    const checked = await element.getAttribute('checked')
    return checked === 'true' || checked === true
}

describe('ApiDemos — Views > Controls > 1. Light Theme', () => {
    beforeEach(async () => {
        await openLightThemeScreen()
    })

    //     // Path: ApiDemos > Views > Controls > 1. Light Theme
    //     // •	Enter text in the text field.
    //     // •	Toggle the checkbox.
    //     // •	Click the button.
    //     // •	Assert that the radio button selection changed.

    it('enters text, toggles checkbox, and changes radio selection', async () => {
        const initiallyRadioOff = await isUnchecked(radioOff())
        expect(initiallyRadioOff).toBe(true)

        await editField().setValue('WDIO Day 3')
        await expect(editField()).toHaveText('WDIO Day 3')

        await checkbox().click()
        console.log("checkbox clicked")

        expect(await isUnchecked(radioOn())).toBe(true)

        await radioOn().click()

        expect(await isChecked(radioOn())).toBe(true)
        expect(await isUnchecked(radioOff())).toBe(true)
        console.log("Radio selection changed")
    })

    it('negative: empty text field should not break functionality', async () => {
        // text field empty and verifying the expected state of dependent UI elements.
        // validates negative behavior WITHOUT entering text 

        const initiallyRadioOff = await isUnchecked(radioOff())
        expect(initiallyRadioOff).toBe(true)
        console.log("Initial state verified")

        // DON'T enter text - leave empty

        await checkbox().click()
        console.log("checkbox clicked")

        expect(await isUnchecked(radioOn())).toBe(true)

        await radioOn().click()

        expect(await isChecked(radioOn())).toBe(true)
        expect(await isUnchecked(radioOff())).toBe(true)
        console.log("Radio selection changed - Negative test passed!")
    })

})