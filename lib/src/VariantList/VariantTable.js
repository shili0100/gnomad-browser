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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ui_1 = require("@gnomad/ui");
// @ts-expect-error TS(7022) FIXME: 'VariantTable' implicitly has type 'any' because i... Remove this comment to see the full error message
const VariantTable = ({ columns, forwardedRef, highlightText, highlightedVariantId, onVisibleRowsChange, onHoverVariant, onRequestSort, variants, sortKey, sortOrder, }) => {
    return (react_1.default.createElement(ui_1.Grid, { cellData: { highlightWords: highlightText.split(',').map((s) => s.trim()) }, columns: columns, data: variants, numRowsRendered: 20, onHoverRow: (rowIndex) => {
            onHoverVariant(rowIndex === null ? null : variants[rowIndex].variant_id);
        }, onRequestSort: onRequestSort, onVisibleRowsChange: onVisibleRowsChange, ref: forwardedRef, rowKey: (variant) => variant.variant_id, shouldHighlightRow: highlightedVariantId
            ? (variant) => variant.variant_id === highlightedVariantId
            : () => false, sortKey: sortKey, sortOrder: sortOrder }));
};
VariantTable.defaultProps = {
    highlightText: '',
    highlightedVariantId: null,
    onVisibleRowsChange: () => { },
    onHoverVariant: () => { },
    onRequestSort: () => { },
};
const MemoizedVariantTable = (0, react_1.memo)(VariantTable);
exports.default = (0, react_1.forwardRef)((props, ref) => react_1.default.createElement(MemoizedVariantTable, Object.assign({}, props, { forwardedRef: ref })));
//# sourceMappingURL=VariantTable.js.map