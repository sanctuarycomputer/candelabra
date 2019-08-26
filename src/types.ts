import { Result } from 'axe-core';

export interface Sitemap {
  [key: string]: UrlResults;
}

export type Url = string;

export interface UrlResults {
  [key: string]: Result[];
}
