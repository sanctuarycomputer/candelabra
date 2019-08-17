#!/usr/bin/env node

const candelabra = require('commander');
const { description, version } = require('./package.json');

const generateSitemap = require('./lib/generateSitemap');

candelabra.version(version).description(description);

candelabra.command('* <url>').action(url => {
  console.log('Building a site map for: ', url);

  const sitemap = generateSitemap(url);
});

candelabra.parse(process.argv);
