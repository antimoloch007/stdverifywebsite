import { test, expect } from '@playwright/test';

test('desktop-specific test', async ({ page }) => {
  // go to the website
  await page.goto('http://stdverify.org/');

  // click on Join Our Beta
  await page.locator('#contact-button').click();

  // Go to Typefrom and check that it works
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Sign Up For The Beta' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Start' }).click();
  await page.locator('#contact-modal').getByText('×').click();
  await page1.close();

  // Check FAQ works
  await page.getByRole('contentinfo').getByRole('link', { name: 'FAQ' }).click();
  await page.getByText('Does STD Verify store my test').click();
  await page.getByText('How does STD Verify work?').click();
  await page.getByText('What are zero-knowledge').click();
  await page.getByRole('link', { name: 'STD Verify Logo STD Verify' }).click();

  // Check Our Mission works
  await page.getByRole('navigation').getByRole('link', { name: 'Our Mission' }).click();
  await page.getByText('Balance profit motives with our mission to improve public health outcomes Make').click();
  await page.getByText('We invite you to join us in').click();
  await page.getByRole('link', { name: 'STD Verify Logo STD Verify' }).click();
  
  // Check Privacy Policy works
  await page.getByRole('link', { name: 'Privacy Policy' }).click();
  await page.getByRole('link', { name: 'STD Verify Logo STD Verify' }).click();
  const page2Promise = page.waitForEvent('popup');

  // Check Bluesky works
  await page.getByRole('link', { name: 'Bluesky' }).click();
  const page2 = await page2Promise;
  await expect(page2.url()).toBe('https://bsky.app/profile/stdverify.bsky.social');
  await page2.getByText('STD Verify@stdverify.bsky.').click();
  await page2.close();

  // Check Instagram works
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(1).click();
  const page3 = await page3Promise;
  // await expect(page.url()).toBe('https://www.instagram.com/stdverify/');
  await page3.close();

  // Check LinkedIn works
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(2).click();
  const page4 = await page4Promise;
  await expect(page4.url()).toBe('https://www.linkedin.com/company/stdverify');
  await page4.close();

  // Check Blog, Newsletter, and Medium works
  const page5Promise = page.waitForEvent('popup');
  await page.getByRole('navigation').getByRole('link', { name: 'Blog' }).click();
  const page5 = await page5Promise;
  await expect(page5.url()).toBe('https://stdverify.medium.com/');
  await page5.close();
  const page6Promise = page.waitForEvent('popup');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Blog' }).click();
  const page6 = await page6Promise;
  await expect(page6.url()).toBe('https://stdverify.medium.com/');
  await page6.close();
  const page7Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Newsletter' }).click();
  const page7 = await page7Promise;
  await expect(page7.url()).toBe('https://stdverify.medium.com/subscribe');
  await page7.close();
  const page8Promise = page.waitForEvent('popup');
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(4).click();
  const page8 = await page8Promise;
  await expect(page8.url()).toBe('https://stdverify.medium.com/');
  await page8.close();

  // Close browser
  await page.close();

});