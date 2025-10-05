import { expect, test } from '@playwright/test';

test.describe('Consulting overview', () => {
  test('highlights both practices and links externally', async ({ page }) => {
    await page.goto('/consulting');

    await expect(page.getByRole('heading', { name: 'Two specialist teams, one aligned delivery model' })).toBeVisible();

    const cards = page.getByRole('article');
    await expect(cards).toHaveCount(2);

    const techLink = page.getByRole('link', { name: 'Visit 360ace.Tech' });
    await expect(techLink).toHaveAttribute('href', 'https://360ace.tech');
    await expect(techLink).toHaveAttribute('target', '_blank');

    const foodLink = page.getByRole('link', { name: 'Visit 360ace.Food' });
    await expect(foodLink).toHaveAttribute('href', 'https://360ace.food');
    await expect(foodLink).toHaveAttribute('target', '_blank');
  });

  test('redirect endpoints respond with external destinations', async ({ request }) => {
    const techResponse = await request.get('/consulting/tech', { maxRedirects: 0 });
    expect(techResponse.status()).toBeGreaterThanOrEqual(301);
    expect(techResponse.status()).toBeLessThan(400);
    expect(techResponse.headers()['location']).toMatch(/^https:\/\/360ace\.tech\/?$/);

    const foodResponse = await request.get('/consulting/food', { maxRedirects: 0 });
    expect(foodResponse.status()).toBeGreaterThanOrEqual(301);
    expect(foodResponse.status()).toBeLessThan(400);
    expect(foodResponse.headers()['location']).toMatch(/^https:\/\/360ace\.food\/?$/);
  });
});
