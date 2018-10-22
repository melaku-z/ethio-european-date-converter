describe('Ethiopian', () => {
    var browserFailed = false;
    if (global.jestPreset == 'jest-puppeteer') {
        const RealDate = Date;
        function mockDate(isoDate, RealDate) {
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

        it('should display "Ethiopian" text on page', async () => {
            if (!browserFailed) {
                await expect(page).toMatch('Today in Ethiopian Calendar is');
            }
        });

        it('should show expected date', async () => {
            if (!browserFailed) {
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
            }
        });
    }
    else {
        it('should display "Ethiopian" text on page', async () => {
            await expect(document.querySelector('html').outerHTML).toMatch('Ethiopian');
        });
    }
});