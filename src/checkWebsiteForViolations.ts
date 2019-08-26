import puppeteer from 'puppeteer';
import { AxePuppeteer } from 'axe-puppeteer';
import { AxeResults, Result, NodeResult } from 'axe-core';

import outputResults from 'outputResults';
import updateStatusMessage from 'updateStatusMessage';
import { Url, Sitemap } from 'types';

export default async (url: Url): Promise<void> => {
  const sitemap: Sitemap = {};
  const entryUrl: Url = url;
  const browser: puppeteer.Browser = await puppeteer.launch();
  const page: puppeteer.Page = await browser.newPage();

  let queue: Url[] = [];
  let totalViolations: NodeResult[] = [];

  const recursivelyCheckForViolations = async (url: Url): Promise<void> => {
    const checkedUrls = Object.keys(sitemap);

    if (!checkedUrls.includes(url)) {
      updateStatusMessage(url, entryUrl, queue, totalViolations);

      await page.setViewport({ width: 1366, height: 768 });
      await page.setBypassCSP(true);
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 3 * 60 * 1000
      });

      const results: AxeResults = await new AxePuppeteer(page).analyze();
      const violationsByCategory: {
        [key: string]: Result[];
      } = results.violations.reduce(
        (
          violationCategories: { [key: string]: Result },
          violationCategory: Result
        ) => {
          if (violationCategory.nodes.length) {
            violationCategories[violationCategory.id] = violationCategory;
            totalViolations = totalViolations.concat([
              ...violationCategory.nodes
            ]);
          }

          return violationCategories;
        },
        {}
      );

      sitemap[url] = violationsByCategory;

      const links: Url[] = await page.evaluate(() => {
        const anchors: NodeListOf<
          HTMLAnchorElement
        > = document.querySelectorAll('a');
        const uniqueHrefs: Url[] = Array.from(anchors).reduce(
          (uniqueHrefsOnPage: Url[], anchor: HTMLAnchorElement): Url[] => {
            const href: string = anchor.href;
            const hrefIsDuplicate: boolean = uniqueHrefsOnPage.includes(href);

            return hrefIsDuplicate
              ? uniqueHrefsOnPage
              : uniqueHrefsOnPage.concat([href as Url]);
          },
          []
        );

        return uniqueHrefs;
      });

      const internalLinks: Url[] = links.filter((link: Url): boolean =>
        link.includes(entryUrl)
      );

      queue = queue
        .concat(internalLinks)
        .filter(
          (link: Url): boolean => link !== url && !checkedUrls.includes(link)
        )
        .reduce(
          (uniques: Url[], link: Url) =>
            uniques.includes(link) ? uniques : uniques.concat([link]),
          []
        );

      if (queue.length) await recursivelyCheckForViolations(queue[0]);
    }
  };

  await recursivelyCheckForViolations(url);
  await browser.close();

  outputResults(url, sitemap, totalViolations);
};
