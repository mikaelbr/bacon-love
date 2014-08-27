var Bacon = require('baconjs');

module.exports = function (fieldA, validationA, fieldB, validationB, fieldC, validationC) {
  var a = fieldA.map(validationA).toProperty(false);
  var b = fieldB.filter(Boolean).map(validationB).toProperty(true);
  var c = fieldC.map(validationC).toProperty(false);

  var form = a.and(b).and(c);

  return {
    fieldAValid: a,
    fieldBValid: b,
    fieldCValid: c,
    formValid: form
  };
};