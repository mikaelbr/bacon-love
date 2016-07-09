#!/usr/bin/env node

require('./enforce-node-version')();

const workshopper = require('workshopper');
const join = require('path').join;

workshopper({
  name: 'bacon-love',
  title: 'A Workshop for Functional Reactive Programming',
  exerciseDir: join(__dirname, 'exercises'),
  appDir: __dirname,
  menu: {
    fg: 'cyan',
    bg: 'black',
  }
});
