module.exports = function (Bacon, fieldA, validationA, fieldB, validationB, fieldC, validationC) {
  var a = fieldA.map(validationA).toProperty(false);
  var b = fieldB.map(function (value) { return value ? validationB(value) : true; }).toProperty(true);
  var c = fieldC.map(validationC).toProperty(false);

  var form = a.and(b).and(c);

  return {
    fieldAValid: a,
    fieldBValid: b,
    fieldCValid: c,
    formValid: form
  };
};