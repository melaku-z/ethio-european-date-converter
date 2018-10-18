describe('Ethiopian', () => {
    var browserFailed = false;
    beforeAll(async () => {
        await page.goto('http://localhost:8080/').catch(reason => {
            console.log(reason);
            browserFailed = true;
        });
    });

    if (!browserFailed) {
        it('should display "Ethiopian" text on page', async () => {
            await expect(page).toMatch('Ethiopian');
        });
    }
});