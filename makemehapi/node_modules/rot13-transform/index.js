var x,
    Transform = require("readable-stream").Transform,
    inherits = require("inherits"),
    transformMap = {};

// 65 = A, 77 = N, 90 = Z, 97 = a, etc.
// Allow immediate lookup of corresponding rotate character
for (x = 65; x <= 77; x++) {
    transformMap[x] = x + 13;
}
for (x = 78; x <= 90; x++) {
    transformMap[x] = x - 13;
}
for (x = 97; x <= 109; x++) {
    transformMap[x] = x + 13;
}
for (x = 110; x <= 122; x++) {
    transformMap[x] = x - 13;
}

// Perform rotate on the provided character code
function rotate(charCode) {
    if (transformMap.hasOwnProperty(charCode)) {
        charCode = transformMap[charCode];
    }
    return String.fromCharCode(charCode);
}

function Rot13(options) {
    if (!(this instanceof Rot13)) {
        return new Rot13(options);
    }

    Transform.call(this, options);
}
inherits(Rot13, Transform);

Rot13.prototype._transform = function (chunk, enc, done) {
    var x,
        str = chunk.toString();

    for (x = 0; x < str.length; x++) {
        this.push(rotate(str.charCodeAt(x)));
    }

    done();
};

module.exports = Rot13;
