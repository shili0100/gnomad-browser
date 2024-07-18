"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAlleleFrequencyCell = exports.renderAlleleCountCell = exports.NumericCell = exports.Cell = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
exports.Cell = styled_components_1.default.span `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
exports.NumericCell = (0, styled_components_1.default)(exports.Cell) `
  width: 100%;
  padding-right: calc(20px - 0.5em);
  text-align: right;
`;
const AlleleCountCell = styled_components_1.default.span `
  width: 7ch;
  margin: 0 auto;
  text-align: right;
`;
const renderAlleleCountCell = (row, key) => {
    return react_1.default.createElement(AlleleCountCell, null, row[key]);
};
exports.renderAlleleCountCell = renderAlleleCountCell;
const AlleleFrequencyCell = styled_components_1.default.span `
  width: 8ch;
  margin: 0 auto;
  text-align: right;
`;
const renderAlleleFrequencyCell = (row, key) => {
    const number = row[key];
    let s;
    if (number === null || number === undefined) {
        s = '';
    }
    else {
        const truncated = Number(number.toPrecision(3));
        if (truncated === 0 || truncated === 1) {
            s = number.toFixed(0);
        }
        else {
            s = truncated.toExponential(2);
        }
    }
    return react_1.default.createElement(AlleleFrequencyCell, null, s);
};
exports.renderAlleleFrequencyCell = renderAlleleFrequencyCell;
//# sourceMappingURL=tableCells.js.map