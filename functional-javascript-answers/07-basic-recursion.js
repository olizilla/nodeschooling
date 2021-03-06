/*
Array#reduce

##########
## Task ##
##########

Implement Array#reduce using recursion.

To test your reduction works correctly we will use your reduce implementation to execute our solution
to the previous basic_reduce problem. i.e. your reduce function will be passed an array of words, and 
a function, and an initial value which will return an object containing the counts for each word found
in the array. You don't need to implement this functionality, it will supplied to your reduce
implementation.

For simplicity, your implementation of reduce **need not replicate the behaviour of a reduce missing an initial value**.
You may assume the initial value will always be supplied.

###############
## Arguments ##
###############

* arr: An Array to reduce over
* fn: Function to use as the reduction step. 
  Like regular Array#reduce, this function must be passed previousValue, currentValue, index and the array we're iterating over.
* init: Initial value of the reduction. Unlike Array#reduce, this value is required (and you may assume it will always be supplied).

#############
## Example ##
#############

```js

// Your reduce function should behave the same as a
// regular Array#reduce, but it will take the array
// to operate on as the first argument:

reduce([1,2,3], function(prev, curr, index, arr) {
  return prev + curr
}, 0)
// => 6

```

################
## Conditions ##
################

* Do not use any for/while loops.
* Do not use any Array methods like map or reduce.
*/

function reduce (arr, fn, initial) {

  function accumulate(index, res) {
    if (index === arr.length) return res;

    res = fn(res, arr[index], index, arr)

    return accumulate(++index, res)
  }

  return accumulate(0, initial)
}

module.exports = reduce

