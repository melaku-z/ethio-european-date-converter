describe('Ethiopian', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080/').catch(reason => {
            console.log(reason);
        })
    });

    it('should display "Ethiopian" text on page', async () => {
        await expect(page).toMatch('Ethiopian');
    });
});