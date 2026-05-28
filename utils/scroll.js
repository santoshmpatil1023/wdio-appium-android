export function scrollIntoViewByText(text) {
    return `android=new UiScrollable(new UiSelector().scrollable(true)).setMaxSearchSwipes(50).scrollIntoView(new UiSelector().text("${text}"))`
}

export const scrollToListTop =
    'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToBeginning(13)'
