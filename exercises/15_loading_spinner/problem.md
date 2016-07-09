# Loading Spinner

Showing a spinner while performing some async task is a very common pattern in
client-side programming. In this exercise we will look at how this can be
solved by FRP.

## Problem Description

Your task will be to create an observable which holds the current visibility
of a spinner. You will be supplied with one observable which is a stream of
clicks and one function that when called will return an observable
representing the result of the async task.

The spinner should only be visible after the button has been clicked and while
waiting for the result of an async operation.

## Template

```js
module.exports = (Bacon, clicks, startAsyncTask) => {
  const spinnerVisibility;

  return spinnerVisibility;
};
```
