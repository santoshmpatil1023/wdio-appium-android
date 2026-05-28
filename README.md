# WDIO + Appium Android

Android UI automation with **WebdriverIO 9**, **Appium 3 (UiAutomator2)**, and **Mocha**.

This repo includes:

- **Week 1** — flat specs (selectors in test files)
- **Week 2** — Page Object Model (POM), custom commands, Allure reports
- **Wikipedia E2E** — separate flow with JSON test data

---

## Prerequisites

| Tool | Notes |
|------|--------|
| **Node.js** (LTS) | Required to run WebdriverIO |
| **JDK 17** | Set `JAVA_HOME` |
| **Android SDK** | Set `ANDROID_HOME`; platform-tools on `PATH` |
| **Android emulator** | API 30+ recommended (e.g. Pixel 5) |
| **Appium 2.x** | UiAutomator2 driver installed |

```powershell
npm install -g appium
appium driver install uiautomator2
```

### APKs

| App | Download |
|-----|----------|
| **ApiDemos** | [android-apidemos releases](https://github.com/appium/android-apidemos/releases) |
| **Wikipedia** (optional) | [F-Droid Wikipedia](https://f-droid.org/packages/org.wikipedia/) |

```powershell
adb devices
adb install ApiDemos-debug.apk
```

Start the emulator **before** running tests.

---

## Quick start

```powershell
git clone <your-repo-url>
cd wdio-appium-android
npm install

copy .env.example .env
# Edit .env with your emulator id, Android version, and APK paths

npm test
```

---

## Environment variables (`.env`)

Configuration is loaded from a `.env` file in the project root via **dotenv** (`config/loadEnv.js` → `config/app.config.js`).

1. Copy the template:

   ```powershell
   copy .env.example .env
   ```

2. Set values for your machine:

   | Variable | Description | Example |
   |----------|-------------|---------|
   | `ANDROID_UDID` | Emulator or device id from `adb devices` | `emulator-5554` |
   | `ANDROID_PLATFORM_VERSION` | Android API level on the device | `12.0` |
   | `APK_PATH` | Full path to ApiDemos APK | `C:/Users/Hp/Downloads/ApiDemos-debug.apk` |
   | `WIKIPEDIA_APK_PATH` | Full path to Wikipedia APK | `C:/Users/Hp/Downloads/org.wikipedia_x86_64.apk` |

3. Run tests as usual — no need to edit `wdio.conf.js` for paths.

`.env` is **gitignored**. Commit `.env.example` only.

If a variable is missing, `config/app.config.js` uses built-in fallbacks (same paths as above).

**PowerShell override (one-off):**

```powershell
$env:APK_PATH = "D:\apps\ApiDemos-debug.apk"
npm test
```

---

## Run tests

| Command | Config | What runs |
|---------|--------|-----------|
| `npm test` | `wdio.conf.js` | Week 1 — all flat specs |
| `npm run test:week1` | Same as `npm test` | Week 1 suite |
| `npm run test:pom` | `config/wdio.pom.conf.js` | Week 2 POM + Allure |
| `npm run test:wikipedia` | `config/wdio.wikipedia.conf.js` | Wikipedia E2E only |

**Single spec file:**

```powershell
npx wdio run ./wdio.conf.js --spec test/specs/array-list.spec.js
npx wdio run ./config/wdio.pom.conf.js --spec test/specs/pom/array-list.spec.js
```

**Allure report (after POM or Wikipedia run):**

```powershell
npm run test:pom
npm run allure:report
npm run allure:open
```

- Raw results: `allure-results/`
- HTML report: `allure-report/`
- Failure screenshots (POM/Wikipedia): `reports/screenshots/`

---

## Test scenarios

### Week 1 — flat specs (`test/specs/`)

Run with `npm test`. Locators live in the spec files.

| Day | Spec | App path |
|-----|------|----------|
| 3 | `light-theme.controls.spec.js` | Views → Controls → 1. Light Theme |
| 4 | `array-list.spec.js` | Views → Lists → 01. Array |
| 5 | `date-picker-dialog.spec.js` | Views → Date Widgets → 1. Dialog |

**Day 3 — Light Theme**  
Enter text, toggle checkbox, change radio; negative check on empty text field.

**Day 4 — Array list**  
Scroll to **Matocq** with UiAutomator `scrollIntoView`, tap the list row (not the scroll container), verify still on the Array screen, `scrollToBeginning`, verify first item **Abbaye de Belloc**.

**Day 5 — Date picker**  
Set date to 15 March 2027 and time to 09:30 AM using native picker UI.

### Week 2 — POM (`test/specs/pom/`)

Run with `npm run test:pom`. Specs have **no selectors**; logic is in page objects.

| Spec | Page object |
|------|-------------|
| `light-theme.spec.js` | `LightThemePage` |
| `array-list.spec.js` | `ArrayListPage` |
| `date-picker.spec.js` | `DateWidgetsDialogPage` |

Shared base: `BasePage`, `ApiDemosHomePage`.

**Array list (POM)** — same flow as Day 4: scroll to Matocq → tap → verify list → scroll to top → verify **Abbaye de Belloc**.

### Wikipedia E2E (`test/specs/pom/wikipedia.spec.js`)

Run with `npm run test:wikipedia`. Data from `test/data/wikipedia.json`.

| Page object | Role |
|-------------|------|
| `WikipediaAppPage` | Launch app, skip onboarding |
| `WikipediaSearchPage` | Search and open article |
| `WikipediaArticlePage` | Scroll to section, save to reading list |
| `WikipediaSavedPage` | Open Saved tab, verify article |

---

## Project structure

```
wdio-appium-android/
├── .env                    # Local config (gitignored) — copy from .env.example
├── .env.example            # Template for env vars
├── wdio.conf.js            # Week 1 runner (uses app.config.js)
├── package.json
│
├── config/
│   ├── app.config.js       # Capabilities + env fallbacks
│   ├── loadEnv.js          # Loads .env via dotenv
│   ├── wdio.base.conf.js   # Shared WDIO settings
│   ├── wdio.pom.conf.js    # POM suite + Allure + custom commands
│   ├── wdio.wikipedia.conf.js
│   └── wdio.dev.conf.js    # Optional debug runner
│
├── test/
│   ├── specs/              # Week 1 flat specs
│   ├── specs/pom/          # Week 2 + Wikipedia specs
│   ├── pageobjects/        # POM classes
│   └── data/               # JSON fixtures (e.g. wikipedia.json)
│
├── helpers/
│   └── commands.js         # scrollUntilVisible, longPressElement
├── utils/
│   ├── scroll.js           # UiAutomator scroll helpers
│   ├── gestures.js         # mobile: scrollGesture
│   └── testData.js         # loadFixture()
│
├── docs/                   # Learning notes (Day 1–2)
├── allure-results/
├── allure-report/
└── reports/screenshots/
```

---

## Configuration details

### Capabilities (`config/app.config.js`)

- **ApiDemos** — `getAndroidCapabilities()`  
  Package: `io.appium.android.apis` · Activity: `.ApiDemos`

- **Wikipedia** — `getWikipediaCapabilities()`  
  Package: `org.wikipedia` · Activity: `org.wikipedia.main.MainActivity`

Both read from `process.env` with fallbacks if `.env` is not set.

### Custom commands (`helpers/commands.js`)

Registered in `config/wdio.pom.conf.js` and `config/wdio.wikipedia.conf.js` (`before` hook).

| Command | Example | Purpose |
|---------|---------|---------|
| `browser.scrollUntilVisible('Lists')` | Plain text → UiScrollable scroll | Scroll until row is visible |
| `browser.longPressElement(el, 2000)` | Element or locator | Long press via `mobile: clickGesture` |

### List scrolling tip (Array screen)

`UiScrollable.scrollIntoView()` can return a parent element; clicking it may hit **above** the row.  
Reliable pattern:

1. Scroll with `scrollIntoView`
2. Click the row inside the list:  
   `ListView` + `childSelector(text("Matocq"))`

Used in `ArrayListPage` and `array-list.spec.js`.

---

## Troubleshooting

| Issue | What to try |
|-------|-------------|
| **No device** | Start emulator → `adb devices` |
| **Wrong device** | Set `ANDROID_UDID` in `.env` to match `adb devices` |
| **App not found** | Fix `APK_PATH` / `WIKIPEDIA_APK_PATH` in `.env` |
| **Session / version mismatch** | Align `ANDROID_PLATFORM_VERSION` with emulator API level |
| **Element not found** | Appium Inspector; confirm text/locator; increase scroll swipes |
| **Click hits wrong row** | Use `listItem()` inside `ListView`, not click on `scrollIntoView` result |
| **Full suite fails, one spec passes** | Each spec resets app in `beforeEach`; run full suite with all specs enabled |
| **`.env` not applied** | Ensure `.env` is in project root; restart terminal after editing |

---

## Learning notes

- [Day 1 — Appium architecture](docs/day1-appium-architecture.md)
- [Day 2 — Inspector & locators](docs/day2-appium-inspector-locators.md)

---

## Tech stack

- WebdriverIO 9 · Mocha · Appium 3 · UiAutomator2  
- Allure reporter · dotenv  
- ES modules (`"type": "module"`)
