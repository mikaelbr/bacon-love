#!/usr/bin/env node

require('./enforce-node-version')();

const workshopper = require('workshopper-adventure');
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
})


w.addAll([
  "01. Intro to the workshop",
  "02. Wrapping Values as Reactive Datatypes",
  "03. Subscription Based",
  "04. EventStreams",
  "05. Properties",
  "06. Map and Filter",
  "07. Fold and Scan",
  "08. Combining Observables, part I",
  "09. Combining Observables, part II",
  "10. And or Or or Maybe Not",
  "11. Sampled",
  "12. Selective Data By Timing",
  "13. Flatmaps",
  "14. Field and Form Validation",
  "15. Loading Spinner",
  "16. Error Handling"
])

w.execute(process.argv.slice(2));
