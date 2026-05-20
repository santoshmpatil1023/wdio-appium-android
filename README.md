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

## Run Day 3 tests

1. Start your Android emulator.
2. Run:

```powershell
npm test
```

Optional — custom AVD / device name:

```powershell
$env:ANDROID_DEVICE_NAME = "emulator-5554"
npm test
```

## Day 3 scenario

**Path:** ApiDemos → Views → Controls → 1. Light Theme

| Test | What it does |
|------|----------------|
| Positive | Types in the field, checks the box, clicks Toggle, asserts Radio 2 is selected |
| Negative | Leaves the field empty; asserts defaults, then checkbox + toggle still behave |

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
- [Day 2 — Inspector and locators](docs/day2-appium-inspector-locators.md)
