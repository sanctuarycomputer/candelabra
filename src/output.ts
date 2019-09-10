import {
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
import outputBySeverity from './outputBySeverity';
import outputByRule from './outputByRule';
import outputByPage from './outputByPage';

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
    case OutputGroupBy.RULE:
      results = groupByRule(totals.uniqueViolations);
      if (!options.output) {
        outputByRule(results as ViolationsGroupedByRule);
      }
    case OutputGroupBy.PAGE:
      results = groupByPage(totals.violations);
      if (!options.output) {
        outputByPage(results as ViolationsGroupedByPage);
      }
  }

  if (options.output) {
    // generateOutputFile(totals, results);
  }
};
