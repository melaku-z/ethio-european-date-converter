const lighthouse = require('lighthouse');
const startDevServer = require('./jestStartup').startDevServer;

async function openPage(url) {
  await page.goto(url);
}

async function mockDate(mockIsoDate) {
  const RealDate = class extends Date {};
  // eslint-disable-next-line no-global-assign
  Date = class extends RealDate {
    constructor(...args) {
      if (args.length) return new RealDate(...args);
      return new RealDate(mockIsoDate);
    }
  };
  window.CalendarConverter.updateCurrentEthDate();
  await(new Promise(resolve => setTimeout(resolve, 4000)));
}

describe('home page', () => {
  let server;

  expect.extend({
    greaterOrEqualTo (received, expected) {
      let pass = typeof received === 'number';
      pass = (pass && (received >= expected));

      let message = pass
        ? () => `expected ${this.utils.printReceived(received)} not to be >= ${this.utils.printExpected(expected)}`
        : () => `expected ${this.utils.printReceived(received)} to be >=: ${this.utils.printExpected(expected)}`;

      return { pass, message};
    }
  });

  if (global.jestPreset !== 'jest-puppeteer') throw 'jest-puppeteer preset not set';
  const mockIsoDate = '2018-10-17 22:23:56 GMT+0300';

  beforeAll(async () => {
    server = startDevServer();
    await openPage(global.JestTestURL).catch(reason => {
      throw  `Couldn't open ${global.JestTestURL}: ${reason}`;
    });
    await page.evaluate(mockDate, mockIsoDate);
  }, 10000);

  afterAll(async () => {
    const promisify = require('util').promisify;
    const asyncServerStop = promisify(server.stop).bind(server);
    await asyncServerStop();
  });

  it('should display "Ethiopian" text on page', async () => {
    const pageContent = await page.content();
    expect(pageContent).toMatch('Today in Ethiopian Calendar is');
  }, 15000);

  it('should show expected dates', async () => {
    const pageContent = await page.content();
    await expect(pageContent).toMatch('Tikimt');
    await expect(pageContent).toMatch('Tikimt 7, 2011');
    await expect(pageContent).toMatch('Wed, 17 Oct 2018 (at GMT+0)');
    await expect(pageContent).toMatch('Wednesday, Tikimt 7, 2011');
  }, 15000);

  it('has acceptable lighthouse score', async () => {
    const {lhr} = await lighthouse(global.JestTestURL, {
      port: (new URL(browser.wsEndpoint())).port,
      output: 'json',
      logLevel: 'error',
    });
    const result = {
      accessibility: lhr.categories.accessibility.score * 100,
      performance: String(lhr.categories.performance.score * 100),
      pwa: lhr.categories.pwa.score * 100,
      seo: lhr.categories.seo.score * 100,
      'best-practices': lhr.categories['best-practices'].score * 100,
      pageSpeed: lhr.audits['speed-index'].score * 100,
    };
    expect(result).toEqual({
      accessibility: 100,
      performance: expect.stringMatching(/99|100/), // HTTP/2 not enabled on dev server
      pwa: 93, // not 100 for 'Does not redirect HTTP traffic to HTTPS'
      seo: 100,
      'best-practices': 93, // not 100 for 'Does not use HTTP/2 for all of its resources '
      pageSpeed: 100,
    });
  }, 40000);
});
