const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');
const colors = require('colors');

const checkWebsiteForViolations = async url => {
  let sitemap = {};
  let queue = [];

  const entryUrl = url;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const websiteViolations = () =>
    Object.values(sitemap).reduce((urlViolations, url) => {
      const violationCategories = Object.values(url);
      const violationsFromCategory = violationCategories.reduce(
        (mergedViolations, violationCategory) => {
          const { id, impact, description } = violationCategory;
          const flattenedViolations = violationCategory.nodes.map(
            violation => ({
              id,
              impact,
              description,
              html: violation.html
            })
          );

          return mergedViolations.concat(flattenedViolations);
        },
        []
      );

      return urlViolations.concat(violationsFromCategory);
    }, []);

  const checkPageForViolations = async url => {
    const checkedPages = Object.keys(sitemap);

    if (!Object.keys(sitemap).includes(url)) {
      if (url !== entryUrl) process.stdout.moveCursor(0, -2);

      process.stdout.cursorTo(0);
      process.stdout.clearScreenDown();
      process.stdout.write(
        `${'[AUDITING]'.bgYellow.black.bold} ${url.white}`.underline + '\n\n'
      );
      process.stdout.write(
        `${`${websiteViolations().length}`.red.bold} violations found so far. ${
          `There are ${`${queue.length}`.bold} remaining pages in the queue.`
            .gray
        }`
      );

      await page.setViewport({ width: 1366, height: 768 });
      await page.setBypassCSP(true);
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 3 * 60 * 1000
      });

      const results = await new AxePuppeteer(page).analyze();
      const violations = results.violations.reduce(
        (violationCategories, violationCategory) => {
          if (violationCategory.nodes.length) {
            violationCategories[violationCategory.id] = violationCategory;
          }

          return violationCategories;
        },
        {}
      );

      sitemap[url] = violations;

      const links = await page.evaluate(() => {
        const anchors = document.querySelectorAll('a');
        return [].map.call(anchors, a => a.href).filter(Boolean);
      });

      const internalLinks = links.filter(link => link.includes(url));

      queue = queue
        .concat(internalLinks)
        .filter(link => link !== url && !checkedPages.includes(link))
        .reduce(
          (uniques, link) =>
            uniques.includes(link) ? uniques : [...uniques, link],
          []
        );

      if (queue.length) await checkPageForViolations(queue[0]);
    }
  };

  await checkPageForViolations(url);
  await browser.close();

  const totalViolations = websiteViolations().length;

  process.stdout.moveCursor(0, -2);
  process.stdout.cursorTo(0);
  process.stdout.clearScreenDown();
  process.stdout.write(`${'[COMPLETED]'.green.bold} ${url.white}` + '\n\n');

  if (totalViolations) {
    process.stdout.write(
      `There were ${totalViolations.toString().underline} violations found.`.red
        .bold + '\n\n'
    );
  } else {
    process.stdout.write(
      `🔥 No violations found on any of the ${
        Object.keys(sitemap).length
      } pages found! Nice work! 🔥`.cyan.bold + '\n\n'
    );
  }
};

module.exports = checkWebsiteForViolations;
