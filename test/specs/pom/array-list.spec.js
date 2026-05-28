import { expect } from '@wdio/globals'
import ArrayListPage from '../../pageobjects/ArrayListPage.js'

const arrayList = new ArrayListPage()

describe('POM — Array List', () => {
    beforeEach(async () => {
        await arrayList.open()
    })

    it('scrolls to Matocq, taps it, and verifies list screen then scrolls to top', async () => {
        await arrayList.scrollToAndTapRow('Matocq')

        expect(await arrayList.isListDisplayed()).toBe(true)

        await arrayList.scrollToTop()

        expect(await arrayList.isFirstRowVisible()).toBe(true)
        expect(await arrayList.getFirstRowText()).toBe('Abbaye de Belloc')
    })
})
