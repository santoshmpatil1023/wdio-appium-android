import { browser } from '@wdio/globals'

export async function scrollDown() {
    const { width, height } = await browser.getWindowSize()
    await browser.execute('mobile: scrollGesture', {
        left: Math.round(width / 2),
        top: Math.round(height * 0.7),
        width: 10,
        height: Math.round(height * 0.3),
        direction: 'up',
        percent: 0.75,
    })
}
