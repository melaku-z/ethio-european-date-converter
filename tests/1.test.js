describe('Ethiopian', () => {
    var browserFailed = false;
    if (global.jestPreset == 'jest-puppeteer') {
        const RealDate = Date;
        function mockDate(isoDate) {
            global.Date = class extends RealDate {
                constructor(...args) {
                    if (args.length) return new RealDate(...args);
                    return new RealDate(isoDate);
                }
            };
        }

        afterEach(() => {
            global.Date = RealDate;
        });

        beforeAll(async () => {
            await page.goto(global.JestTestURL).catch(reason => {
                console.log(reason);
                browserFailed = true;//todo log a test fail
            });
        });

        if (!browserFailed) {
            it('should display "Ethiopian" text on page', async () => {
                mockDate('2018-01-03');
                await expect(page).toMatch('Ethiopian');
            });
        }
    }
    else {
        it('should display "Ethiopian" text on page', async () => {
            await expect(document.querySelector('html').outerHTML).toMatch('Ethiopian');
        });
    }
});