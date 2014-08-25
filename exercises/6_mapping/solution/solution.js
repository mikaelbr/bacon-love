var Bacon = require('baconjs');

module.exports = function (authors) {
  return authors.map(function(author) {
    return author.name.last + ', ' + author.name.first;
  });
};
