#!/usr/bin/env node

const candelabra = require('commander');
const { description, version } = require('./package.json');

candelabra.version(version).description(description);

candelabra.command('* <url>').action(url => {
  console.log(url);
});

candelabra.parse(process.argv);
