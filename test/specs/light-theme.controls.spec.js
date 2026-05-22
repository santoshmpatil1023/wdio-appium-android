import { expect, $, browser } from '@wdio/globals'

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

async function isUnchecked(element) {
    const checked = await element.getAttribute('checked')
    return checked === 'false' || checked === false
}

async function isChecked(element) {
    const checked = await element.getAttribute('checked')
    return checked === 'true' || checked === true
}

describe('ApiDemos — Views > Controls > 1. Light Theme', () => {
    beforeEach(async () => {
        await openLightThemeScreen()
    })

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
        const initiallyRadioOff = await isUnchecked(radioOff())
        expect(initiallyRadioOff).toBe(true)
        console.log("Initial state verified")

        await checkbox().click()
        console.log("checkbox clicked")

        expect(await isUnchecked(radioOn())).toBe(true)

        await radioOn().click()

        expect(await isChecked(radioOn())).toBe(true)
        expect(await isUnchecked(radioOff())).toBe(true)
        console.log("Radio selection changed - Negative test passed!")
    })

})
