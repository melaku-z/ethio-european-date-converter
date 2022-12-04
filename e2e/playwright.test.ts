import { test, expect, type Page } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('Correct dates are displayed', async ({ page }) => {
  const mockIsoDate = '2018-10-17 22:23:56 GMT+0300'
  await mockDate(page, mockIsoDate)

  await page.goto('/')
  await expect(page.locator('body')).toHaveText(/Tikimt 7, 2011/)
  await expect(page.locator('body')).toHaveText(
    /Wed, 17 Oct 2018 \(at GMT\+0\)/,
  )
  await expect(page.locator('body')).toHaveText(/Wednesday, Tikimt 7, 2011/)
})

async function mockDate(page: Page, mockIsoDate: string) {
  const mockNow = new Date(mockIsoDate).valueOf()

  await page.addInitScript(`{
    // Extend Date constructor to default to fakeNow
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(${mockNow});
        } else {
          super(...args);
        }
      }
    }
    // Override Date.now() to start from fakeNow
    const __DateNowOffset = ${mockNow} - Date.now();
    const __DateNow = Date.now;
    Date.now = () => __DateNow() + __DateNowOffset;
  }`)
}
