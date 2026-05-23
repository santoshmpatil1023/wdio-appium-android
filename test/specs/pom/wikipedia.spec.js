import { expect, browser } from '@wdio/globals'
import allure from '@wdio/allure-reporter'
import WikipediaAppPage from '../../pageobjects/WikipediaAppPage.js'
import WikipediaSearchPage from '../../pageobjects/WikipediaSearchPage.js'
import WikipediaArticlePage from '../../pageobjects/WikipediaArticlePage.js'
import WikipediaSavedPage from '../../pageobjects/WikipediaSavedPage.js'
import { loadFixture } from '../../../utils/testData.js'

const app = new WikipediaAppPage()
const search = new WikipediaSearchPage()
const article = new WikipediaArticlePage()
const saved = new WikipediaSavedPage()
const data = loadFixture('wikipedia')

describe('POM — Wikipedia E2E', () => {
    beforeEach(async () => {
        await app.launch()
        await app.skipOnboarding()
    })

    it('searches Selenium article, scrolls to History, saves and verifies reading list', async () => {
        allure.addStep(`Search for ${data.searchTerm}`)
        await search.searchAndOpenArticle(data.searchTerm)

        allure.addStep('Scroll to History section')
        await article.waitForArticleLoaded()
        await article.scrollToSection(data.sectionHeading)

        allure.addStep('Save article to reading list')
        await article.saveToReadingList()

        await browser.back()
        await browser.back()

        allure.addStep('Open Saved tab and verify article')
        await saved.openSavedTab()
        await saved.openDefaultReadingList()

        expect(await saved.isArticleInList(data.articleMatch)).toBe(true)
    })
})
