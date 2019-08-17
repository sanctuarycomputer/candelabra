const puppeteer = require('puppeteer');

const sitemap = [];

module.exports = url => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const hrefs = await page.evaluate(() => {
      const anchors = document.querySelectorAll('a');
      return [].map.call(anchors, a => a.href).filter(Boolean);
    });

    const internalHrefs = hrefs.filter(href => href.includes(url));
    const externalHrefs = hrefs.filter(href => !href.includes(url));

    // console.log('INTERNAL', internalHrefs);
    // console.log('EXTERNAL', externalHrefs);

    console.log(
      sitemap
        .concat(internalHrefs)
        .filter((value, index, self) => self.indexOf(value) === index)
    );

    await browser.close();
  })();
};
