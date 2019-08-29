import { Violation, ViolationsGroupedByPage } from './types';

export default (violations: Violation[]): ViolationsGroupedByPage => {
  return violations.reduce(
    (
      violationsGroupedByPage: ViolationsGroupedByPage,
      violation: Violation
    ) => {
      if (violationsGroupedByPage[violation.page]) {
        violationsGroupedByPage[violation.page].push(violation);
      } else {
        violationsGroupedByPage[violation.page] = [violation];
      }

      return violationsGroupedByPage;
    },
    {}
  );
};
