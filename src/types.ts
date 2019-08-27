import { Result } from 'axe-core';

export enum OutputFormat {
  INLINE = 'INLINE',
  JSON = 'JSON'
}

export enum OutputStyle {
  SEVERITY = 'SEVERITY',
  PAGE = 'PAGE',
  TYPE = 'TYPE'
}

export interface Sitemap {
  [key: string]: UrlResults;
}

export type Url = string;

export interface UrlResults {
  [key: string]: Result[];
}
