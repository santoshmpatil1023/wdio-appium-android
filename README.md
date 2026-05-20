# WDIO + Appium Android (Learning Program)

WebdriverIO + Appium 2.x automation for **ApiDemos** on a local Android emulator.

## Prerequisites

- Node.js LTS
- JDK 17 (`JAVA_HOME` set)
- Android SDK (`ANDROID_HOME` set) and an emulator (API 30+)
- **ApiDemos** installed: `adb install ApiDemos-debug.apk`
- UiAutomator2 driver: `appium driver install uiautomator2`

Verify device:

```powershell
adb devices
```

## Install

```powershell
npm install
```

## Run tests

1. Start your Android emulator (must match `udid` / `deviceName` in `wdio.conf.js` if you hardcode them).
2. Run:

```powershell
npm test
```

Optional — custom AVD / device name:

```powershell
$env:ANDROID_DEVICE_NAME = "emulator-5554"
npm test
```

## Day 4 scenario (Array / Matocq)

**Path:** ApiDemos → Views → (scroll) Lists → 01. Array

| Test | What it does |
|------|----------------|
| Scroll + tap | `UiScrollable.scrollIntoView` until **Matocq** is visible, tap, assert we remain on the same `01. Array` screen |
| Scroll back up | After scrolling to Matocq, `scrollIntoView` **Aruba** (first row in your build) and assert it is displayed |

Spec file: `test/specs/array-list.spec.js`

This app build shows no visible post-click transition/toast for this row, so the assertion uses a same-screen anchor element.

## Day 3 scenario

**Path:** ApiDemos → Views → Controls → 1. Light Theme

| Test | What it does |
|------|----------------|
| Positive | Text field, checkbox, radio selection flow (see spec for exact steps) |
| Negative | Empty text field; controls still behave as expected |

Spec file: `test/specs/light-theme.controls.spec.js`

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No device | Boot emulator; run `adb devices` |
| App not installed | Install ApiDemos APK (see `docs/` / program appendix) |
| Wrong activity | Capabilities use `appPackage` `io.appium.android.apis` and `appActivity` `.ApiDemos` |
| Element not found | Open **Appium Inspector** on the Light Theme screen and adjust resource ids in the spec |

## Project docs

- [Day 1 — Appium architecture](docs/day1-appium-architecture.md)
