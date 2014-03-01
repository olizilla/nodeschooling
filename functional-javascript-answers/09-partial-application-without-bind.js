/*
##########
## Task ##
##########

Implement a logging function that prepends a namespace string to its output.

Your implementation should take a namespace string, and return a function that prints
messages to the console with the namespace prepended.

Make sure *all* arguments passed to the returned logging function are printed.

** Print the output to the console directly **

###############
## Arguments ##
###############

* namespace: a String to prepend to each message passed to the returned function.

#############
## Example ##
#############

```js

var info = logger('INFO:')
info('this is an info message')
// INFO: this is an info message

var warn = logger('WARN:')
warn('this is a warning message', 'with more info')
// WARN: this is a warning message with more info

```

################
## Conditions ##
################

* Do not use Function#bind

#################
## Boilerplate ##
#################

```js

var slice = Array.prototype.slice

function logger(namespace) {
  // SOLUTION GOES HERE
}

module.exports = logger

```

###############
## Resources ##
###############

* https://en.wikipedia.org/wiki/Partial_application
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

###########
## Hints ##
###########

Remember `console.log` takes any number of arguments and prints them, separated by spaces:

```js

console.log('hello', 'world') // => 'hello world'
console.log(1,2,3) // => 1 2 3

```

We simply want to 'partially apply' the first argument to `console.log`.

`Function.prototype.apply` allows us to execute a function, supply a new 'value for this'
(we can ignore in this case), and then *an array of arguments to apply to the function*:


```js

add(10, 20) // => 30
add.apply(null, [10, 20]) // => 30

```

Also contrast `apply` with `Function.prototype.call`:

```js

add.apply(null, [10, 20]) // => 30
add.call(null, 10, 20) // => 30

```

*/

function logger (namespace) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    args.unshift(namespace)
    console.log.apply(null, args)
  }
}

module.exports = logger


