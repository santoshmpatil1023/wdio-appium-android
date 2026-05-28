import { getAndroidCapabilities } from './config/app.config.js'

export const config = {

    runner: 'local',

    specs: [
        './test/specs/light-theme.controls.spec.js',
        './test/specs/array-list.spec.js',
        './test/specs/date-picker-dialog.spec.js',
    ],

    exclude: [],

    maxInstances: 1,

    capabilities: [getAndroidCapabilities()],

    logLevel: 'info',

    bail: 0,

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: ['appium'],

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
    },
}
