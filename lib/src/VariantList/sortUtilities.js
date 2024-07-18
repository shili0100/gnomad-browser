"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNumericCompareFunction = exports.makeStringCompareFunction = exports.makeCompareFunction = exports.isEmpty = void 0;
const isEmpty = (val) => val === undefined || val === null || val === '';
exports.isEmpty = isEmpty;
const makeCompareFunction = (key, fn) => (v1, v2, order = 'ascending') => {
    let key1;
    let key2;
    if (typeof key === 'function') {
        key1 = key(v1);
        key2 = key(v2);
    }
    else {
        key1 = v1[key];
        key2 = v2[key];
    }
    if ((0, exports.isEmpty)(key1)) {
        return 1;
    }
    if ((0, exports.isEmpty)(key2)) {
        return -1;
    }
    return order === 'ascending' ? fn(key1, key2) : fn(key2, key1);
};
exports.makeCompareFunction = makeCompareFunction;
const makeStringCompareFunction = (key) => (0, exports.makeCompareFunction)(key, (v1, v2) => v1.localeCompare(v2));
exports.makeStringCompareFunction = makeStringCompareFunction;
const makeNumericCompareFunction = (key) => (0, exports.makeCompareFunction)(key, (v1, v2) => v1 - v2);
exports.makeNumericCompareFunction = makeNumericCompareFunction;
//# sourceMappingURL=sortUtilities.js.map