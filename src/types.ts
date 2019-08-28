import { Result } from 'axe-core';

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

export interface Sitemap {
  [key: string]: UrlResults;
}

export type Url = string;

export interface UrlResults {
  [key: string]: Result[];
}
