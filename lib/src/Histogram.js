"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const d3_scale_1 = require("d3-scale");
const prop_types_1 = __importDefault(require("prop-types"));
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
  height: 100%;
  margin-bottom: 1em;
`;
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
const margin = {
    bottom: 60,
    left: 60,
    right: 10,
    top: 10,
};
const labelProps = {
    fontSize: 14,
    textAnchor: 'middle',
};
const Histogram = (0, react_sizeme_1.withSize)()(({ 
// @ts-expect-error TS(2339) FIXME: Property 'barColor' does not exist on type '{}'.
barColor, 
// @ts-expect-error TS(2339) FIXME: Property 'binEdges' does not exist on type '{}'.
binEdges, 
// @ts-expect-error TS(2339) FIXME: Property 'binValues' does not exist on type '{}'.
binValues, 
// @ts-expect-error TS(2339) FIXME: Property 'formatTooltip' does not exist on type '{... Remove this comment to see the full error message
formatTooltip, 
// @ts-expect-error TS(2339) FIXME: Property 'nLarger' does not exist on type '{}'.
nLarger, 
// @ts-expect-error TS(2339) FIXME: Property 'nSmaller' does not exist on type '{}'.
nSmaller, 
// @ts-expect-error TS(2339) FIXME: Property 'size' does not exist on type '{}'.
size: { width }, 
// @ts-expect-error TS(2339) FIXME: Property 'xLabel' does not exist on type '{}'.
xLabel, 
// @ts-expect-error TS(2339) FIXME: Property 'yLabel' does not exist on type '{}'.
yLabel, }) => {
    const height = 250;
    // @ts-expect-error TS(7006) FIXME: Parameter 'n' implicitly has an 'any' type.
    const bins = binValues.map((n, i) => ({
        label: `${binEdges[i]}-${binEdges[i + 1]}`,
        value: n,
    }));
    if (!(nSmaller === undefined || nSmaller === null)) {
        bins.unshift({
            label: `< ${binEdges[0]}`,
            value: nSmaller,
        });
    }
    if (!(nLarger === undefined || nLarger === null)) {
        bins.push({
            label: `> ${binEdges[binEdges.length - 1]}`,
            value: nLarger,
        });
    }
    const yDomain = [0, (0, d3_array_1.max)(bins, (bin) => bin.value) || 1];
    const plotWidth = width - (margin.left + margin.right);
    const plotHeight = height - (margin.top + margin.bottom);
    const xBandScale = (0, d3_scale_1.scaleBand)()
        .domain(bins.map((bin) => bin.label))
        .range([0, plotWidth]);
    // @ts-expect-error TS(2345) FIXME: Argument of type '(string | number)[]' is not assi... Remove this comment to see the full error message
    const yScale = (0, d3_scale_1.scaleLinear)().domain(yDomain).range([plotHeight, 0]);
    const bandWidth = xBandScale.bandwidth();
    return (react_1.default.createElement(GraphWrapper, null,
        react_1.default.createElement("svg", { height: height, width: width },
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
            react_1.default.createElement("g", { transform: `translate(${margin.left},${margin.top})` }, bins.map((bin) => (react_1.default.createElement(react_1.default.Fragment, { key: bin.label },
                react_1.default.createElement("rect", { x: xBandScale(bin.label), y: yScale(bin.value), height: plotHeight - yScale(bin.value), width: bandWidth, fill: barColor, stroke: "#333" }),
                react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: formatTooltip(bin) },
                    react_1.default.createElement(BinHoverTarget, { x: xBandScale(bin.label), y: 0, height: plotHeight, width: bandWidth })))))))));
});
Histogram.displayName = 'Histogram';
Histogram.propTypes = {
    // @ts-expect-error TS(2322) FIXME: Type '{ barColor: PropTypes.Requireable<string>; b... Remove this comment to see the full error message
    barColor: prop_types_1.default.string,
    binEdges: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
    binValues: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
    formatTooltip: prop_types_1.default.func,
    nLarger: prop_types_1.default.number,
    nSmaller: prop_types_1.default.number,
    size: prop_types_1.default.shape({
        width: prop_types_1.default.number.isRequired,
    }),
    xLabel: prop_types_1.default.string,
    yLabel: prop_types_1.default.string,
};
Histogram.defaultProps = {
    // @ts-expect-error TS(2322) FIXME: Type '{ barColor: string; formatTooltip: (bin: any... Remove this comment to see the full error message
    barColor: '#428bca',
    formatTooltip: (bin) => `${bin.label}: ${bin.value.toLocaleString()}`,
    nLarger: undefined,
    nSmaller: undefined,
    xLabel: undefined,
    yLabel: undefined,
};
exports.default = Histogram;
//# sourceMappingURL=Histogram.js.map