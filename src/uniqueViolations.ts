import { Violation } from './types';

export default (violations: Violation[]): Violation[] => {
  return violations.reduce(
    (uniques: Violation[], violation: Violation): Violation[] => {
      const violationIsDuplicate: boolean = uniques.some(
        (existingViolation: Violation): boolean =>
          existingViolation.html === violation.html &&
          existingViolation.rule === violation.rule
      );

      return violationIsDuplicate ? uniques : uniques.concat([violation]);
    },
    []
  );
};
