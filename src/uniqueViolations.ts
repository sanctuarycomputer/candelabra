const uniqueViolations = (violations: Violation[]): Violation[] => {
  return violations.reduce(
    (uniques: Violation[], violation: Violation): Violation[] => {
      const violationIsDuplicate: boolean = uniques.some(
        (existingViolation: Violation): boolean =>
          isEqual(existingViolation, violation)
      );

      return violationIsDuplicate ? uniques : uniques.concat([violation]);
    },
    []
  );
};
