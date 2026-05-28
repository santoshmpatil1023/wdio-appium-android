import { expect, $, browser } from '@wdio/globals'

const PACKAGE = 'io.appium.android.apis'
const FIRST_ARRAY_ITEM = 'Abbaye de Belloc'

const menuItem = (label) => $(`android=new UiSelector().text("${label}")`)

const scrollToRow = (visibleText) =>
    $(
        `android=new UiScrollable(new UiSelector().scrollable(true)).setMaxSearchSwipes(50).scrollIntoView(new UiSelector().text("${visibleText}"))`,
    )

const listItem = (visibleText) =>
    $(
        `android=new UiSelector().className("android.widget.ListView").childSelector(new UiSelector().text("${visibleText}"))`,
    )

async function scrollToAndTapRow(visibleText, { timeout = 60000 } = {}) {
    await scrollToRow(visibleText).waitForExist({ timeout })

    const row = listItem(visibleText)
    await row.waitForDisplayed({ timeout: 10000 })
    await row.click()
}

async function openArrayListScreen() {
    await browser.startActivity(PACKAGE, '.ApiDemos')
    await browser.pause(2000)

    const views = menuItem('Views')
    await views.waitForDisplayed({ timeout: 15000 })
    await views.click()

    await scrollToAndTapRow('Lists')

    const array = menuItem('01. Array')
    await array.waitForDisplayed({ timeout: 30000 })
    await array.click()

    await listItem(FIRST_ARRAY_ITEM).waitForDisplayed({ timeout: 30000 })
}

describe('ApiDemos — Views > Lists > 01. Array (Day 4)', () => {
    beforeEach(async () => {
        await openArrayListScreen()
    })

    it('scrolls to Matocq, taps it, and verifies we remain on 01. Array screen', async () => {
        await scrollToAndTapRow('Matocq')

        const listContainer = $('android=new UiSelector().className("android.widget.ListView")')
        await listContainer.waitForDisplayed({ timeout: 10000 })
        await expect(listContainer).toBeDisplayed()

        await $(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToBeginning(13)',
        ).waitForExist({ timeout: 30000 })

        const topRow = listItem(FIRST_ARRAY_ITEM)
        await topRow.waitForDisplayed({ timeout: 15000 })
        await expect(topRow).toBeDisplayed()
        await expect(topRow).toHaveText(FIRST_ARRAY_ITEM)
    })
})
