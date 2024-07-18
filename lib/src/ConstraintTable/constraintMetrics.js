"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderRoundedNumber = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const ConstraintHighlight = styled_components_1.default.span `
  display: inline-block;
  padding: 0.25em 0.4em;
  border: 1px solid #000;
  border-radius: 0.3em;
  background: ${(props) => props.highlightColor};
  color: #000;
`;
const renderRoundedNumber = (num, { precision = 1, tooltipPrecision = 3, highlightColor = null, formatTooltip = ((n) => `${n}`), } = {}) => {
    if (num === null) {
        return '—';
    }
    const roundedNumber = Number(num.toFixed(precision)).toString();
    return (
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: any; }' is not... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: formatTooltip(num.toFixed(tooltipPrecision)) }, highlightColor ? (
    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
    react_1.default.createElement(ConstraintHighlight, { highlightColor: highlightColor }, roundedNumber)) : (
    // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.TooltipHint, null, roundedNumber))));
};
exports.renderRoundedNumber = renderRoundedNumber;
//# sourceMappingURL=constraintMetrics.js.map