import { Violation, Sitemap, CommandOptions } from 'types';
import groupBySeverity from './groupBySeverity';

export default (
  sitemap: Sitemap,
  totalViolations: Violation[],
  options: CommandOptions
): void => {
  console.log(groupBySeverity(totalViolations));

  if (options.output) {
    // ... dump output into JSON file
  }
};
