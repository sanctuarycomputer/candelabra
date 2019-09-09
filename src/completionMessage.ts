import 'colors';

import { Totals } from './types';

export default (totals: Totals): void => {
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
