import { $, browser } from '@wdio/globals'
import { scrollIntoViewByText } from '../utils/scroll.js'

/**
 * Register project-wide custom WDIO commands on browser.
 * Call once from wdio.pom.conf.js `before` hook.
 */
export function registerCustomCommands() {
    browser.addCommand(
        'scrollUntilVisible',
        async function (target, options = {}) {
            const timeout = options.timeout ?? 30000
            let locator = target

            if (typeof target === 'string') {
                const isPlainText = !target.startsWith('~')
                    && !target.startsWith('id:')
                    && !target.includes('android=')
                    && !target.startsWith('//')

                if (isPlainText) {
                    locator = scrollIntoViewByText(target)
                }
            }

            const element = typeof locator === 'string' ? $(locator) : locator
            await element.waitForDisplayed({ timeout })
            return element
        },
        { attachToBrowser: true },
    )

    browser.addCommand(
        'longPressElement',
        async function (target, duration = 2000) {
            const element = typeof target === 'string'
                ? $(target)
                : typeof target === 'function'
                    ? target()
                    : target

            await element.waitForDisplayed({ timeout: 10000 })

            const { x, y, width, height } = await element.getRect()
            await browser.execute('mobile: clickGesture', {
                x: Math.round(x + width / 2),
                y: Math.round(y + height / 2),
                duration,
            })

            return element
        },
        { attachToBrowser: true },
    )
}
