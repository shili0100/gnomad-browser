"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegendSwatch = exports.CheckboxInput = exports.Label = exports.LegendItemWrapper = exports.Legend = exports.ControlPanel = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.ControlPanel = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: ${(props) => props.width}px;
  margin-left: ${(props) => props.marginLeft}px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0;
  }
`;
exports.Legend = styled_components_1.default.ul `
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0.5em 0;
  list-style-type: none;
`;
exports.LegendItemWrapper = styled_components_1.default.li `
  display: flex;
  align-items: stretch;
  margin-left: 1em;
`;
exports.Label = styled_components_1.default.label `
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
exports.CheckboxInput = styled_components_1.default.input.attrs({ type: 'checkbox' }) `
  margin-right: 0.5em;
`;
exports.LegendSwatch = styled_components_1.default.span `
  display: flex;
  align-items: center;
  width: 16px;
  margin-left: 0.5em;

  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: ${(props) => props.height}px;
    background: ${(props) => props.color};
  }
`;
//# sourceMappingURL=ChartStyles.js.map