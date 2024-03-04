'use server';

import puppeteer from 'puppeteer';

interface Header {
  text: string;
  link: string | null;
}

export default async function scrapeHeaders(url: string): Promise<Header[]> {
  const headersWithLinks = await (async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1400,
      height: 1000,
    });
    await page.goto(url);
    await page.waitForSelector('h2, h3, h4'); // Wait for headers to appear on the page

    const headersWithLinks: Header[] = await page.evaluate(() => {
      const headers: Header[] = [];
      document.querySelectorAll('h2, h3, h4').forEach((header) => {
        const headerText = header.textContent?.trim() || '';

        // Check if the header's parent element contains a link
        const linkElement = header.parentElement?.closest('a');
        const headerLink = linkElement ? linkElement.href : null;

        headers.push({ text: headerText, link: headerLink });
      });
      return headers;
    });

    await browser.close();
    return headersWithLinks;
  })();

  return headersWithLinks;
}
