import { expect, $, browser } from '@wdio/globals'

const PACKAGE = 'io.appium.android.apis'

const menuItem = (label) => $(`android=new UiSelector().text("${label}")`)

const listRow = (visibleText) =>
    $(
        `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${visibleText}"))`,
    )

async function openArrayListScreen() {
    await browser.startActivity(PACKAGE, '.ApiDemos')

    await browser.pause(2000)

    const views = await menuItem('Views')
    await views.waitForDisplayed({ timeout: 15000 })
    await views.click()
    console.log("✅ Views clicked")

    const lists = await listRow('Lists')
    await lists.waitForDisplayed({ timeout: 30000 })
    await lists.click()

    const array = await menuItem('01. Array')
    await array.waitForDisplayed({ timeout: 30000 })
    await array.click()

    await listRow('Abbaye de Belloc').waitForDisplayed({ timeout: 30000 })
}

describe('ApiDemos — Views > Lists > 01. Array (Day 4)', () => {
    beforeEach(async () => {
        await openArrayListScreen()
    })

    it('scrolls to Matocq, taps it, and verifies we remain on 01. Array screen', async () => {
        const matocq = await listRow('Matocq')
        await matocq.waitForDisplayed({ timeout: 30000 })
        await expect(matocq).toHaveText('Matocq')

        await matocq.click()
        console.log("matocq clicked");

        const listContainer = await $('android=new UiSelector().className("android.widget.ListView")')
        await listContainer.waitForDisplayed({ timeout: 10000 })
        await expect(listContainer).toBeDisplayed()

        await $(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToBeginning(13)'
        )

        const firstVisibleRow = await $(
            'android=new UiSelector().className("android.widget.TextView").instance(0)'
        )
        await firstVisibleRow.waitForDisplayed({ timeout: 10000 })
        await expect(firstVisibleRow).toBeDisplayed()
        await expect(firstVisibleRow).not.toHaveText('')
        console.log("✅ Scrolled back to top - first visible row is present")
    })
})
