"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const constraintMetrics_1 = require("./constraintMetrics");
(0, globals_1.describe)('renderRoundedNumber', () => {
    (0, globals_1.test)('returns the desired placeholder value if passed a null', () => (0, globals_1.expect)((0, constraintMetrics_1.renderRoundedNumber)(null)).toEqual('—'));
    (0, globals_1.test)('trims zeros when necessary', () => (0, globals_1.expect)((0, constraintMetrics_1.renderRoundedNumber)(1.2, { precision: 15 })).toMatchSnapshot());
    (0, globals_1.test)('uses proper highlight color', () => (0, globals_1.expect)((0, constraintMetrics_1.renderRoundedNumber)(1.2, { highlightColor: '#ABCDEF' })).toMatchSnapshot());
    (0, globals_1.test)('allows for arbitrary formatting of tooltip', () => (0, globals_1.expect)((0, constraintMetrics_1.renderRoundedNumber)(1.2, {
        formatTooltip: (rounded) => `I AM A ROUND NUMBER AS FOLLOWS: "${rounded}" THANK YOU FOR YOUR TIME`,
    })).toMatchSnapshot());
});
//# sourceMappingURL=constraintMetrics.spec.js.map