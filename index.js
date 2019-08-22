#!/usr/bin/env node

const candelabra = require('commander');
const { description, version } = require('./package.json');

const checkWebsiteForViolations = require('./lib/checkWebsiteForViolations');

candelabra.version(version).description(description);

candelabra.command('* <url>').action(url => {
  const sitemap = checkWebsiteForViolations(url);
});

candelabra.parse(process.argv);
