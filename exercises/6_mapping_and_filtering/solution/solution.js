var Bacon = require('baconjs');

module.exports = function (authors) {
  function authorName(author) {
    return author.name.last + ', ' + author.name.first;
  }

  var authorNames = authors.map(authorName);

  var popularAuthors = authors.filter(function(author) {
    return author.readers > 10000;
  });

  var popularAuthorNames = popularAuthors.map(authorName);

  return {
    a: authorNames,
    b: popularAuthors,
    c: popularAuthorNames
  };
};
