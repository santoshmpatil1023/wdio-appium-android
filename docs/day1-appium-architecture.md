---

## Step by Step

### 1. Test Script
I write `await element.click()` in my spec file.
This is just business intent — "click this element."
It doesn't talk to the phone directly.

### 2. WebdriverIO Client
WebdriverIO is the first one to receive `element.click()`.
It converts that JS call into an HTTP request using the
**W3C WebDriver Protocol** and sends it to Appium Server
running on localhost:4723.

WebdriverIO = JS API + HTTP client. That's its only job.

### 3. Appium Server
Appium receives the HTTP request.
Its job is to route the command to the correct
platform-specific driver.
- Android → UiAutomator2 driver
- iOS → XCUITest driver

Appium itself doesn't touch the device directly.
It's the middleman / router.

### 4. UiAutomator2 Driver
This is the Android-specific bridge.
It takes the command from Appium and executes it
on the real device or emulator using **ADB**.

Without this driver, Appium has no idea how to
talk to an Android device.

### 5. ADB (Android Debug Bridge)
ADB is the channel between my machine and the emulator.
The UiAutomator2 driver uses ADB to send the actual
touch/click to the app running on the device.

### 6. Response comes back
Device → UiAutomator2 → Appium → WebdriverIO → my test.
If click succeeded, `await` resolves and test continues.
If it failed (element not found, timeout), WDIO throws
an error and my test fails with a clear message.

---

## Before ANY click works — Session Creation

Before every test run, WDIO sends my `capabilities`
to Appium and Appium creates a **session**.

The session tells Appium:
- Which platform? → Android
- Which driver? → UiAutomator2
- Which device? → Pixel_5_API_30
- Which app? → io.appium.android.apis / .ApiDemos

Without an active session, `element.click()` has
nowhere to go.

---

## Why UiAutomator2 and not something else?

- It's the current standard for Android in Appium 2.x
- Supports all locator strategies I need:
  accessibility id, resource-id, -android uiautomator
- Stable and actively maintained
- Works on both emulators and real devices

---

## Component Summary

| Component        | Job                                          |
|------------------|----------------------------------------------|
| Test Script      | Business intent — what to do                 |
| WebdriverIO      | Converts JS → HTTP request (W3C protocol)    |
| Appium Server    | Routes command to correct platform driver    |
| UiAutomator2     | Executes command on Android via ADB          |
| ADB              | Channel between my machine and the device    |
| Emulator/Device  | Where the actual tap/click happens           |