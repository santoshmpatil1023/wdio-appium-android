# Day 2 — Appium Inspector and Locator Strategies

## What is Appium Inspector?

Appium Inspector helps me view the XML element tree of
whatever screen is currently open on the emulator.

Before writing any test, I use Inspector to:
- See what attributes each element has (content-desc,
  resource-id, text)
- Pick the best locator before writing a single line of code
- Verify the locator actually finds the right element

Without Inspector I'm guessing selectors blindly.

---

## Connecting Inspector to the Emulator

Same capabilities as wdio.conf.js:

| Capability | Value |
|---|---|
| platformName | Android |
| appium:automationName | UiAutomator2 |
| appium:udid | emulator-5554 |
| appium:appPackage | io.appium.android.apis |
| appium:appActivity | .ApiDemos |

---

## Locator Priority (Android)

**accessibility id → resource-id → UiAutomator → xpath**

### Why this order?

**accessibility id (`~`)** — fastest. Goes directly to the
element using content-desc. No tree traversal needed.

**resource-id (`id:`)** — second choice. Unique per screen,
stable across UI changes.

**UiAutomator (`android=`)** — use when no accessibility id
or resource-id exists. Also the only way to scroll
off-screen items into view.

**xpath** — last resort. Slow because it traverses the
entire UI tree top to bottom. Breaks when UI hierarchy
changes even slightly.

---

## Locator Syntax (WebdriverIO)

| Strategy | Example | When |
|---|---|---|
| accessibility id | `$('~Views')` | content-desc present |
| resource-id | `$('id:io.appium.android.apis:id/edit')` | @+id in layout |
| UiAutomator | `$('android=new UiSelector().text("Controls")')` | text only, or scrolling |
| xpath | `$('//android.widget.Button[@text="OK"]')` | absolute last resort |

---

## 15 Elements — Best Locators

From my hands-on inspection across ApiDemos screens.

| # | Screen | Element | Best Locator | Why |
|---|---|---|---|---|
| 1 | Home | Views menu row | `$('~Views')` | Has content-desc, fastest locator |
| 2 | Home | Content menu row | `$('~Content')` | Same pattern, content-desc available |
| 3 | Home | Graphics menu row | `$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Graphics"))')` | Off-screen on small AVD, needs scroll |
| 4 | Views | Controls sub-menu | `$('~Controls')` | content-desc present on list row |
| 5 | Views > Controls | 1. Light Theme | `$('android=new UiSelector().text("1. Light Theme")')` | No content-desc, no resource-id — text selector only option |
| 6 | Light Theme | Text field | `$('id:io.appium.android.apis:id/edit')` | Unique resource-id, more stable than xpath |
| 7 | Light Theme | Checkbox | `$('id:io.appium.android.apis:id/check1')` | resource-id stable even if label changes |
| 8 | Light Theme | Toggle button | `$('id:io.appium.android.apis:id/toggle')` | id is the layout contract |
| 9 | Light Theme | Radio 1 | `$('id:io.appium.android.apis:id/radio1')` | Distinguishes radios by id, not by text |
| 10 | Light Theme | Radio 2 | `$('id:io.appium.android.apis:id/radio2')` | Same reason as above |
| 11 | Views | Lists sub-menu | `$('~Lists')` | content-desc present |
| 12 | Views > Lists > Array | Mauritius (off-screen) | `$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Mauritius"))')` | Off-screen — UiScrollable only option |
| 13 | Views | Date Widgets | `$('~Date Widgets')` | content-desc on menu row |
| 14 | Views > Date Widgets > Dialog | Change the date button | `$('id:io.appium.android.apis:id/changeDate')` | resource-id in date dialog layout |
| 15 | Views | Time Widgets | `$('~Time Widgets')` | content-desc available |

### Key observation from hands-on

Menu items like "Views", "Controls", "Lists" — these had
content-desc so accessibility id worked perfectly.

Screen-level UI elements like text fields, checkboxes,
radio buttons — these had resource-id, so I used id locator.

Items like "1. Light Theme" — no content-desc, no resource-id.
Had to fall back to UiAutomator text selector.

---

## Mini-assignment — UiScrollable.scrollIntoView

### Why can't I just use `$('~Mauritius')`?

Because Mauritius is off-screen when the list loads.
WebdriverIO can only interact with elements that are
in the current view. `~Mauritius` will throw
"element not found" because it's not in the XML tree yet.

UiScrollable tells Android to scroll the list until
the element appears — then I can interact with it.

### The Selector

```js
const mauritius = $(
  'android=new UiScrollable(' +
    'new UiSelector().scrollable(true)' +
  ').scrollIntoView(' +
    'new UiSelector().text("Mauritius")' +
  ')'
)
await mauritius.waitForDisplayed({ timeout: 15000 })
await mauritius.click()
```

### What each part does

**`new UiSelector().scrollable(true)`**
→ finds the scrollable container (the ListView)

**`.scrollIntoView(new UiSelector().text("Mauritius"))`**
→ keeps scrolling until an element with text "Mauritius"
  appears in the view

### How I verified it in Inspector

1. Opened Views → Lists → 1. Array in ApiDemos
2. Set strategy to: -android uiautomator
3. Pasted the selector (without `android=` prefix)
4. Clicked Search → Mauritius row highlighted
5. No manual swipe needed

---

## My Locator Decision Rule

When I see a new element in Inspector:

1. Does it have content-desc? → use accessibility id (~)
2. Does it have resource-id? → use id locator
3. Neither? → use UiAutomator text selector
4. Nothing works cleanly? → xpath as last resort,
   and add a comment explaining why