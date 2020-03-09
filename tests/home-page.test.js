describe('Ethiopian', () => {
  if (global.jestPreset == 'jest-puppeteer') {
    const puppeteer = require('puppeteer');

    let page;
    let browser;
    async function openPage(url) {
      browser = await puppeteer.launch({headless: true});
      page = await browser.newPage();
      await page.goto(url);
    }
    const RealDate = Date;

    afterEach(() => {
      global.Date = RealDate;
    });

    beforeAll(async () => {
      await openPage(global.JestTestURL).catch(reason => {
        throw  `Couldn't open ${global.JestTestURL}: ${reason}`;
      });
    });

    afterAll(() => {
      browser.close();
    });

    it('should display "Ethiopian" text on page', async () => {
      const pageContent = await page.content()
      expect(pageContent).toMatch('Today in Ethiopian Calendar is');
    });

    it('should show expected date', async () => {
      await page.evaluate((isoDate) => {
        function mockDate(isoDate, RealDate) {
          Date = class extends RealDate {
            constructor(...args) {
              if (args.length) return new RealDate(...args);
              return new RealDate(isoDate);
            }
          };
        }
        const RealDate = Date;
        mockDate(isoDate, RealDate);
        document.querySelector('body').onload();
      }, '2018-10-17 22:23:56 GMT+0300');
      const pageContent = await page.content()
      await expect(pageContent).toMatch('Ethiopian Calendar is Tikimt');
      await expect(pageContent).toMatch('Ethiopian Calendar is Tikimt 7, 2011');
      await expect(pageContent).toMatch('Wed, 17 Oct 2018 (at GMT+0)');
      await expect(pageContent).toMatch('Wednesday, Tikimt 7, 2011');
    });
  }
  else {
    function openPage(url) {
      window.history.replaceState({}, '', url);
      const html = require('fs').readFileSync('./dist/index.html', { encoding: 'utf-8' });
      window.document.querySelector('html').innerHTML  = html;
    }
    const page = () => window.document.querySelector('html').outerHTML;
    const evaluateJS = async (js) => await js();
    const RealDate = Date;

    afterEach(() => {
      global.Date = RealDate;
    });

    beforeAll(async () => {
      return new Promise(async (resolve) => {
        window.onModulesLoaded = resolve;
        openPage(global.JestTestURL);
        window.onModulesLoaded = resolve;
        // window.addEventListener('load', resolve)
      });
    });

    it('should display "Ethiopian" text on page', async () => {
      await expect(page()).toMatch('Today in Ethiopian Calendar is');
    });

    it('should show expected date', async () => {
      await evaluateJS(async (isoDate) => {
        function mockDate(isoDate, RealDate) {
          Date = class extends RealDate {
            constructor(...args) {
              if (args.length) return new RealDate(...args);
              return new RealDate(isoDate);
            }
          };
        }
        const RealDate = Date;
        mockDate(isoDate, RealDate);
        document.querySelector('body').onload();
        document.getElementById('refreshEthDateButton').click();
      }, '2018-10-17 22:23:56 GMT+0300');
      await expect(page()).toMatch('Ethiopian Calendar is Tikimt');
      await expect(page()).toMatch('Ethiopian Calendar is Tikimt 7, 2011');
      await expect(page()).toMatch('Wed, 17 Oct 2018 (at GMT+0)');
      await expect(page()).toMatch('Wednesday, Tikimt 7, 2011');
    });
  }
});
