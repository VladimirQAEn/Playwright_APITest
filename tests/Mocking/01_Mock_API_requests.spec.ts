import { test, expect, devices } from '@playwright/test';
test.use({ ...devices['Desktop Chrome'], headless: false });

//Mock API Requests
test('Mock API Requests in playwright', async ({ page }) => {

await page.route('*/**/api/v1/fruits', async route => {
  const json = [
    
            { name: 'playwright by testers talk', id: 21 },
            { name: 'cypress by testers talk', id: 71 },
            { name: 'api testing by testers talk', id: 72 },
            { name: 'postman by testers talk', id: 73 },
            { name: 'rest assured by testers talk', id: 74 },
        ];

        await route.fulfill({ json });

    });

    await page.goto('https://demo.playwright.dev/api-mocking/');
    await page.waitForTimeout(2000);

    //validation
    await expect(page.getByText('playwright by testers talk')).toBeVisible();
    await expect(page.getByText('cypress by testers talk')).toBeVisible();
    await expect(page.getByText('api testing by testers talk')).toBeVisible();
    await expect(page.getByText('postman by testers talk')).toBeVisible();
    await expect(page.getByText('rest assured by testers talk')).toBeVisible();


});