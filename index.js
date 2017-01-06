#!/usr/bin/env node

require('./enforce-node-version')();

const workshopper = require('workshopper-adventure');
const menu = require('./exercises/menu.json');
const join = require('path').join;


var w = workshopper({
  name: 'bacon-love',
  title: 'A Workshop for Functional Reactive Programming',
  // exerciseDir: join(__dirname, 'exercises'),
  appDir: __dirname,
  menu: {
    fg: 'cyan',
    bg: 'black',
  }
});

w.addAll(menu);
w.execute(process.argv.slice(2));
