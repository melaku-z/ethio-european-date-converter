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
  if (global.jestPreset !== 'jest-puppeteer') throw 'jest-puppeteer preset not set'
  const mockIsoDate = '2018-10-17 22:23:56 GMT+0300';

  beforeAll(async () => {
    await openPage(global.JestTestURL).catch(reason => {
      throw  `Couldn't open ${global.JestTestURL}: ${reason}`;
    });
    await page.evaluate(mockDate, mockIsoDate);
  }, 10000);

  it('should display "Ethiopian" text on page', async () => {
    const pageContent = await page.content()
    expect(pageContent).toMatch('Today in Ethiopian Calendar is');
  }, 15000);

  it('should show expected dates', async () => {
    const pageContent = await page.content();
    await expect(pageContent).toMatch('Tikimt');
    await expect(pageContent).toMatch('Tikimt 7, 2011');
    await expect(pageContent).toMatch('Wed, 17 Oct 2018 (at GMT+0)');
    await expect(pageContent).toMatch('Wednesday, Tikimt 7, 2011');
  }, 15000);
});
