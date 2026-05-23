# WDIO + Appium Android

Week 1 — ApiDemos automation with **WebdriverIO + Appium (UiAutomator2)**.  
Flat specs only (no Page Object Model yet).

---

## Prerequisites

- Node.js (LTS)
- JDK 17 — `JAVA_HOME` set
- Android SDK — `ANDROID_HOME` set
- Android emulator (API 30+, e.g. Pixel 5)
- Appium 2.x + UiAutomator2 driver:

```powershell
npm install -g appium
appium driver install uiautomator2
```

- ApiDemos APK — [releases](https://github.com/appium/android-apidemos/releases)

```powershell
adb devices
adb install ApiDemos-debug.apk
```

---

## Setup

```powershell
git clone <your-repo-url>
cd wdio-appium-android
npm install
```

Update `wdio.conf.js` if needed:

| Setting | Default |
|---------|---------|
| `appium:udid` | `emulator-5554` |
| `appium:deviceName` | `emulator-5554` |
| `appium:platformVersion` | `11.0` |
| `appium:app` | path to your `ApiDemos-debug.apk` |
| `appium:appPackage` | `io.appium.android.apis` |
| `appium:appActivity` | `.ApiDemos` |

Start the emulator before running tests.

---

## Run tests

**Full Week 1 suite** — uncomment all specs in `wdio.conf.js`:

```js
specs: [
    './test/specs/light-theme.controls.spec.js',
    './test/specs/array-list.spec.js',
    './test/specs/date-picker-dialog.spec.js',
],
```

```powershell
npm test
```

**Single spec file** — comment out the other two in `wdio.conf.js`, then:

```powershell
npm test
```

Or:

```powershell
npx wdio run ./wdio.conf.js --spec test/specs/light-theme.controls.spec.js
```

---

## Week 1 — Scenarios (no POM)

| Day | Spec | Path in app |
|-----|------|-------------|
| 3 | `light-theme.controls.spec.js` | Views → Controls → 1. Light Theme |
| 4 | `array-list.spec.js` | Views → Lists → 01. Array |
| 5 | `date-picker-dialog.spec.js` | Views → Date Widgets → 1. Dialog |

**Day 3** — enter text, toggle checkbox, change radio; negative test with empty text field.

**Day 4** — scroll to Matocq, tap, verify list screen; scroll back to top.

**Day 5** — set date to 15 March 2027; set time to 09:30 AM (native picker UI).

---

## Project layout

```
wdio.conf.js              # Week 1 runner
config/
  app.config.js           # caps via env vars
  wdio.pom.conf.js        # Week 2 POM runner
test/
  specs/                  # Week 1 flat specs (unchanged)
  specs/pom/              # Week 2 specs (no selectors)
  pageobjects/            # BasePage + feature pages
  data/                   # JSON fixtures
utils/
helpers/
reports/screenshots/      # on failure (POM suite)
docs/
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No device | Start emulator → `adb devices` |
| Wrong device | Match `udid` in `wdio.conf.js` |
| App not found | Install APK or fix `appium:app` path |
| Suite fails, single file passes | Run full suite with all specs enabled; each spec uses `startActivity` in `beforeEach` / `before` |
| Element not found | Use Appium Inspector; check locators in the spec |

---

## Learning notes

- [Day 1 — Appium architecture](docs/day1-appium-architecture.md)
- [Day 2 — Inspector & locators](docs/day2-appium-inspector-locators.md)

---

## Week 2 — POM suite

```powershell
npm run test:pom
```

Env overrides (optional):

```powershell
$env:ANDROID_UDID = "emulator-5554"
$env:APK_PATH = "C:/path/to/ApiDemos-debug.apk"
npm run test:pom
```

| Spec | Page object |
|------|-------------|
| `test/specs/pom/light-theme.spec.js` | `LightThemePage` |
| `test/specs/pom/array-list.spec.js` | `ArrayListPage` |
| `test/specs/pom/date-picker.spec.js` | `DateWidgetsDialogPage` |

Week 1 flat specs in `test/specs/` are **not modified**. Use `npm test` for Week 1.

### Allure report

```powershell
npm run test:pom
npm run allure:report
npm run allure:open
```

Results: `allure-results/` → report in `allure-report/`

### Custom commands (`helpers/commands.js`)

| Command | Usage |
|---------|--------|
| `browser.scrollUntilVisible('Meira')` | Scroll list until row text is visible |
| `browser.longPressElement(element, 2000)` | Long press via `mobile: clickGesture` |

Registered in `config/wdio.pom.conf.js` `before` hook. Used in `ArrayListPage`.

### Wikipedia E2E (Day 9)

Install [Wikipedia APK](https://f-droid.org/packages/org.wikipedia/) on the emulator, then:

```powershell
$env:WIKIPEDIA_APK_PATH = "C:/path/to/wikipedia.apk"
npm run test:wikipedia
```

| Page object | Role |
|-------------|------|
| `WikipediaAppPage` | Launch app, skip onboarding |
| `WikipediaSearchPage` | Search and open article |
| `WikipediaArticlePage` | Scroll to History, save |
| `WikipediaSavedPage` | Verify saved list |

`npm run test:pom` runs ApiDemos POM only. Wikipedia uses its own config (`config/wdio.wikipedia.conf.js`).
