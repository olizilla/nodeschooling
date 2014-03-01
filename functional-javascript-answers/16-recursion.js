/*
Implement a recursive function that prints all of the unique dependencies, and sub-dependencies
of a module, sorted alphabetically. Dependencies should be printed as dependency@version
e.g. 'inflection@1.2.6'. Multiple versions of the same module are allowed, but duplicates modules of
the same version should be removed.

Arguments:

* tree: A dependency tree. See below for an example of the structure. 

#############
## Example ##
#############

```js
var loremIpsum = {
  "name": "lorem-ipsum", 
  "version": "0.1.1",
  "dependencies": {
    "optimist": {
      "version": "0.3.7",
      "dependencies": {
        "wordwrap": {
          "version": "0.0.2"
        }
      }
    },
    "inflection": {
      "version": "1.2.6"
    }
  }
}

getDependencies(loremIpsum) // => [ 'inflection@1.2.6', 'optimist@0.3.7', 'wordwrap@0.0.2' ]

```

Conditions:

* Do not use any for/while loops.


#################
## Boilerplate ##
#################

```js

function getDependencies(tree) {
  // SOLUTION GOES HERE
  // Note: Feel free to add additional arguments
  // to this function for use with recursive calls.
  // Or not! There are many ways to recurse.
}

module.exports = getDependencies

```
*/

// @return [String]
function getDependencies(tree) {
  // SOLUTION GOES HERE
  // Note: Feel free to add additional arguments
  // to this function for use with recursive calls.
  // Or not! There are many ways to recurse

  var deps = []
  
  if (!tree || !tree.dependencies) return deps;

  Object.keys(tree.dependencies).forEach(function(name){
    var dep = tree.dependencies[name]
    deps.push(name + "@" + dep.version)
    deps = deps.concat(getDependencies(dep))
  })

  return dedupe(deps).sort()
} 

function dedupe(arr) {
  var map = arr.reduce(function(map, item){
    map[item] = item
    return map
  }, {})

  return Object.keys(map)
}

module.exports = getDependencies
