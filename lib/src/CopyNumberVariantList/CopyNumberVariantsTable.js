"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ui_1 = require("@gnomad/ui");
const CopyNumberVariantsTable = (_a) => {
    var { columns, forwardedRef, numRowsRendered, onHoverVariant, rowHeight, variants } = _a, rest = __rest(_a, ["columns", "forwardedRef", "numRowsRendered", "onHoverVariant", "rowHeight", "variants"]);
    return (react_1.default.createElement(ui_1.Grid
    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
    , Object.assign({ 
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        ref: forwardedRef }, rest, { columns: columns, data: variants, numRowsRendered: numRowsRendered, onHoverRow: (rowIndex) => {
            onHoverVariant(rowIndex === null ? null : variants[rowIndex].variant_id);
        }, rowHeight: rowHeight, rowKey: (variant) => variant.variant_id })));
};
const MemoizedCopyNumberVariantsTable = (0, react_1.memo)(CopyNumberVariantsTable);
exports.default = (0, react_1.forwardRef)((props, ref) => (
// @ts-expect-error TS(2739) FIXME: Type '{ forwardedRef: ForwardedRef<unknown>; }' is... Remove this comment to see the full error message
react_1.default.createElement(MemoizedCopyNumberVariantsTable, Object.assign({}, props, { forwardedRef: ref }))));
//# sourceMappingURL=CopyNumberVariantsTable.js.map