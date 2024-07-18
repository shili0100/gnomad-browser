"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const missingContent_1 = require("./missingContent");
(0, globals_1.describe)('textOrMissingTextWarning', () => {
    const labels = {
        foo: 'bar',
        baz: 'quux',
    };
    (0, globals_1.test)('uses label from labels map if present', () => {
        (0, globals_1.expect)((0, missingContent_1.textOrMissingTextWarning)('item', labels, 'foo')).toEqual('bar');
        (0, globals_1.expect)((0, missingContent_1.textOrMissingTextWarning)('item', labels, 'baz')).toEqual('quux');
    });
    (0, globals_1.test)('gives warning if requested label is missing', () => {
        (0, globals_1.expect)((0, missingContent_1.textOrMissingTextWarning)('item', {}, 'foo')).toEqual('TEXT NEEDED FOR ITEM "foo"');
        (0, globals_1.expect)((0, missingContent_1.textOrMissingTextWarning)('item', {}, 'baz')).toEqual('TEXT NEEDED FOR ITEM "baz"');
    });
});
//# sourceMappingURL=missingContent.spec.js.map