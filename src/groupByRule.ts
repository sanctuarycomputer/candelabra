import { Violation, ViolationsGroupedByRule } from './types';

export default (violations: Violation[]): ViolationsGroupedByRule => {
  return violations.reduce(
    (
      violationsGroupedByRule: ViolationsGroupedByRule,
      violation: Violation
    ) => {
      if (violationsGroupedByRule[violation.rule]) {
        violationsGroupedByRule[violation.rule].push(violation);
      } else {
        violationsGroupedByRule[violation.rule] = [violation];
      }

      return violationsGroupedByRule;
    },
    {}
  );
};
