import { expect } from '@wdio/globals'
import LightThemePage from '../../pageobjects/LightThemePage.js'
import { loadFixture } from '../../../utils/testData.js'

const lightTheme = new LightThemePage()
const data = loadFixture('light-theme')

describe('POM — Light Theme Controls', () => {
    beforeEach(async () => {
        await lightTheme.open()
    })

    it('enters text, toggles checkbox, and changes radio selection', async () => {
        expect(await lightTheme.isRadioOffInitiallyUnchecked()).toBe(true)

        await lightTheme.enterText(data.positive.text)
        await expect(lightTheme.editField).toHaveText(data.positive.text)

        await lightTheme.toggleCheckbox()
        expect(await lightTheme.isRadioOnUnchecked()).toBe(true)

        await lightTheme.selectRadioOn()

        expect(await lightTheme.isRadioOnChecked()).toBe(true)
        expect(await lightTheme.isRadioOffUnchecked()).toBe(true)
    })

    it('negative: empty text field should not break functionality', async () => {
        expect(await lightTheme.isRadioOffInitiallyUnchecked()).toBe(true)

        await lightTheme.toggleCheckbox()
        expect(await lightTheme.isRadioOnUnchecked()).toBe(true)

        await lightTheme.selectRadioOn()

        expect(await lightTheme.isRadioOnChecked()).toBe(true)
        expect(await lightTheme.isRadioOffUnchecked()).toBe(true)
    })
})
