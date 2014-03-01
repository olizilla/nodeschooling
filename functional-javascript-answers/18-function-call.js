/*
Write a function that allows you to use `Array.prototype.slice` without 
using `.call` to invoke it.
*/

module.exports = Function.prototype.call.bind(Array.prototype.slice)
