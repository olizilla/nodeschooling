/* 
Write a program that accepts one or more numbers as command-line
arguments and prints the sum of those numbers to the console (stdout).
*/
var sum = 0;
process.argv.slice(2).forEach(function (arg) {
  sum += +arg;
});
console.log(sum);