describe('Ethiopian', () => {
    if (global.jestPreset == 'jest-puppeteer') {
        const openPage = page.goto
        const RealDate = Date;

        afterEach(() => {
            global.Date = RealDate;
        });

        beforeAll(async () => {
            await openPage(global.JestTestURL).catch(reason => {
                throw  `Couldn't open ${global.JestTestURL}: ${reason}`
            });
        });

        it('should display "Ethiopian" text on page', async () => {
            await expect(page).toMatch('Today in Ethiopian Calendar is');
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
                onload();
            }, '2018-10-17 22:23:56 GMT+0300');
            await expect(page).toMatch('Ethiopian Calendar is Tikimt');
            await expect(page).toMatch('Ethiopian Calendar is Tikimt 7, 2011');
            await expect(page).toMatch('Wed, 17 Oct 2018 (at GMT+0)');
            await expect(page).toMatch('Wednesday, Tikimt 7, 2011');
        });
    }
    else {
      async function openPage(url) {
        window.history.replaceState({}, '', url)
        const html = require('fs').readFileSync('./dist/index.html', { encoding: 'utf-8' })
        window.document.querySelector('html').innerHTML  = html
      }
      const page = () => window.document.querySelector('html').outerHTML;
      const evaluateJS = js => js()
      const RealDate = Date;

      afterEach(() => {
          global.Date = RealDate;
      });

      beforeAll(async () => {
        return new Promise(async (resolve, reject) => {
          await openPage(global.JestTestURL);
          window.onModulesLoaded = resolve;
          window.addEventListener('load', resolve)
        })
      });

      it('should display "Ethiopian" text on page', async () => {
          await expect(page()).toMatch('Today in Ethiopian Calendar is');
      });

      it('should show expected date', async () => {
          await evaluateJS((isoDate) => {
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
              if (onload) onload();
              document.getElementById('refreshEthDateButton').click()
          }, '2018-10-17 22:23:56 GMT+0300');
          await expect(page()).toMatch('Ethiopian Calendar is Tikimt');
          await expect(page()).toMatch('Ethiopian Calendar is Tikimt 7, 2011');
          await expect(page()).toMatch('Wed, 17 Oct 2018 (at GMT+0)');
          await expect(page()).toMatch('Wednesday, Tikimt 7, 2011');
      });
    }
});
