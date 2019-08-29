import { Totals, Url, Violation } from './types';
import groupByPage from './groupByPage';
import uniqueViolations from './uniqueViolations';
import calculateScore from './calculateScore';

export default (url: Url, totalViolations: Violation[]): Totals => ({
  url,
  score: calculateScore(totalViolations),
  totalPages: Object.keys(groupByPage(totalViolations)).length,
  uniqueViolations: uniqueViolations(totalViolations),
  violations: totalViolations
});
