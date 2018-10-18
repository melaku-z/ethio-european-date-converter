describe('Ethiopian', () => {
    var browserFailed = false;
    beforeAll(async () => {
        await page.goto(global.JestTestURL).catch(reason => {
            console.log(reason);
            browserFailed = true;//todo log a test fail
        });
    });

    if (!browserFailed) {
        it('should display "Ethiopian" text on page', async () => {
            await expect(page).toMatch('Ethiopian');
        });
    }
});