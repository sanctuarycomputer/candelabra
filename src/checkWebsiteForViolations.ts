import 'colors';

import puppeteer from 'puppeteer';
import { AxePuppeteer } from 'axe-puppeteer';
import { AxeResults, Result } from 'axe-core';

import urlIsCrawlable from './urlIsCrawlable';
import urlIsValidEntry from './urlIsValidEntry';
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
  if (!url) {
    process.stdout.write(
      `Error: Please provide a valid URL with a valid protocol.`.red
    );
    process.exit();
  }

  if (!urlIsValidEntry(url)) {
    process.stdout.write(
      `Error: ${url.underline} is not a valid URL. Please provide a valid URL with a valid protocol.`
        .red
    );
    process.exit();
  }

  const sitemap: Sitemap = {};
  const entryUrl: Url = url;
  const browser: puppeteer.Browser = await puppeteer.launch();
  const page: puppeteer.Page = await browser.newPage();

  let queue: Url[] = [];
  let totalViolations: Violation[] = [];
  let count: number = 0;

  const recursivelyCheckForViolations = async (url: Url): Promise<void> => {
    const checkedUrls = Object.keys(sitemap);

    if (
      !checkedUrls.includes(url) &&
      !(options.limit && count >= options.limit)
    ) {
      updateStatusMessage(
        url,
        entryUrl,
        options.limit ? Math.min(queue.length, options.limit) : queue.length,
        totalViolations
      );

      await page.setViewport({ width: 1366, height: 768 });
      await page.setBypassCSP(true);
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 3 * 60 * 1000
      });

      let results: AxeResults | null = null;
      try {
        results = await new AxePuppeteer(page).analyze();
      } catch (e) {
        process.stdout.write(e.red);
        process.exit();
      }

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

      const links: Url[] = await page.$$eval('a', anchors =>
        anchors
          .map(a => a as HTMLAnchorElement)
          .reduce(
            (uniqueHrefsOnPage: Url[], anchor: HTMLAnchorElement): Url[] => {
              const href: string = anchor.href;
              const hrefIsDuplicate: boolean = uniqueHrefsOnPage.includes(href);

              return hrefIsDuplicate
                ? uniqueHrefsOnPage
                : uniqueHrefsOnPage.concat([href as Url]);
            },
            []
          )
      );

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

      if (queue.length) {
        count = count + 1;
        await recursivelyCheckForViolations(queue[0]);
      }
    }
  };

  await recursivelyCheckForViolations(url);
  await browser.close();

  const totals: Totals = calculateTotals(url, totalViolations);
  output(totals, options);

  completionMessage(totals);
};
