describe('Google', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080/');
    });

    it('should display "google" text on page', async () => {
        await expect(page).toMatch('google');
    });
});