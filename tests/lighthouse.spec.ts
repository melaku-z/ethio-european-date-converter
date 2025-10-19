/**
 * @vitest-environment node
 */
import { writeFile } from 'fs/promises'
import { Server } from 'http'
import lighthouse from 'lighthouse'
import Result from 'lighthouse/types/lhr/lhr'
import puppeteer from 'puppeteer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { startServer } from './serverStartup'

const categories = [
  'accessibility',
  'performance',
  'pwa',
  'seo',
  'best-practices',
] as const

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
    const browser = await puppeteer.launch(
      // No sandbox because: https://pptr.dev/troubleshooting#issues-with-apparmor-on-ubuntu
      { args: ['--no-sandbox'] }
    )

    const { lhr, report } = (await lighthouse('http://localhost:8001/', {
      port: Number(new URL(browser.wsEndpoint()).port),
      output: ['html'],
      logLevel: 'error',
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
    // pwa: '100',
    seo: '100',
    'best-practices': '100',
    pageSpeed: 100,
  }
  const result: Record<string, string | number> = {
    pageSpeed: (lhResult.audits['speed-index'].score || 0) * 100,
  }

  categories.forEach((category) => {
    const categoryResult = lhResult.categories[category]?.score
    if (categoryResult != null)
      result[category] = String(
        (lhResult.categories[category]?.score || 0) * 100,
      )
  })

  return [result, expectedResult]
}
