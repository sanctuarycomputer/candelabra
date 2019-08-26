import { NodeResult } from 'axe-core';
import 'colors';

import { Url, Sitemap } from './types';
import uniqueViolations from './uniqueViolations';

export default (
  url: Url,
  sitemap: Sitemap,
  totalViolations: NodeResult[]
): void => {
  const uniqueViolationsOnWebsite = uniqueViolations(totalViolations);

  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.moveCursor(0, -2);
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.cursorTo(0);
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.clearScreenDown();
  process.stdout.write(`${'[COMPLETED]'.green.bold} ${url.white}` + '\n\n');

  if (totalViolations.length) {
    process.stdout.write(
      `There were ${
        totalViolations.length.toString().underline
      } total violations and ${
        uniqueViolationsOnWebsite.length.toString().underline
      } unique violations found.`.red.bold + '\n\n'
    );
  } else {
    process.stdout.write(
      `🔥 No violations found on any of the ${
        Object.keys(sitemap).length
      } pages found. Nice work!🔥`.cyan.bold + '\n\n'
    );
  }
};
