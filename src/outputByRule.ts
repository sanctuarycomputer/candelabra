import padString from './padString';
import { Violation, ViolationsGroupedByRule } from 'types';

export default (results: ViolationsGroupedByRule): void => {
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.moveCursor(0, -2);
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.cursorTo(0);
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.clearScreenDown();
  process.stdout.write('\n\n');

  Object.keys(results).forEach((rule: string) => {
    const violations = results[rule];
    const severity = violations[0].impact;

    if (severity === 'critical' || severity === 'serious') {
      process.stdout.write(padString(rule).bgRed.black + '\n\n');

      violations.forEach((violation: Violation) => {
        process.stdout.write(
          `${violation.rule.red.bold} violation on ${violation.page.red.underline}\n`
        );
        process.stdout.write(`HTML: ${violation.html}\n\n`);
      });
    }

    if (severity === 'moderate' || severity === 'minor' || !severity) {
      process.stdout.write(padString(rule).bgYellow.black + '\n\n');

      violations.forEach((violation: Violation) => {
        process.stdout.write(
          `${violation.rule.yellow.bold} violation on ${violation.page.yellow.underline}\n`
        );
        process.stdout.write(`HTML: ${violation.html}\n\n`);
      });
    }
  });
};
