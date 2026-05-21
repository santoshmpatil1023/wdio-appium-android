export const APP = {
    package: 'io.appium.android.apis',
    activity: '.ApiDemos',
}

export function getAndroidCapabilities() {
    const udid = process.env.ANDROID_UDID || 'emulator-5556'

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
        'appium:noReset': false,
    }
}
