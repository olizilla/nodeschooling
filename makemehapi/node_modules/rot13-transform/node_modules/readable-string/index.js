var Readable = require("readable-stream").Readable,
    inherits = require("inherits");

function ReadableString(string, options) {
    if (!(this instanceof ReadableString)) {
        return new ReadableString(string, options);
    }
    this._string = new Buffer(string);
    this._lastStart = 0;

    Readable.call(this, options);
}
inherits(ReadableString, Readable);

ReadableString.prototype._read = function (end) {
    this.push(this._string.slice(this._lastStart), end);

    this._lastStart = end;
    // Finished reading; got to end of the buffer
    if (this._lastStart >= this._string.length) {
        this.push(null);
    }
};

module.exports = ReadableString;
