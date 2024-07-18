"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripedSwatch = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const LegendWrapper = styled_components_1.default.ul `
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 0;
  margin: 0 1em 0 0;
  list-style-type: none;
`;
const LegendItem = styled_components_1.default.li `
  display: flex;
  margin: 0 1em 0.33em 0;
`;
const LegendSwatch = ({ color }) => (react_1.default.createElement("svg", { width: 16, height: 16 },
    react_1.default.createElement("rect", { x: 0, y: 0, height: 16, width: 16, fill: color, stroke: "#000" })));
const Legend = ({ series }) => (react_1.default.createElement(LegendWrapper, null, series.map(({ color, label, swatch }) => (react_1.default.createElement(LegendItem, { key: label },
    color ? react_1.default.createElement(LegendSwatch, { color: color }) : swatch,
    react_1.default.createElement("span", { style: { marginLeft: '0.25em' } }, label))))));
exports.default = Legend;
const StripedSwatch = ({ id, color }) => (react_1.default.createElement("svg", { width: 16, height: 16 },
    react_1.default.createElement("defs", null,
        react_1.default.createElement("pattern", { id: `${id}-stripes`, width: 4, height: 4, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" },
            react_1.default.createElement("rect", { width: 3, height: 4, transform: "translate(0,0)", fill: "#fff" })),
        react_1.default.createElement("mask", { id: `${id}-mask` },
            react_1.default.createElement("rect", { x: 0, y: 0, width: "100%", height: "100%", fill: `url(#${id}-stripes)` }))),
    react_1.default.createElement("rect", { x: 0, y: 0, width: 16, height: 16, fill: color, mask: `url(#${id}-mask)` }),
    react_1.default.createElement("rect", { x: 0, y: 0, width: 16, height: 16, fill: "none", stroke: "#333" })));
exports.StripedSwatch = StripedSwatch;
//# sourceMappingURL=Legend.js.map