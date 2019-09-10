import padString from './padString';
import { Violation, ViolationsGroupedByPage } from 'types';

export default (results: ViolationsGroupedByPage): void => {
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.moveCursor(0, -2);
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.cursorTo(0);
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.clearScreenDown();
  process.stdout.write('\n\n');

  Object.keys(results).forEach((page: string) => {
    const violations = results[page];

    if (violations.length >= 10) {
      process.stdout.write(padString(page).bgRed.black + '\n\n');

      violations.forEach((violation: Violation) => {
        process.stdout.write(
          `${violation.rule.red.bold} violation on ${violation.page.red.underline}\n`
        );
        process.stdout.write(`HTML: ${violation.html}\n\n`);
      });
    }

    if (violations.length < 10) {
      process.stdout.write(padString(page).bgYellow.black + '\n\n');

      violations.forEach((violation: Violation) => {
        process.stdout.write(
          `${violation.rule.yellow.bold} violation on ${violation.page.yellow.underline}\n`
        );
        process.stdout.write(`HTML: ${violation.html}\n\n`);
      });
    }
  });
};
