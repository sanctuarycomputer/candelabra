#!/usr/bin/env node
import candelabra from 'commander';

// babel polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { description, version } from '../package.json';
import checkWebsiteForViolations from './checkWebsiteForViolations';
import { Url, CommandOptions } from './types';

candelabra.version(version).description(description);

candelabra
  .option(
    '-o, --output <path>',
    'file path to output json, defaults to displaying inline'
  )
  .option(
    '-g, --groupBy <group>',
    'SEVERITY | PAGE | TYPE, defaults to SEVERITY'
  )
  .option(
    '-l, --limit <group>',
    'limit the number of URLs to crawl, defaults to 1000'
  )
  .command('* <url>')
  .action((url: Url): void => {
    const commanderOptions: any = candelabra.opts();
    const options: CommandOptions = {
      output: commanderOptions.output,
      groupBy: commanderOptions.groupBy,
      limit: commanderOptions.limit || 1000
    };

    checkWebsiteForViolations(url, options);
  });

candelabra.parse(process.argv);
