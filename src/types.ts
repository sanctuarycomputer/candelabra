import { Result, NodeResult } from 'axe-core';
import uniqueViolations from 'uniqueViolations';

export type AxeImpact =
  | 'critical'
  | 'serious'
  | 'moderate'
  | 'minor'
  | 'no-impact';

export type AxeRule =
  | 'accesskeys'
  | 'area-alt'
  | 'aria-allowed-attr'
  | 'aria-allowed-role'
  | 'aria-dpub-role-fallback'
  | 'aria-hidden-body'
  | 'aria-hidden-focus'
  | 'aria-input-field-name'
  | 'aria-required-attr'
  | 'aria-required-children'
  | 'aria-required-parent'
  | 'aria-roles'
  | 'aria-toggle-field-name'
  | 'aria-valid-attr-value'
  | 'aria-valid-attr'
  | 'audio-caption'
  | 'autocomplete-valid'
  | 'avoid-inline-spacing'
  | 'blink'
  | 'button-name'
  | 'bypass'
  | 'checkboxgroup'
  | 'color-contrast'
  | 'css-orientation-lock'
  | 'definition-list'
  | 'dlitem'
  | 'document-title'
  | 'duplicate-id-active'
  | 'duplicate-id-aria'
  | 'duplicate-id'
  | 'empty-heading'
  | 'focus-order-semantics'
  | 'form-field-multiple-labels'
  | 'frame-tested'
  | 'frame-title-unique'
  | 'frame-title'
  | 'heading-order'
  | 'hidden-content'
  | 'html-has-lang'
  | 'html-lang-valid'
  | 'html-xml-lang-mismatch'
  | 'image-alt'
  | 'image-redundant-alt'
  | 'input-button-name'
  | 'input-image-alt'
  | 'label-content-name-mismatch'
  | 'label-title-only'
  | 'label'
  | 'landmark-banner-is-top-level'
  | 'landmark-complementary-is-top-level'
  | 'landmark-contentinfo-is-top-level'
  | 'landmark-main-is-top-level'
  | 'landmark-no-duplicate-banner'
  | 'landmark-no-duplicate-contentinfo'
  | 'landmark-one-main'
  | 'landmark-unique'
  | 'layout-table'
  | 'link-in-text-block'
  | 'link-name'
  | 'list'
  | 'listitem'
  | 'marquee'
  | 'meta-refresh'
  | 'meta-viewport-large'
  | 'meta-viewport'
  | 'object-alt'
  | 'p-as-heading'
  | 'page-has-heading-one'
  | 'radiogroup'
  | 'region'
  | 'role-img-alt'
  | 'scope-attr-valid'
  | 'scrollable-region-focusable'
  | 'server-side-image-map'
  | 'skip-link'
  | 'tabindex'
  | 'table-duplicate-name'
  | 'table-fake-caption'
  | 'td-has-header'
  | 'td-headers-attr'
  | 'th-has-data-cells'
  | 'valid-lang'
  | 'video-caption'
  | 'video-description';

export interface CommandOptions {
  output: Filepath | null;
  groupBy: OutputGroupBy | null;
}

export type Filepath = string;

export enum OutputGroupBy {
  SEVERITY = 'SEVERITY',
  PAGE = 'PAGE',
  TYPE = 'TYPE'
}

export type Sitemap = {
  [key in Url]: UrlResults;
};

export interface Totals {
  url: Url;
  score: number;
  totalPages: number;
  violations: Violation[];
  uniqueViolations: Violation[];
}

export type Url = string;

export type UrlResults = {
  [key in Url]: Result[];
};

export interface Violation extends NodeResult {
  page: Url;
  rule: AxeRule;
}

export type ViolationsGroupedByPage = {
  [key in Url]: Violation[];
};

export type ViolationsGroupedByRule = {
  [key: string]: Violation[];
};

export type ViolationsGroupedBySeverity = {
  [key in AxeImpact]: Violation[];
};
