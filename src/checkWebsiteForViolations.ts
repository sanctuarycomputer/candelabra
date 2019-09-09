import puppeteer from 'puppeteer';
import { AxePuppeteer } from 'axe-puppeteer';
import { AxeResults, Result } from 'axe-core';

import urlIsCrawlable from './urlIsCrawlable';
import calculateTotals from './calculateTotals';
import completionMessage from './completionMessage';
import updateStatusMessage from './updateStatusMessage';
import output from './output';
import {
  Url,
  Sitemap,
  Violation,
  AxeRule,
  CommandOptions,
  Totals
} from './types';

export default async (url: Url, options: CommandOptions): Promise<void> => {
  const sitemap: Sitemap = {};
  const entryUrl: Url = url;
  const browser: puppeteer.Browser = await puppeteer.launch();
  const page: puppeteer.Page = await browser.newPage();

  let queue: Url[] = [];
  let totalViolations: Violation[] = [];

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
      const violationsByRule: {
        [key: string]: Result;
      } = results.violations.reduce(
        (violationRules: { [key: string]: Result }, violationRule: Result) => {
          if (violationRule.nodes.length) {
            violationRules[violationRule.id] = violationRule;
            totalViolations = totalViolations.concat([
              ...violationRule.nodes.map(node => ({
                ...node,
                page: url,
                rule: violationRule.id as AxeRule
              }))
            ]);
          }

          return violationRules;
        },
        {}
      );

      sitemap[url] = violationsByRule;

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

      const internalLinks: Url[] = links
        .filter((link: Url): boolean => link.includes(entryUrl))
        .filter((link: Url): boolean => urlIsCrawlable(link));

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

  const totals: Totals = calculateTotals(url, totalViolations);
  output(totals, options);

  completionMessage(totals);
};
