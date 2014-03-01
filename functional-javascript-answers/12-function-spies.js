/*
Override a specified method of an object with new functionality while still maintaining all of the old
behaviour.

Create a spy that keeps track of how many times a function is called.

#############
## Example ##
#############

```js
var spy = Spy(console, 'error')

console.error('calling console.error')
console.error('calling console.error')
console.error('calling console.error')

console.log(spy.count) // 3

```

Arguments:

* target: an object containing the method `method`
* method: a string with the name of the method on `target` to spy on.

Conditions:

* Do not use any for/while loops.
* You do not need to define any additional functions
 unless a stub is provided in the boilerplate.

Hint:

* Functions have context, input and output. Make sure you match the context,
  the input to *and output from* the function you are spying on.

*/

function Spy(target, method) {

  var spy = {
    count:0
  }
  
  var original = target[method]
  
  target[method] = function () {
    spy.count++;
    return original.apply(target, arguments)
  }

  return spy
}

module.exports = Spy