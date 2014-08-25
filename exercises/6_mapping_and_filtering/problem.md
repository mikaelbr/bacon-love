# Mapping and filtering over values in an EventStream

As an introdution to mapping we will take a stream of authors on this form:
```json
{
  "name": {
    "first": "First",
    "last": "Last"
  },
  "rating": {
    "value": 7,
    "max": 10
  },
  "readers": 12345,
  "books": [
    {
      "title": "book1",
      "pages": 123
    },
    {
      "title": "book2",
      "pages": 321
    }
  ]
}
```

What you should do to solve this exercise is to return these three things:

a. A stream of author names on the form "last, first"
b. A stream of authors with over 10 000 readers
c. A stream of author names with over 10 000 readers

## Template


```js
// include the Bacon.js library
var Bacon = require('baconjs');

module.exports = function (authors) {
  return {
    a: authorNames,
    b: popularAuthors,
    c: popularAuthorNames
  };
};
```
