import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { baseConfig } from './wdio.base.conf.js'

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

export const config = {
    ...baseConfig,
    specs: [path.join(projectRoot, 'test/specs/pom/**/*.js').replace(/\\/g, '/')],
    before: async function () {
        const screenshotDir = path.join(projectRoot, 'reports/screenshots')
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true })
        }
    },
    afterTest: async function (test, _context, { error }) {
        if (error) {
            const safeName = test.title.replace(/\s+/g, '_')
            const file = path.join(projectRoot, 'reports/screenshots', `${safeName}-${Date.now()}.png`)
            await browser.saveScreenshot(file)
        }
    },
}
