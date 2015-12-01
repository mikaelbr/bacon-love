# Error Handling

Handling error-cases when doing client-side programming is something we do all
the time. If the server is offline when we try to communicate with it or when
sending an invalid request.

There are no concrete guidelines in FRP theory on how implementations should
handle error-events. Some languages and platforms might not separate error-
events and other events at all. This is not the case with Bacon.js however. By
default error-events, events that are an instance of Error, will be separated
from other events and you need to attach a special onError-subscriber to
handle them.

Bacon.js also passes Error-events through all stream combinators. Even if you
filter all values out the Error-events will go through. Error-events from the
source stream will also pass through flatMaps. The reason for this is to not
loose errors on in the network and to be able to handle errors on the edges
instead.

## Problem Description

Given an observable representing the result of an async task that can error
you should return an observable representing the presence of an error. This
observable can be used to for instance show an error-message.

## Template

```js
export default (Bacon, asyncTask) => {
  const showErrorMessage;

  return showErrorMessage;
};
```