# Mapping and filtering over values in an EventStream

As an introdution to mapping we will take a stream of authors on this form:
````json
{
  "name": {
    "first": "First",
    "last": "Last"
  },
  "rating": {
    "value": 7,
    "max": 10
  },
  "readers": 123124,
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

What you should return is a stream of the names of the authors on the form: "last, first".

## Template


```js
// include the Bacon.js library
var Bacon = require('baconjs');

module.exports = function (authors) {
  return authorNames;
};
```
