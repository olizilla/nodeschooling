# Readable String 0.1.1

A simple module that takes an input stream and converts
it to a readable stream.  This can be used to simplify
testing of streams by providing a usable stream with a
`.pipe` method that can be created on the fly and has
a known value.

## Usage

    ReadableString(string, streamOptions)

You can pass stream options as the second argument
to `ReadableString`.

    var ReadableString = require("readable-string");

    ReadableString("Print to stdout\n", {encoding: "utf8"})
        .pipe(process.stdout);
