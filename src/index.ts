#!/usr/bin/env node
import candelabra from 'commander';

// babel polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { description, version } from '../package.json';
import checkWebsiteForViolations from './checkWebsiteForViolations';
import { Url } from './types';

candelabra.version(version).description(description);

candelabra.command('* <url>').action((url: Url): void => {
  checkWebsiteForViolations(url);
});

candelabra.parse(process.argv);
