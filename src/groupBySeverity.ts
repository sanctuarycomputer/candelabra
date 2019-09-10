import { Violation, ViolationsGroupedBySeverity } from './types';

export default (violations: Violation[]): ViolationsGroupedBySeverity => {
  return violations.reduce(
    (
      violationsGroupedBySeverity: ViolationsGroupedBySeverity,
      violation: Violation
    ) => {
      if (violation.impact) {
        violationsGroupedBySeverity[violation.impact].push(violation);
      } else {
        violationsGroupedBySeverity['no-impact'].push(violation);
      }

      return violationsGroupedBySeverity;
    },
    {
      critical: [],
      serious: [],
      moderate: [],
      minor: [],
      'no-impact': []
    }
  );
};
