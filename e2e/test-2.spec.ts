import { test as base, expect, devices } from '@playwright/test';
import { exec } from 'child_process';

const test = base.extend({
  browserName: 'chromium',
  viewport: devices['iPhone 12'].viewport,
  userAgent: devices['iPhone 12'].userAgent,
  deviceScaleFactor: devices['iPhone 12'].deviceScaleFactor,
  isMobile: devices['iPhone 12'].isMobile,
  hasTouch: devices['iPhone 12'].hasTouch,
});

test('mobile-specific test', async ({ page }) => {
  await page.goto('http://stdverify.org/');
  
  // Check beta sign up works
  await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
  await page.locator('#mobile-contact-button-mobile').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Sign Up For The Beta' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Start' }).click();
  await page1.getByRole('checkbox', { name: 'Continue' }).check();
  await page1.getByRole('button', { name: 'OK' }).click();
  await page.locator('#contact-modal').getByText('×').click();
  await page1.close();
  
  // Check FAQ works
  await page.getByRole('link', { name: 'FAQ' }).nth(1).click();
  await page.getByText('Does STD Verify store my test').click();
  await page.getByText('How does STD Verify work?').click();
  await page.getByText('What are zero-knowledge').click();
  await page.getByText('What is STD Verify?').click();
  await page.getByText('How often should I update my').click();
  await page.getByRole('link', { name: 'Privacy Policy' }).click();
  
  // Check Privacy Policy works
  await page.getByRole('heading', { name: 'Security Measures' }).click();
  await page.getByRole('heading', { name: 'Your Rights Under HIPAA' }).click();
  await page.getByRole('heading', { name: 'Children\'s Privacy' }).click();
  await page.getByRole('heading', { name: '13. Legal Basis for' }).click();
  
  // Check Our Mission works
  await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
  await page.getByRole('link', { name: 'Our Mission' }).nth(1).click();
  await page.getByText('Protecting Privacy: Through').click();
  await page.getByText('As a Social Purpose Corporation, we are committed to transparency about our').click();
  await page.getByRole('link', { name: 'Home' }).click();

  // Check Socials
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Bluesky' }).click();
  const page2 = await page2Promise;
  page2.close();
  
  // LinkedIn
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(2).click();
  const page3 = await page3Promise;
  await page3.getByRole('button', { name: 'Dismiss' }).click();
  await expect(page3.url()).toBe('https://www.linkedin.com/company/stdverify');
  await page3.close();

  // Check Blog, Newsletter, and Medium works
  await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Blog' }).nth(1).click();
  const page4 = await page4Promise;
  await expect(page4.url()).toBe('https://stdverify.medium.com/');
  await page4.close();
  await page.getByRole('button', { name: 'Close menu' }).click();
  const page5Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Blog' }).click();
  const page5 = await page5Promise;
  await expect(page5.url()).toBe('https://stdverify.medium.com/');
  await page5.close();
  const page6Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Newsletter' }).click();
  const page6 = await page6Promise;
  await expect(page6.url()).toBe('https://stdverify.medium.com/subscribe');
  await page6.close();

  // Close browser
  await page.close();
});
