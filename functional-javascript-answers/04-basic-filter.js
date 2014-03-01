/*
Use Array#filter to write a function called `getShortMessages`.

`getShortMessages` takes an array of objects with '.message' properties
and prints any messages that are *less than < 50 characters long*.

Arguments:

* messages: an Array of 10 to 100 random objects that look something like this:

```js

{
  message: 'Esse id amet quis eu esse aute officia ipsum.' // random
}

```

Conditions:

* Do not use for loops or Array#forEach.

Hint: Try chaining some Array methods!

Expected Output:

The output should be an array containing the messages themselves, without their containing object.

e.g.

```

[ 'Tempor quis esse consequat sunt ea eiusmod.',
  'Id culpa ad proident ad nulla laborum incididunt.',
  'Ullamco in ea et ad anim anim ullamco est.',
  'Est ut irure irure nisi.' ]

```
*/

module.exports = function getShortMessages (messages) {
  return messages
    .filter(function shortOnes (obj) {
      return obj.message.length < 50
    })
    .map(function flatten (obj) {
      return obj.message
    })
}