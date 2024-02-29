'use server';
// import puppeteer from 'puppeteer';

// export default async function scrapeHeaders(url: string) {
//   (async () => {
//     const browser = await puppeteer.launch({
//       headless: false,
//     });
//     const page = await browser.newPage();
//     console.log('page', page);
//     await page.setViewport({
//       width: 1400,
//       height: 1000,
//     });
//     let currentURL;
//     page.waitForSelector('img');
//     // .then(() => console.log('First URL with image: ' + currentURL));
//     await page.goto(url);
//     // for (currentURL of [url]) {
//     //   await page.goto(currentURL);
//     // }
//     // let myText = await page.$eval('h1', (text) => text.textContent);
//     // console.log('myText', myText);
//     const headings = await page.$$eval('h2, h3, h4', (headings) => {
//       return Array.from(headings, (heading) => heading.textContent.trim());
//     });
//     console.log(headings);
//     await browser.close();
//     return headings;
//   })();
// }
import puppeteer from 'puppeteer';

export default async function scrapeHeaders(url: string) {
  const headings = await (async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    console.log('page', page);
    await page.setViewport({
      width: 1400,
      height: 1000,
    });
    await page.goto(url);
    await page.waitForSelector('img'); // Wait for 'img' elements to appear on the page
    const headings = await page.$$eval('h2, h3, h4', (headings) => {
      return Array.from(headings, (heading: any) => heading.textContent.trim());
    });
    console.log(headings);
    await browser.close();
    return headings;
  })();

  return headings; // This will be returned by the outer function.
}
