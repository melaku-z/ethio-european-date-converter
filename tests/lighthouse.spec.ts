/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import lighthouse from 'lighthouse'
import puppeteer from 'puppeteer'
import { writeFile } from 'fs/promises'
import { startServer } from './serverStartup'
import Result from 'lighthouse/types/lhr/lhr'
import { Server } from 'http'

const categories = [
  'accessibility',
  'performance',
  'pwa',
  'seo',
  'best-practices',
]

describe('home page', async () => {
  const SERVER_PORT = 8001
  // let server = await startServer(SERVER_PORT)
  let server: Server

  expect.extend({
    greaterOrEqualTo(received, expected) {
      let pass = typeof received === 'number'
      pass = pass && received >= expected

      const message = pass
        ? () =>
            `expected ${this.utils.printReceived(
              received,
            )} not to be >= ${this.utils.printExpected(expected)}`
        : () =>
            `expected ${this.utils.printReceived(
              received,
            )} to be >=: ${this.utils.printExpected(expected)}`

      return { pass, message }
    },
  })

  beforeAll(async () => {
    server = await startServer(SERVER_PORT)
  }, 10000)

  afterAll(() => {
    server.close()
  })

  it('has acceptable lighthouse score', async () => {
    const browser = await puppeteer.launch()

    const { lhr, report } = (await lighthouse('http://localhost:8001/', {
      port: Number(new URL(browser.wsEndpoint()).port),
      output: ['html'],
      logLevel: 'error',
      onlyCategories: categories,
    }))!
    // await writeFile('tests/lhreport.html', String(report))
    const [result, expectedResult] = getLightHouseSummary(lhr)
    expect(result).toEqual(expectedResult)

    await browser.close()
  }, 40000)
})

function getLightHouseSummary(lhResult: Result) {
  const expectedResult = {
    accessibility: '100',
    performance: '100',
    pwa: '100',
    seo: '100',
    'best-practices': '100',
    pageSpeed: 100,
  }
  const result = {
    pageSpeed: (lhResult.audits['speed-index'].score || 0) * 100,
  }

  categories.forEach((category) => {
    result[category] = String((lhResult.categories[category]?.score || 0) * 100)
  })

  return [result, expectedResult]
}
