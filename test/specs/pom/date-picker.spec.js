import { expect } from '@wdio/globals'
import DateWidgetsDialogPage from '../../pageobjects/DateWidgetsDialogPage.js'

const dateWidgets = new DateWidgetsDialogPage()

describe('POM — Date & Time Widgets Dialog', () => {
    beforeEach(async () => {
        await dateWidgets.open()
    })

    it('sets date to 15 March 2027 and verifies displayed date', async () => {
        await dateWidgets.openDatePicker()
        await dateWidgets.selectDate15March2027()
        await dateWidgets.confirmPicker()

        const displayed = await dateWidgets.getDisplayedText()
        expect(displayed).toContain('3-15-2027')
    })

    it('sets time to 09:30 AM and verifies displayed time', async () => {
        await dateWidgets.openTimePicker()
        await dateWidgets.selectTime0930AM()
        await dateWidgets.confirmPicker()

        const displayed = await dateWidgets.getDisplayedText()
        expect(displayed).toContain('09:30')
    })
})
