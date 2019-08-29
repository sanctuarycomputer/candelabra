import { Totals, CommandOptions, OutputGroupBy } from 'types';
import groupBySeverity from './groupBySeverity';
import groupByRule from './groupByRule';
import groupByPage from './groupByPage';

export default (totals: Totals, options: CommandOptions): void => {
  const groupBy: OutputGroupBy = options.groupBy || OutputGroupBy.SEVERITY;

  let results;
  switch (groupBy) {
    case OutputGroupBy.SEVERITY:
      results = groupBySeverity(totals.uniqueViolations);
    case OutputGroupBy.TYPE:
      results = groupByRule(totals.uniqueViolations);
    case OutputGroupBy.PAGE:
      results = groupByPage(totals.violations);
  }

  // if (options.output) {
  //   // ... dump output into JSON file
  // }
};
