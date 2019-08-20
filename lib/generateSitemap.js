const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');

const sitemap = [];
const queue = [];

const getInternalLinksOnPage = async url => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1366, height: 768 });
  await page.setBypassCSP(true);
  await page.goto(url, { waitUntil: 'networkidle2' });

  const results = await new AxePuppeteer(page).analyze();
  console.log(results);

  // const links = await page.evaluate(() => {
  //   const anchors = document.querySelectorAll('a');
  //   return [].map.call(anchors, a => a.href).filter(Boolean);
  // });

  // const internalLinks = links.filter(link => link.includes(url));
  await browser.close();

  return internalLinks;
};

const generateSitemap = async url => {
  if (!sitemap.includes(url)) {
    sitemap.push(url);

    console.log(`[ADD]: ${url}`);

    const internalLinksOnPage = await getInternalLinksOnPage(url).catch(err => {
      console.error(url, err);
    });

    // if (internalLinksOnPage && internalLinksOnPage.length) {
    //   await internalLinksOnPage.forEach(async link => {
    //     await generateSitemap(link);
    //   });
    // }
  }
};

module.exports = generateSitemap;
