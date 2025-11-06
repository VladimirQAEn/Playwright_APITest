import { test, expect, devices } from '@playwright/test';
test.use({ ...devices['Desktop Chrome'], headless: false });

//Mock API Response
test('Mock API Response in playwright', async ({ page }) => {

await page.route('*/**/api/v1/fruits', async route => {
    
    const response = await route.fetch();
    const json = await response.json();

    json.push({ name: 'playwright by testers talk', id: 21 });
    json.push({ name: 'cypress by testers talk', id: 71 });
    json.push({ name: 'api testing by testers talk', id: 72 });
    json.push({ name: 'postman by testers talk', id: 73 });
    json.push({ name: 'rest assured by testers talk', id: 74 });
    
    await route.fulfill({response, json });


    });

    await page.goto('https://demo.playwright.dev/api-mocking/');
    await page.waitForTimeout(2000);

    // Assert that the new fruit is visible
    await expect(page.getByText('playwright by testers talk')).toBeVisible();
    await expect(page.getByText('cypress by testers talk')).toBeVisible();
    await expect(page.getByText('api testing by testers talk')).toBeVisible();
    await expect(page.getByText('postman by testers talk')).toBeVisible();
    await expect(page.getByText('rest assured by testers talk')).toBeVisible();


});