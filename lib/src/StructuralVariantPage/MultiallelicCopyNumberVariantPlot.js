"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const d3_scale_1 = require("d3-scale");
const react_1 = __importDefault(require("react"));
const react_sizeme_1 = require("react-sizeme");
const styled_components_1 = __importDefault(require("styled-components"));
const axis_1 = require("@visx/axis");
const ui_1 = require("@gnomad/ui");
// The 100% width/height container is necessary the component
// to size to fit its container vs staying at its initial size.
const GraphWrapper = styled_components_1.default.div `
  overflow: hidden;
  width: 100%;
  height: 100%; /* stylelint-disable-line unit-whitelist */
  margin-bottom: 1em;
`;
const TooltipTrigger = styled_components_1.default.rect `
  pointer-events: visible;

  &:hover {
    fill: rgba(0, 0, 0, 0.05);
  }
`;
const tickFormat = (n) => {
    if (n >= 1e9) {
        return `${(n / 1e9).toPrecision(3)}B`;
    }
    if (n >= 1e6) {
        return `${(n / 1e6).toPrecision(3)}M`;
    }
    if (n >= 1e3) {
        return `${(n / 1e3).toPrecision(3)}K`;
    }
    return `${n}`;
};
const margin = {
    bottom: 50,
    left: 60,
    right: 10,
    top: 10,
};
const labelProps = {
    fontSize: 14,
    textAnchor: 'middle',
};
const MultiallelicCopyNumberVariantPlot = (0, react_sizeme_1.withSize)()(({ variant, size: { width } }) => {
    const height = 250;
    const copy_numbers = variant.copy_numbers || [];
    const xScale = (0, d3_scale_1.scaleBand)()
        // @ts-expect-error TS(7031) FIXME: Binding element 'copyNumber' implicitly has an 'an... Remove this comment to see the full error message
        .domain(variant.copy_numbers.map(({ copy_number: copyNumber }) => copyNumber))
        .range([0, width - (margin.left + margin.right)]);
    const yScale = (0, d3_scale_1.scaleLinear)()
        .domain([0, (0, d3_array_1.max)(copy_numbers, (d) => d.ac) || 1])
        .range([height - (margin.top + margin.bottom), margin.top]);
    const labelInterval = Math.max(Math.round((variant.copy_numbers || []).length / 100) * 10, 1);
    return (react_1.default.createElement(GraphWrapper, null,
        react_1.default.createElement("svg", { height: height, width: width },
            react_1.default.createElement(axis_1.AxisBottom, { label: "Copy Number", 
                // @ts-expect-error TS(2322) FIXME: Type '{ fontSize: number; textAnchor: string; }' i... Remove this comment to see the full error message
                labelProps: labelProps, left: margin.left, scale: xScale, stroke: "#333", tickFormat: (copyNumber, i) => i % labelInterval === 0 ? copyNumber.toString() : '', top: height - margin.bottom }),
            react_1.default.createElement(axis_1.AxisLeft, { label: "Samples", 
                // @ts-expect-error TS(2322) FIXME: Type '{ fontSize: number; textAnchor: string; }' i... Remove this comment to see the full error message
                labelProps: labelProps, left: margin.left, scale: yScale, stroke: "#333", tickFormat: tickFormat, top: margin.top }),
            react_1.default.createElement("g", { transform: `translate(${margin.left},${margin.top})` }, (variant.copy_numbers || []).map(({ copy_number: copyNumber, ac }) => (react_1.default.createElement(react_1.default.Fragment, { key: copyNumber },
                react_1.default.createElement("rect", { x: xScale(copyNumber), y: yScale(ac), height: yScale(0) - yScale(ac), width: xScale.bandwidth(), fill: copyNumber === 2 ? '#bdbdbd' : '#73ab3d', stroke: "#333" }),
                react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: `CN=${copyNumber}: ${ac} samples` },
                    react_1.default.createElement(TooltipTrigger, { x: xScale(copyNumber), y: yScale.range()[1], height: yScale.range()[0] - yScale.range()[1], width: xScale.bandwidth(), fill: "none", style: { pointerEvents: 'visible' } })))))))));
});
MultiallelicCopyNumberVariantPlot.displayName = 'MultiallelicCopyNumberVariantPlot';
exports.default = MultiallelicCopyNumberVariantPlot;
//# sourceMappingURL=MultiallelicCopyNumberVariantPlot.js.map