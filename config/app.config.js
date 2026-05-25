export const APP = {
    package: 'io.appium.android.apis',
    activity: '.ApiDemos',
}

export const WIKIPEDIA = {
    package: 'org.wikipedia',
    activity: 'org.wikipedia.main.MainActivity',
}

export function getAndroidCapabilities() {
    const udid = process.env.ANDROID_UDID || 'emulator-5554'

    return {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': udid,
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '11.0',
        'appium:udid': udid,
        'appium:app': process.env.APK_PATH || 'C:/Users/Hp/Downloads/ApiDemos-debug.apk',
        'appium:appPackage': APP.package,
        'appium:appActivity': APP.activity,
        'appium:autoGrantPermissions': true,
        'appium:noReset': true,
    }
}

export function getWikipediaCapabilities() {
    const udid = process.env.ANDROID_UDID || 'emulator-5554'
    const caps = {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': udid,
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '12.0',
        'appium:udid': udid,
        'appium:app': process.env.WIKIPEDIA_APK_PATH || 'C:/Users/Hp/Downloads/org.wikipedia_x86_64.apk',

        'appium:appPackage': WIKIPEDIA.package,
        'appium:appActivity': WIKIPEDIA.activity,
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
    }

    return caps
}
