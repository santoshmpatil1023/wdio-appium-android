import { getAndroidCapabilities } from './app.config.js'

export const baseConfig = {
    runner: 'local',
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
