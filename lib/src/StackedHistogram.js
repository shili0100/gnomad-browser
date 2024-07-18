"use strict";
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
const BinHoverTarget = styled_components_1.default.rect `
  pointer-events: visible;
  fill: none;

  &:hover {
    fill: rgba(0, 0, 0, 0.05);
  }
`;
const yTickFormat = (n) => {
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
const labelProps = {
    fontSize: 14,
    textAnchor: 'middle',
};
// @ts-expect-error TS(7022) FIXME: 'StackedHistogram' implicitly has type 'any' becau... Remove this comment to see the full error message
const StackedHistogram = ({ bins, values, secondaryValues, id, xLabel, yLabel, secondaryYLabel, height, width, barColors, formatTooltip, }) => {
    const yDomain = [0, (0, d3_array_1.max)(values.map((v) => (0, d3_array_1.sum)(v))) || 1];
    const secondaryYDomain = secondaryValues
        ? [0, (0, d3_array_1.max)(secondaryValues.map((v) => (0, d3_array_1.sum)(v))) || 1]
        : null;
    const margin = {
        bottom: 60,
        left: 60,
        right: secondaryValues ? 60 : 10,
        top: 15,
    };
    const plotWidth = width - (margin.left + margin.right);
    const plotHeight = height - (margin.top + margin.bottom);
    const xBandScale = (0, d3_scale_1.scaleBand)().domain(bins).range([0, plotWidth]);
    // @ts-expect-error TS(2345) FIXME: Argument of type '(string | number)[]' is not assi... Remove this comment to see the full error message
    const yScale = (0, d3_scale_1.scaleLinear)().domain(yDomain).range([plotHeight, 0]);
    const secondaryYScale = secondaryYDomain
        ? // @ts-expect-error TS(2345) FIXME: Argument of type '(string | number)[]' is not assi... Remove this comment to see the full error message
            (0, d3_scale_1.scaleLinear)().domain(secondaryYDomain).range([plotHeight, 0])
        : null;
    const bandWidth = xBandScale.bandwidth();
    const renderStackedBar = (binValues, scale, _a) => {
        var { x, barWidth } = _a, segmentProps = __rest(_a, ["x", "barWidth"]);
        const barY = scale((0, d3_array_1.sum)(binValues));
        let offset = 0;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            binValues.map((value, valueIndex) => {
                const segmentY = scale(value) - offset;
                const segmentHeight = plotHeight - segmentY - offset;
                offset += segmentHeight;
                return (
                // eslint-disable-next-line react/no-array-index-key
                react_1.default.createElement(react_1.default.Fragment, { key: valueIndex },
                    react_1.default.createElement("rect", Object.assign({}, segmentProps, { x: x, y: segmentY, height: segmentHeight, width: barWidth, fill: barColors[valueIndex] })),
                    react_1.default.createElement("line", { x1: x, x2: x + barWidth, y1: segmentY + segmentHeight, y2: segmentY + segmentHeight, stroke: "#666", strokeWidth: 0.5 })));
            }),
            react_1.default.createElement("rect", { x: x, y: barY, height: plotHeight - barY, width: barWidth, fill: "none", stroke: "#333" })));
    };
    return (react_1.default.createElement("svg", { id: id, height: height, width: width },
        react_1.default.createElement(axis_1.AxisBottom, { label: xLabel, labelOffset: 30, 
            // @ts-expect-error TS(2322) FIXME: Type '{ fontSize: number; textAnchor: string; }' i... Remove this comment to see the full error message
            labelProps: labelProps, left: margin.left, top: margin.top + plotHeight, scale: xBandScale, stroke: "#333", tickLabelProps: (value) => ({
                dx: '-0.25em',
                dy: '0.25em',
                fill: '#000',
                fontSize: 10,
                textAnchor: 'end',
                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                transform: `translate(0, 0), rotate(-40 ${xBandScale(value) + bandWidth / 2}, 0)`,
            }), tickLength: 3 }),
        react_1.default.createElement(axis_1.AxisLeft, { label: yLabel, 
            // @ts-expect-error TS(2322) FIXME: Type '{ fontSize: number; textAnchor: string; }' i... Remove this comment to see the full error message
            labelProps: labelProps, left: margin.left, 
            // @ts-expect-error TS(2345) FIXME: Argument of type 'string | number' is not assignab... Remove this comment to see the full error message
            numTicks: Math.min(10, yDomain[1]), tickFormat: yTickFormat, tickLabelProps: () => ({
                dx: '-0.25em',
                dy: '0.25em',
                fill: '#000',
                fontSize: 10,
                textAnchor: 'end',
            }), top: margin.top, scale: yScale, stroke: "#333" }),
        secondaryValues && (react_1.default.createElement(axis_1.AxisRight, { label: secondaryYLabel, 
            // @ts-expect-error TS(2322) FIXME: Type '{ fontSize: number; textAnchor: string; }' i... Remove this comment to see the full error message
            labelProps: labelProps, left: margin.left + plotWidth, 
            // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
            numTicks: Math.min(10, secondaryYDomain[1]), tickFormat: yTickFormat, tickLabelProps: () => ({
                dx: '0.25em',
                dy: '0.25em',
                fill: '#000',
                fontSize: 10,
                textAnchor: 'start',
            }), top: margin.top, 
            // @ts-expect-error TS(2322) FIXME: Type '(number[] & ScaleLinear<number, number, neve... Remove this comment to see the full error message
            scale: secondaryYScale, stroke: "#333" })),
        react_1.default.createElement("defs", null,
            react_1.default.createElement("pattern", { id: `${id}-stripes`, width: 4, height: 4, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" },
                react_1.default.createElement("rect", { width: 3, height: 4, transform: "translate(0,0)", fill: "#fff" })),
            react_1.default.createElement("mask", { id: `${id}-mask` },
                react_1.default.createElement("rect", { x: 0, y: 0, width: "100%", height: "100%", fill: `url(#${id}-stripes)` }))),
        react_1.default.createElement("g", { transform: `translate(${margin.left},${margin.top})` }, bins.map((bin, binIndex) => {
            return (react_1.default.createElement("g", { key: bin, transform: `translate(${xBandScale(bin)}, 0)` },
                secondaryValues ? (react_1.default.createElement(react_1.default.Fragment, null,
                    renderStackedBar(values[binIndex], yScale, {
                        x: bandWidth * 0.125,
                        barWidth: bandWidth * 0.375,
                    }),
                    renderStackedBar(secondaryValues[binIndex], secondaryYScale, {
                        x: bandWidth * 0.5,
                        barWidth: bandWidth * 0.375,
                        mask: `url(#${id}-mask)`,
                    }))) : (renderStackedBar(values[binIndex], yScale, {
                    x: bandWidth * 0.125,
                    barWidth: bandWidth * 0.75,
                })),
                react_1.default.createElement(ui_1.TooltipAnchor
                // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: any; }' is not... Remove this comment to see the full error message
                , { 
                    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: any; }' is not... Remove this comment to see the full error message
                    tooltip: formatTooltip(bin, values[binIndex], secondaryValues ? secondaryValues[binIndex] : undefined) },
                    react_1.default.createElement(BinHoverTarget, { x: 0, y: 0, height: plotHeight, width: bandWidth }))));
        }))));
};
StackedHistogram.defaultProps = {
    secondaryValues: undefined,
    id: 'stacked-histogram',
    xLabel: undefined,
    yLabel: undefined,
    secondaryYLabel: undefined,
    height: 250,
    width: 500,
    barColors: [],
    formatTooltip: (bin, values, secondaryValues) => {
        let tooltipText = `${bin}: ${values.map((v) => v.toLocaleString()).join(', ')}`;
        if (secondaryValues) {
            tooltipText += ` / ${secondaryValues.map((v) => v.toLocaleString()).join(', ')}`;
        }
        return tooltipText;
    },
};
// The 100% width/height container is necessary the component
// to size to fit its container vs staying at its initial size.
const GraphWrapper = styled_components_1.default.div `
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin-bottom: 1em;
`;
// @ts-expect-error TS(2339) FIXME: Property 'size' does not exist on type '{}'.
exports.default = (0, react_sizeme_1.withSize)()((_a) => {
    var { size } = _a, props = __rest(_a, ["size"]);
    return (react_1.default.createElement(GraphWrapper, null,
        react_1.default.createElement(StackedHistogram, Object.assign({}, props, { width: size.width }))));
});
//# sourceMappingURL=StackedHistogram.js.map