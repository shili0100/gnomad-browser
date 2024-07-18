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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const d3_scale_1 = require("d3-scale");
const react_1 = __importStar(require("react"));
const react_sizeme_1 = require("react-sizeme");
const styled_components_1 = __importDefault(require("styled-components"));
const axis_1 = require("@visx/axis");
const ui_1 = require("@gnomad/ui");
const gnomadV3MitochondrialVariantSiteQualityMetricDistributions_json_1 = __importDefault(require("../../dataset-metadata/datasets/gnomad-v3-mitochondria/gnomadV3MitochondrialVariantSiteQualityMetricDistributions.json"));
const formatMetricValue = (value) => {
    if (Math.abs(value) < 0.001) {
        return value === 0 ? '0' : value.toExponential(3);
    }
    return value.toLocaleString();
};
// ================================================================================================
// Plot
// ================================================================================================
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
const BinHoverTarget = styled_components_1.default.rect `
  pointer-events: visible;
  fill: none;

  &:hover {
    fill: rgba(0, 0, 0, 0.05);
  }
`;
// @ts-expect-error TS(7022) FIXME: 'SiteQualityMetricsHistogram' implicitly has type ... Remove this comment to see the full error message
const SiteQualityMetricsHistogram = ({ metric, binEdges, binValues, metricValue, xLabel, height, width, }) => {
    const barColor = '#73ab3d';
    const yDomain = [0, (0, d3_array_1.max)(binValues) || 1];
    const margin = {
        bottom: 60,
        left: 60,
        right: 10,
        top: 15,
    };
    const plotWidth = width - (margin.left + margin.right);
    const plotHeight = height - (margin.top + margin.bottom);
    const bins = [...Array(binEdges.length + 1)].map((_, i) => i);
    const binLabels = [
        `< ${binEdges[0]}`,
        ...[...Array(binEdges.length - 1)].map((_, i) => `between ${binEdges[i]} and ${binEdges[i + 1]}`),
        `> ${binEdges[binEdges.length - 1]}`,
    ];
    const formatTooltip = (binIndex) => {
        return `${binValues[binIndex].toLocaleString()} variants with ${metric} ${binLabels[binIndex]}`;
    };
    // @ts-expect-error TS(2345) FIXME: Argument of type 'number[]' is not assignable to p... Remove this comment to see the full error message
    const xBandScale = (0, d3_scale_1.scaleBand)().domain(bins).range([0, plotWidth]);
    const bandWidth = xBandScale.bandwidth();
    const xScale = (0, d3_scale_1.scaleLinear)()
        .domain([binEdges[0], binEdges[binEdges.length - 1]])
        .range([bandWidth, plotWidth - bandWidth]);
    const metricValueX = xScale(metricValue);
    const labelOnLeft = metricValueX > plotWidth * 0.8;
    // @ts-expect-error TS(2345) FIXME: Argument of type '(string | number)[]' is not assi... Remove this comment to see the full error message
    const yScale = (0, d3_scale_1.scaleLinear)().domain(yDomain).range([plotHeight, 0]);
    return (react_1.default.createElement("svg", { height: height, width: width },
        react_1.default.createElement("line", { x1: margin.left, y1: margin.top + plotHeight, x2: margin.left + plotWidth, y2: margin.top + plotHeight, stroke: "#333" }),
        react_1.default.createElement(axis_1.AxisBottom, { label: xLabel, labelOffset: 30, 
            // @ts-expect-error TS(2322) FIXME: Type '{ fontSize: number; textAnchor: string; }' i... Remove this comment to see the full error message
            labelProps: labelProps, left: margin.left, top: margin.top + plotHeight, scale: xScale, stroke: "#333", tickFormat: (value) => `${value}`, tickLabelProps: (value) => ({
                dx: '-0.25em',
                dy: '0.25em',
                fill: '#000',
                fontSize: 10,
                textAnchor: 'end',
                transform: `translate(0, 0), rotate(-40 ${xScale(value)}, 0)`,
            }), tickLength: 3, tickValues: xScale.ticks(20) }),
        react_1.default.createElement(axis_1.AxisLeft, { label: "Variants", 
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
        react_1.default.createElement("g", { transform: `translate(${margin.left},${margin.top})` }, metricValue !== null && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("path", { d: "M 0 0 L -6 -7 L -2 -7 L -2 -15 L 2 -15 L 2 -7 L 6 -7 z", transform: `translate(${metricValueX}, 0)`, fill: barColor, stroke: "#333", strokeWidth: 1 }),
            react_1.default.createElement("line", { x1: metricValueX, y1: 2, x2: metricValueX, y2: plotHeight, stroke: barColor, strokeWidth: 1 }),
            react_1.default.createElement("text", { x: labelOnLeft ? metricValueX - 10 : metricValueX + 10, y: -5, fill: "#000", fontSize: 12, textAnchor: labelOnLeft ? 'end' : 'start' }, formatMetricValue(metricValue))))),
        react_1.default.createElement("g", { transform: `translate(${margin.left},${margin.top})` }, bins.map((binIndex) => {
            const y = yScale(binValues[binIndex]);
            return (
            // @ts-expect-error TS(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
            react_1.default.createElement("g", { key: binIndex, transform: `translate(${xBandScale(binIndex)}, 0)` },
                react_1.default.createElement("rect", { x: 0, y: y, height: plotHeight - y, width: bandWidth, fill: barColor, stroke: "#333", strokeWidth: 1 }),
                react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: formatTooltip(binIndex) },
                    react_1.default.createElement(BinHoverTarget, { x: 0, y: 0, height: plotHeight, width: bandWidth }))));
        }))));
};
SiteQualityMetricsHistogram.defaultProps = {
    metricValue: null,
    height: 250,
    width: 500,
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
const AutosizedSiteQualityMetricsHistogram = (0, react_sizeme_1.withSize)()((_a) => {
    var { size } = _a, props = __rest(_a, ["size"]);
    return (react_1.default.createElement(GraphWrapper, null,
        react_1.default.createElement(SiteQualityMetricsHistogram, Object.assign({}, props, { width: size.width }))));
});
const MitochondrialVariantSiteQualityMetricsDistribution = ({ variant, }) => {
    const [selectedMetricName, setSelectedMetricName] = (0, react_1.useState)('Mean Depth');
    const selectedMetric = variant.site_quality_metrics.find(({ name }) => name === selectedMetricName);
    if (selectedMetric && selectedMetric.value !== null) {
        const selectedMetricValue = selectedMetric.value;
        const binEdges = gnomadV3MitochondrialVariantSiteQualityMetricDistributions_json_1.default[selectedMetricName].bin_edges;
        const binValues = [
            0, // n_smaller does not appear in gnomadV3MitochondrialVariantSiteQualityMetricDistributions
            ...gnomadV3MitochondrialVariantSiteQualityMetricDistributions_json_1.default[selectedMetricName].bin_freq,
            gnomadV3MitochondrialVariantSiteQualityMetricDistributions_json_1.default[selectedMetricName].n_larger || 0,
        ];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { style: { height: '16px', marginBottom: '1em', marginTop: '1em' } }),
            react_1.default.createElement(AutosizedSiteQualityMetricsHistogram
            // @ts-expect-error TS(2322) FIXME: Type '{ metric: string; binEdges: any; binValues: ... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ metric: string; binEdges: any; binValues: ... Remove this comment to see the full error message
                metric: selectedMetricName, binEdges: binEdges, binValues: binValues, metricValue: selectedMetricValue, xLabel: selectedMetricName }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "mt-site-quality-metrics-metric" },
                    "Metric: ",
                    react_1.default.createElement(ui_1.Select, { id: "mt-site-quality-metrics-metric", onChange: (e) => {
                            setSelectedMetricName(e.target.value);
                        }, value: selectedMetricName }, variant.site_quality_metrics.map((metric) => (react_1.default.createElement("option", { key: metric.name, value: metric.name },
                        metric.name,
                        " (",
                        metric.value !== null ? formatMetricValue(metric.value) : '–',
                        ")"))))))));
    }
    return null;
};
// ================================================================================================
// Table
// ================================================================================================
const MitochondrialVariantSiteQualityMetricsTable = ({ variant, }) => {
    return (
    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
    react_1.default.createElement(ui_1.BaseTable, { style: { width: '100%', marginTop: '1em' } },
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "col" }, "Metric"),
                react_1.default.createElement("th", { scope: "col" }, "Value"))),
        react_1.default.createElement("tbody", null, variant.site_quality_metrics.map((metric) => (react_1.default.createElement("tr", { key: metric.name },
            react_1.default.createElement("th", { scope: "row" }, metric.name),
            react_1.default.createElement("td", null, metric.value != null ? formatMetricValue(metric.value) : '–')))))));
};
// ================================================================================================
// Tabs
// ================================================================================================
const MitochondrialVariantSiteQualityMetrics = ({ variant, }) => {
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('distribution');
    return (react_1.default.createElement(ui_1.Tabs, { activeTabId: selectedTab, onChange: setSelectedTab, tabs: [
            {
                id: 'distribution',
                label: 'Metric distribution',
                render: () => react_1.default.createElement(MitochondrialVariantSiteQualityMetricsDistribution, { variant: variant }),
            },
            {
                id: 'values',
                label: 'All metric values',
                render: () => react_1.default.createElement(MitochondrialVariantSiteQualityMetricsTable, { variant: variant }),
            },
        ] }));
};
exports.default = MitochondrialVariantSiteQualityMetrics;
//# sourceMappingURL=MitochondrialVariantSiteQualityMetrics.js.map