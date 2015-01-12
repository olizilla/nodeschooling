var rot13 = require("./index"),
    fs = require("fs"),
    ReadableString = require("readable-string"),
    should = require("should"),
    mktemp = require("mktemp");

describe("rot13 transform", function () {
    it("should ROT-13 a string", function (done) {
        var rot13Stream = ReadableString("rot13 cypered becomes this").pipe(rot13()),
            transformedString = "";

        function read() {
            var buf;
            while (buf = rot13Stream.read()) {
                transformedString += buf;
            }
        }

        rot13Stream.on("readable", read);
        rot13Stream.once("end", function () {
            transformedString.should.equal("ebg13 plcrerq orpbzrf guvf");
            done();
        });
    });

    it("should ROT-13 a file", function (done) {
        mktemp.createFile("rot13-transform-test-XXXXXX", function (err, filename) {
            var tempWriteStream = fs.createWriteStream(filename);

            should.not.exist(err);

            ReadableString("write this to a file")
                .pipe(rot13())
                .pipe(tempWriteStream)
            ;

            tempWriteStream.on("finish", function () {
                fs.readFileSync(filename).toString().should.equal("jevgr guvf gb n svyr");
                fs.unlink(filename, function (err) {
                    if (err) {
                        console.error("Unable to delete temp testing file: ", err);
                    }
                });
                done();
            });
        });
    });

    it("should ignore non-letters in transform", function (done) {
        var transformedString = "",
            testString = "^!@#&!@#$(123405123\n\n[]{}'\"\\",
            rot13Stream = ReadableString(testString).pipe(rot13());

        function read() {
            var buf;
            while (buf = rot13Stream.read()) {
                transformedString += buf;
            }
        }

        rot13Stream.on("readable", read);
        rot13Stream.once("end", function () {
            transformedString.should.equal(testString);
            done();
        });
    });

    it("should reverse the cypher", function (done) {
        var transformedString = "",
            testString = "rot13 will reverse itself",
            rot13Stream = ReadableString(testString)
                .pipe(rot13())
                .pipe(rot13());

        function read() {
            var buf;
            while (buf = rot13Stream.read()) {
                transformedString += buf;
            }
        }

        rot13Stream.on("readable", read);
        rot13Stream.once("end", function () {
            transformedString.should.equal(testString);
            done();
        });
    });
});
