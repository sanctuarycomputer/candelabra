import {
  Violation,
  Totals,
  CommandOptions,
  OutputGroupBy,
  ViolationsGroupedByPage,
  ViolationsGroupedByRule,
  ViolationsGroupedBySeverity
} from './types';
import groupBySeverity from './groupBySeverity';
import groupByRule from './groupByRule';
import groupByPage from './groupByPage';

const outputBySeverity = (results: ViolationsGroupedBySeverity): void => {
  process.stdout.write('\n\n');

  if (results['critical'].length) {
    process.stdout.write('CRITICAL'.bgRed.black + '\n\n');

    results['critical'].forEach((result: Violation) => {
      process.stdout.write(
        `${result.rule.red.bold} violation on ${result.page.red.underline}\n`
      );
      process.stdout.write(`HTML: ${result.html}\n\n`);
    });

    process.stdout.write('\n\n');
  }

  if (results['serious'].length) {
    process.stdout.write('SERIOUS'.bgRed.black + '\n\n');

    results['serious'].forEach((result: Violation) => {
      process.stdout.write(
        `${result.rule.red.bold} violation on ${result.page.red.underline}\n`
      );
      process.stdout.write(`HTML: ${result.html}\n\n`);
    });

    process.stdout.write('\n\n');
  }

  if (results['moderate'].length) {
    process.stdout.write('MODERATE'.bgYellow.black + '\n\n');

    results['moderate'].forEach((result: Violation) => {
      process.stdout.write(
        `${result.rule.yellow.bold} violation on ${result.page.yellow.underline}\n`
      );
      process.stdout.write(`HTML: ${result.html}\n\n`);
    });

    process.stdout.write('\n\n');
  }

  if (results['minor'].length) {
    process.stdout.write('MINOR'.bgYellow.black + '\n\n');

    results['minor'].forEach((result: Violation) => {
      process.stdout.write(
        `${result.rule.yellow.bold} violation on ${result.page.yellow.underline}\n`
      );
      process.stdout.write(`HTML: ${result.html}\n\n`);
    });

    process.stdout.write('\n\n');
  }

  if (results['no-impact'].length) {
    process.stdout.write('NO IMPACT'.bgYellow.black.bold + '\n\n');

    results['no-impact'].forEach((result: Violation) => {
      process.stdout.write(
        `${result.rule.yellow} violation on ${result.page.yellow}\n`
      );
      process.stdout.write(`HTML: ${result.html}\n`);
    });

    process.stdout.write('\n\n');
  }
};

export default (totals: Totals, options: CommandOptions): void => {
  const groupBy: OutputGroupBy = options.groupBy || OutputGroupBy.SEVERITY;

  let results:
    | ViolationsGroupedByPage
    | ViolationsGroupedByRule
    | ViolationsGroupedBySeverity;
  switch (groupBy) {
    case OutputGroupBy.SEVERITY:
      results = groupBySeverity(totals.uniqueViolations);
      if (!options.output) {
        outputBySeverity(results as ViolationsGroupedBySeverity);
      }
    case OutputGroupBy.TYPE:
      results = groupByRule(totals.uniqueViolations);
    case OutputGroupBy.PAGE:
      results = groupByPage(totals.violations);
  }

  if (options.output) {
    // generateOutputFile(totals, results);
  }
};
