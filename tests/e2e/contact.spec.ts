import { expect, test } from '@playwright/test';

test.describe('Contact form', () => {
  test('rejects invalid payloads at the API layer', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: '',
        email: 'invalid',
        company: '',
        practice: 'tech',
        message: 'short',
      },
    });

    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body).toHaveProperty('error', 'Invalid submission');
  });

  test('accepts valid payloads at the API layer', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: 'Integration Test',
        email: 'integration@example.com',
        company: 'Example Org',
        practice: 'both',
        message: 'We are interested in a cross-practice engagement to modernise operations.',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('ok', true);
  });

  test('submits successfully when form is complete', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await expect(page.getByLabel('Name')).toBeVisible();

    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Organisation').fill('Example Co');
    await page.getByLabel('Project context').fill('Looking to collaborate on a cross-practice program.');
    await page.getByRole('radio', { name: 'Both practices' }).check();

    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByLabel('Name')).toHaveValue('');
    await expect(page.getByLabel('Email')).toHaveValue('');
    await expect(page.getByLabel('Organisation')).toHaveValue('');
    await expect(page.getByLabel('Project context')).toHaveValue('');
  });
});
