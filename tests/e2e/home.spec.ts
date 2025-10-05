import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('renders key hero content and outbound CTAs', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'One partner. Two specialist practices.' })).toBeVisible();
    await expect(page.getByText('360° Consulting for Technology and Food Systems')).toBeVisible();

    const techCta = page.getByRole('link', { name: 'Explore 360ace.Tech' });
    await expect(techCta).toHaveAttribute('href', 'https://360ace.tech');
    await expect(techCta).toHaveAttribute('target', '_blank');

    const foodCta = page.getByRole('link', { name: 'Explore 360ace.Food' });
    await expect(foodCta).toHaveAttribute('href', 'https://360ace.food');
    await expect(foodCta).toHaveAttribute('target', '_blank');

    await expect(page.locator('#expertise')).toBeVisible();
    await expect(page.getByRole('heading', { name: /A compound consulting model/i })).toBeVisible();
  });
});
