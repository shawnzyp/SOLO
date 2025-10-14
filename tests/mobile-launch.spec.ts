import { test, expect } from '@playwright/test';

test.describe('Mobile launch experience', () => {
  test('loads on mobile and remains interactive', async ({ page }) => {
    await page.goto('/');

    const root = page.locator('dd-root');

    await expect(
      root.getByRole('heading', { name: /chronicles of the lone adventurer/i }),
    ).toBeVisible();

    const heroName = root.getByLabel('Hero Name');
    await heroName.fill('Mobile Hero');

    await expect(
      root.locator('.preview-panel h3').filter({ hasText: 'Mobile Hero' }),
    ).toHaveCount(1);

    await root.getByRole('button', { name: /begin the chronicle/i }).click();

    await expect(root.locator('.creation-overlay')).toBeHidden();

    const storyTitle = root.locator('dd-story-panel').locator('h1');
    await expect(storyTitle).toBeVisible();
    const initialTitle = (await storyTitle.textContent())?.trim() ?? '';

    const firstChoice = root.locator('dd-dialogue-list').locator('button').first();
    await expect(firstChoice).toBeVisible();
    await firstChoice.click();

    if (initialTitle) {
      await expect(storyTitle).not.toHaveText(initialTitle, { timeout: 15000 });
    } else {
      await expect(storyTitle).toHaveText(/.+/, { timeout: 15000 });
    }
  });
});
