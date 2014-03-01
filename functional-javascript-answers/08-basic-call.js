/*
Task:

Write a function `duckCount` that returns the number of arguments passed to it which
have a property 'quack' defined directly on them. Do not match values inherited
from prototypes.

Example:

```js

var notDuck = Object.create({quack: true})
var duck = {quack: true}
duckCount(duck, notDuck) // 1

```
Arguments:

* You will be passed 0-20 arguments. Each argument could be of any type with any
  properties. Some of these items will have a 'quack' property.

Conditions:

* Do not use any for/while loops.
* Do not create any counter/accumulator variables.
* You do not need to define any additional name functions
  unless a stub is provided in the boilerplate.

Hint:

* The arguments variable, available in every function,
  is an object that quacks like an Array
*/

function duckCount () {
  return Array.prototype.filter.call(arguments, function (item) {
    return Object.prototype.hasOwnProperty.call(item, 'quack')
  }).length
}

module.exports = duckCount