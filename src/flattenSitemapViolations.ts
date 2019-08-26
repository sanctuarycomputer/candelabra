const flattenSitemapViolations = (sitemap: Sitemap): Violation[] =>
  Object.values(sitemap).reduce((urlViolations, url) => {
    const violationCategories = Object.values(url);
    const violationsFromCategory = violationCategories.reduce(
      (mergedViolations, violationCategory) => {
        const { id, impact, description } = violationCategory;
        const flattenedViolations = violationCategory.nodes.map(violation => ({
          id,
          impact,
          description,
          html: violation.html
        }));

        return mergedViolations.concat(flattenedViolations);
      },
      []
    );

    return urlViolations.concat(violationsFromCategory);
  }, []);
