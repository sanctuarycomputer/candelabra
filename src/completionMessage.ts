import 'colors';

import { Totals } from './types';

export default (totals: Totals): void => {
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.moveCursor(0, -2);
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.cursorTo(0);
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.clearScreenDown();
  process.stdout.write(
    `${'[COMPLETED]'.green.bold} ${totals.url.white}` + '\n\n'
  );

  if (totals.violations.length) {
    process.stdout.write(
      `There were ${
        totals.violations.length.toString().underline
      } total violations and ${
        totals.uniqueViolations.length.toString().underline
      } unique violations found.`.red.bold + '\n\n'
    );
  } else {
    process.stdout.write(
      `🔥 No violations found on any of the ${totals.totalPages} pages found. Nice work!🔥`
        .cyan.bold + '\n\n'
    );
  }
};
