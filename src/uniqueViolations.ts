import isEqual from 'lodash/isEqual';
import { NodeResult } from 'axe-core';

export default (violations: NodeResult[]): NodeResult[] => {
  return violations.reduce(
    (uniques: NodeResult[], violation: NodeResult): NodeResult[] => {
      const violationIsDuplicate: boolean = uniques.some(
        (existingViolation: NodeResult): boolean =>
          isEqual(existingViolation, violation)
      );

      return violationIsDuplicate ? uniques : uniques.concat([violation]);
    },
    []
  );
};
