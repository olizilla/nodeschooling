/*
In this challenge, we're going to implement a 'curry' function for an arbitrary number of arguments.

`curryN` will take two parameters:

* fn: The function we want to curry.
* n: Optional number of arguments to curry.
  If not supplied, `curryN` should use the fn's arity as the value for `n`.
*/

function curryN(fn, n) {
  if (!n) n = fn.length;

  if (n < 1) return fn();

  return function(arg){
    return curryN(fn.bind(this, arg), --n)  
  }
}


module.exports = curryN