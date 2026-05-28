# wdio-appium-android

WebdriverIO + Appium (UiAutomator2) automation for Android ApiDemos and Wikipedia.

## Requirements

- Node.js (LTS)
- JDK 17 (`JAVA_HOME` set)
- Android SDK (`ANDROID_HOME` set)
- Appium 2 + UiAutomator2 driver
- Android emulator or device

```powershell
npm install -g appium
appium driver install uiautomator2
adb devices
```

APKs: [ApiDemos](https://github.com/appium/android-apidemos/releases) · [Wikipedia](https://f-droid.org/packages/org.wikipedia/) (for Wikipedia test only)

## Setup

```powershell
npm install
copy .env.example .env
```

Edit `.env`:

```
ANDROID_UDID=emulator-5554
ANDROID_PLATFORM_VERSION=12.0
APK_PATH=C:/path/to/ApiDemos-debug.apk
WIKIPEDIA_APK_PATH=C:/path/to/wikipedia.apk
```

Values are read in `config/app.config.js` (with fallbacks if `.env` is missing).

## Run

```powershell
npm test                 # Week 1 flat specs
npm run test:pom         # ApiDemos POM specs + Allure
npm run test:wikipedia   # Wikipedia E2E only
```

Single file:

```powershell
npx wdio run ./wdio.conf.js --spec test/specs/array-list.spec.js
npx wdio run ./config/wdio.pom.conf.js --spec test/specs/pom/array-list.spec.js
```

Allure (after `test:pom` or `test:wikipedia`):

```powershell
npm run allure:report
npm run allure:open
```

## Tests

**Week 1** (`test/specs/`) — selectors in spec files

| File | Screen |
|------|--------|
| `light-theme.controls.spec.js` | Views → Controls → Light Theme |
| `array-list.spec.js` | Views → Lists → 01. Array |
| `date-picker-dialog.spec.js` | Views → Date Widgets → Dialog |

**POM** (`test/specs/pom/` + `test/pageobjects/`)

| Spec | Page object |
|------|-------------|
| `light-theme.spec.js` | `LightThemePage` |
| `array-list.spec.js` | `ArrayListPage` |
| `date-picker.spec.js` | `DateWidgetsDialogPage` |
| `wikipedia.spec.js` | `WikipediaAppPage`, `WikipediaSearchPage`, `WikipediaArticlePage`, `WikipediaSavedPage` |

Test data: `test/data/light-theme.json`, `test/data/wikipedia.json` (loaded via `utils/testData.js`).

## Project layout

```
wdio.conf.js              # Week 1 config
config/
  app.config.js           # capabilities, .env
  loadEnv.js
  wdio.base.conf.js
  wdio.pom.conf.js
  wdio.wikipedia.conf.js
test/specs/               # Week 1
test/specs/pom/           # POM + Wikipedia
test/pageobjects/
test/data/
utils/
  gestures.js             # scrollDown (Wikipedia article scroll)
  testData.js
docs/                     # Day 1–2 notes
```

## Config

- `wdio.conf.js` → `getAndroidCapabilities()` from `app.config.js`
- `wdio.pom.conf.js` → ApiDemos POM specs, Allure, failure screenshots in `reports/screenshots/`
- `wdio.wikipedia.conf.js` → Wikipedia caps + `wikipedia.spec.js`

App under test: `io.appium.android.apis` / `.ApiDemos`

## Array list scrolling

1. Scroll with `UiScrollable.scrollIntoView(text)`
2. Click row inside list: `ListView` + `childSelector(text("..."))` — avoids tapping above the row

## Troubleshooting

- **No device** — start emulator, check `adb devices`, set `ANDROID_UDID`
- **App not installed** — fix `APK_PATH` in `.env`
- **Wrong Android version** — match `ANDROID_PLATFORM_VERSION` to emulator API level
- **Scroll timeout** — increase `setMaxSearchSwipes` in spec or page object
