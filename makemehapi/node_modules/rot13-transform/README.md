# ROT-13 Cypher Stream

Implementation of the ROT-13 cypher using streams.

rot13 is a transform stream.  You can pipe a readable
stream into it and pipe it into a writable stream.

    var rot13 = require("rot13-transform");

    ReadableStreamString("this is a string")
        .pipe(rot13())
        .pipe(process.stdout);

This prints out `guvf vf n fgevat`.

rot13 *does not* transform non-letters.  It will only transform
A-Z and a-z.

You can decrypt ROT-13 by running it through the cypher again.

    ReadableStreamString("this is a string")
        .pipe(rot13())
        .pipe(rot13())
        .pipe(process.stdout);

This prints out `this is a string`.
