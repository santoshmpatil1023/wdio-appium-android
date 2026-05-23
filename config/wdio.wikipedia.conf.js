import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import allure from '@wdio/allure-reporter'
import { baseConfig } from './wdio.base.conf.js'
import { getWikipediaCapabilities } from './app.config.js'
import { registerCustomCommands } from '../helpers/commands.js'

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const allureResultsDir = path.join(projectRoot, 'allure-results')

export const config = {
    ...baseConfig,
    capabilities: [getWikipediaCapabilities()],
    specs: [path.join(projectRoot, 'test/specs/pom/wikipedia.spec.js').replace(/\\/g, '/')],
    reporters: [
        'spec',
        ['allure', {
            outputDir: allureResultsDir,
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],
    before: async function () {
        registerCustomCommands()

        for (const dir of [
            path.join(projectRoot, 'reports/screenshots'),
            allureResultsDir,
        ]) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true })
            }
        }
    },
    afterTest: async function (test, _context, { error }) {
        if (error) {
            const png = await browser.takeScreenshot()
            const buffer = Buffer.from(png, 'base64')

            allure.addAttachment('Failure screenshot', buffer, 'image/png')

            const safeName = test.title.replace(/\s+/g, '_')
            const file = path.join(projectRoot, 'reports/screenshots', `${safeName}-${Date.now()}.png`)
            await browser.saveScreenshot(file)
        }
    },
}
