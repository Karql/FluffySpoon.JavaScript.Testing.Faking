"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var index_1 = require("../src/index");
var Utilities_1 = require("../src/Utilities");
var Dummy = /** @class */ (function () {
    function Dummy() {
    }
    return Dummy;
}());
var Example = /** @class */ (function () {
    function Example() {
        this.a = "1337";
    }
    Example.prototype.c = function (arg1, arg2) {
        return "hello " + arg1 + " world (" + arg2 + ")";
    };
    Object.defineProperty(Example.prototype, "d", {
        get: function () {
            return 1337;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Example.prototype, "v", {
        set: function (x) {
        },
        enumerable: true,
        configurable: true
    });
    Example.prototype.received = function (stuff) {
    };
    Example.prototype.returnPromise = function () {
        return Promise.resolve(new Dummy());
    };
    Example.prototype.foo = function () {
        return 'stuff';
    };
    Example.prototype.bar = function (a, b) {
        return a + b || 0;
    };
    return Example;
}());
exports.Example = Example;
var instance;
var substitute;
function initialize() {
    instance = new Example();
    substitute = index_1.Substitute.for();
}
;
ava_1.default('can call received twice', function (t) {
    initialize();
    substitute.c('blah', 'fuzz');
    t.throws(function () { return substitute.received(1337).c('foo', 'bar'); }, "Expected 1337 calls to the method c with arguments ['foo', 'bar'], but received none of such calls.\nAll calls received to method c:\n-> call with arguments ['blah', 'fuzz']");
    t.throws(function () { return substitute.received(2117).c('foo', 'bar'); }, "Expected 2117 calls to the method c with arguments ['foo', 'bar'], but received none of such calls.\nAll calls received to method c:\n-> call with arguments ['blah', 'fuzz']");
});
ava_1.default('class string field get returns', function (t) {
    initialize();
    substitute.a.returns("foo", "bar");
    t.deepEqual(substitute.a, 'foo');
    t.deepEqual(substitute.a, 'bar');
    t.deepEqual(substitute.a, void 0);
    t.deepEqual(substitute.a, void 0);
});
ava_1.default('class with method called "received" can be used for call count verification when proxies are suspended', function (t) {
    initialize();
    index_1.Substitute.disableFor(substitute).received(2);
    t.throws(function () { return substitute.received(2).received(2); });
    t.notThrows(function () { return substitute.received(1).received(2); });
});
ava_1.default('class with method called "received" can be used for call count verification', function (t) {
    initialize();
    index_1.Substitute.disableFor(substitute).received('foo');
    t.notThrows(function () { return substitute.received(1).received('foo'); });
    t.throws(function () { return substitute.received(2).received('foo'); });
});
ava_1.default('partial mocks using function mimicks with all args', function (t) {
    initialize();
    substitute.c(index_1.Arg.all()).mimicks(instance.c);
    t.deepEqual(substitute.c('a', 'b'), 'hello a world (b)');
});
ava_1.default('class string field get received', function (t) {
    initialize();
    void substitute.a;
    void substitute.a;
    void substitute.a;
    void substitute.a;
    t.throws(function () { return substitute.received(3).a; });
    t.notThrows(function () { return substitute.received().a; });
    t.notThrows(function () { return substitute.received(4).a; });
});
ava_1.default('class string field set received', function (t) {
    initialize();
    substitute.v = undefined;
    substitute.v = null;
    substitute.v = 'hello';
    substitute.v = 'hello';
    substitute.v = 'world';
    t.notThrows(function () { return substitute.received().v = 'hello'; });
    t.notThrows(function () { return substitute.received(5).v = index_1.Arg.any(); });
    t.notThrows(function () { return substitute.received().v = index_1.Arg.any(); });
    t.notThrows(function () { return substitute.received(2).v = 'hello'; });
    t.notThrows(function () { return substitute.received(2).v = index_1.Arg.is(function (x) { return x && x.indexOf('ll') > -1; }); });
    t.throws(function () { return substitute.received(2).v = index_1.Arg.any(); });
    t.throws(function () { return substitute.received(1).v = index_1.Arg.any(); });
    t.throws(function () { return substitute.received(1).v = index_1.Arg.is(function (x) { return x && x.indexOf('ll') > -1; }); });
    t.throws(function () { return substitute.received(3).v = 'hello'; });
});
ava_1.default('class method returns with placeholder args', function (t) {
    initialize();
    substitute.c(index_1.Arg.any(), "there").returns("blah", "haha");
    t.is(substitute.c("hi", "there"), 'blah');
    t.is(substitute.c("his", "there"), 'haha');
    t.is(substitute.c("his", "there"), void 0);
    t.is(substitute.c("hi", "there"), void 0);
});
ava_1.default('partial mocks using function mimicks with specific args', function (t) {
    initialize();
    substitute.c('a', 'b').mimicks(instance.c);
    t.is(substitute.c('a', 'b'), 'hello a world (b)');
});
ava_1.default('class method returns with specific args', function (t) {
    initialize();
    substitute.c("hi", "there").returns("blah", "haha");
    t.is(substitute.c("hi", "there"), 'blah');
    t.is(substitute.c("hi", "there"), 'haha');
    t.is(substitute.c("hi", "there"), void 0);
    t.is(substitute.c("hi", "there"), void 0);
});
ava_1.default('returning other fake from promise works', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var otherSubstitute, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                initialize();
                otherSubstitute = index_1.Substitute.for();
                substitute.returnPromise().returns(Promise.resolve(otherSubstitute));
                _b = (_a = t).is;
                _c = [otherSubstitute];
                return [4 /*yield*/, substitute.returnPromise()];
            case 1:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('returning resolved promises works', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                initialize();
                substitute.returnPromise().returns(Promise.resolve(1338));
                _b = (_a = t).is;
                _c = [1338];
                return [4 /*yield*/, substitute.returnPromise()];
            case 1:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('class void returns', function (t) {
    initialize();
    substitute.foo().returns(void 0, null);
    t.is(substitute.foo(), void 0);
    t.is(substitute.foo(), null);
});
ava_1.default('class method received', function (t) {
    initialize();
    void substitute.c("hi", "there");
    void substitute.c("hi", "the1re");
    void substitute.c("hi", "there");
    void substitute.c("hi", "there");
    void substitute.c("hi", "there");
    t.notThrows(function () { return substitute.received(4).c('hi', 'there'); });
    t.notThrows(function () { return substitute.received(1).c('hi', 'the1re'); });
    t.notThrows(function () { return substitute.received().c('hi', 'there'); });
    t.throws(function () { return substitute.received(7).c('hi', 'there'); }, "Expected 7 calls to the method c with arguments ['hi', 'there'], but received 4 of such calls.\nAll calls received to method c:\n-> call with arguments ['hi', 'there']\n-> call with arguments ['hi', 'the1re']\n-> call with arguments ['hi', 'there']\n-> call with arguments ['hi', 'there']\n-> call with arguments ['hi', 'there']");
});
ava_1.default('received call matches after partial mocks using property instance mimicks', function (t) {
    initialize();
    substitute.d.mimicks(function () { return instance.d; });
    substitute.c('lala', 'bar');
    substitute.received(1).c('lala', 'bar');
    substitute.received(1).c('lala', 'bar');
    t.notThrows(function () { return substitute.received(1).c('lala', 'bar'); });
    t.throws(function () { return substitute.received(2).c('lala', 'bar'); }, "Expected 2 calls to the method c with arguments ['lala', 'bar'], but received 1 of such call.\nAll calls received to method c:\n-> call with arguments ['lala', 'bar']");
    t.deepEqual(substitute.d, 1337);
});
ava_1.default('partial mocks using property instance mimicks', function (t) {
    initialize();
    substitute.d.mimicks(function () { return instance.d; });
    t.deepEqual(substitute.d, 1337);
});
ava_1.default('are arguments equal', function (t) {
    initialize();
    t.true(Utilities_1.areArgumentsEqual(index_1.Arg.any(), 'hi'));
    t.true(Utilities_1.areArgumentsEqual(index_1.Arg.any('array'), ['foo', 'bar']));
    t.false(Utilities_1.areArgumentsEqual(['foo', 'bar'], ['foo', 'bar']));
    t.false(Utilities_1.areArgumentsEqual(index_1.Arg.any('array'), 1337));
});
ava_1.default('verifying with more arguments fails', function (t) {
    initialize();
    substitute.bar(1);
    substitute.received().bar(1);
    t.throws(function () { return substitute.received().bar(1, 2); });
});
ava_1.default('verifying with less arguments fails', function (t) {
    initialize();
    substitute.bar(1, 2);
    substitute.received().bar(1, 2);
    t.throws(function () { return substitute.received().bar(1); });
});
ava_1.default('return with more arguments is not matched fails', function (t) {
    initialize();
    substitute.bar(1, 2).returns(3);
    t.is(3, substitute.bar(1, 2));
    t.is('function', typeof (substitute.bar(1)));
});
ava_1.default('return with less arguments is not matched', function (t) {
    initialize();
    substitute.bar(1).returns(3);
    t.is(3, substitute.bar(1));
    t.is('function', typeof (substitute.bar(1, 2).toString));
});
ava_1.default('can stub multiple primitive return values', function (t) {
    initialize();
    substitute.bar(1).returns(2);
    substitute.bar(2).returns(3);
    t.is(2, substitute.bar(1));
    t.is(3, substitute.bar(2));
});
ava_1.default('can stub multiple Arg values', function (t) {
    initialize();
    substitute.bar(index_1.Arg.is(function (x) { return x % 2 === 0; })).returns(1);
    substitute.bar(index_1.Arg.is(function (x) { return x % 2 !== 0; })).returns(2);
    t.is(1, substitute.bar(4));
    t.is(2, substitute.bar(5));
});
ava_1.default.skip('can stub primitive & Arg values', function (t) {
    initialize();
    substitute.bar(1).returns(2);
    substitute.bar(index_1.Arg.any()).returns(3); // throws 'substitute.bar(...).returns is not a function'
    t.is(5, substitute.bar(2));
    t.is(2, substitute.bar(1));
    t.is(3, substitute.bar(2));
});
//# sourceMappingURL=index.test.js.map