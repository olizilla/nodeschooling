/*
Write a module that stores valid 2, 3 and 4 character Scrabble words
and is able to retrieve them according to basic prefix-queries.

Your module should export an `init()` function that accepts 3
arguments: a LevelUP `db` object for an empty database, an array of
2, 3 and 4 character Scrabble words and callback that you must call
once you have finished initialising the database.

Your module should also export a `query()` method that also accepts
3 arguments: a LevelUP `db` object (the same store that you
initialised with `init()`), a `word` string containing the query, and
a callback that you must call with either an error object as the first
argument or an array of strings matching the `word` query.

Here is a boilerplate module that you can extend for your solution:

    module.exports.init = function (db, words, callback) {
      // insert each word in the words array here
      // then call `callback()` when you are done inserting words
    }

    module.exports.query = function (db, word, callback) {
      // `word` may have '*' chars to denote single-letter wildcards
      // call callback(err, results) with an array of matching words
    }

The `word` query may be a complete word, e.g. 'RUN', or a prefix of a
word with '*' characters filling in the blanks, e.g. 'RU*' or 'R**'.
The `.length` will tell you how long the word should be, your results
should only include words of that length. The '*' characters are
wild-cards that can match any character.

For simplicity, the wild-cards will only be on the end of a query.
You will always be given either a complete word or a word prefix. You
must limit your results to words of the same length and with the same
prefix.

Your solution will be tested against the official solution, you must
use a ReadStream that only returns the exact words that your query
needs to match, and no more.
*/

/*
keys like
3!RUN
6!RUNNER
*/


module.exports = {
  init: function (db, words, cb) {
    var ops = words.map(function(word){
      return {
        type: 'put',
        key: word.length + '!' + word.toUpperCase(),
        value: word
      }
    })

    db.batch(ops, function(){
      cb()
    })
  },

  query: function (db, word, cb) {
    var res = []

    var key = word.length + '!' + word.toUpperCase()

    if (key.indexOf('*') > -1 ) {
      key = key.substring(0, key.indexOf('*'))
    }

    db.createReadStream({ start: key, end: key + '\xff'})
      .on('data', function (data) {
        res.push(data.value)
      })
      .on('end', function () {
        if(!cb) return;
        cb(null, res)
        cb = null
      })
      .on('error', function (err) {
        if(!cb) return;
        cb(err)
        cb = null
      })
  }
}
