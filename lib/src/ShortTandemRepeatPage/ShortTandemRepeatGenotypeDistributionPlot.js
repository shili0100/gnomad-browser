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
  height: 100%; /* stylelint-disable-line unit-whitelist */
`;
const labelProps = {
    fontSize: 14,
    textAnchor: 'middle',
};
const ShortTandemRepeatGenotypeDistributionPlot = (0, react_sizeme_1.withSize)()(({ 
// @ts-expect-error TS(2339) FIXME: Property 'axisLabels' does not exist on type '{}'.
axisLabels, 
// @ts-expect-error TS(2339) FIXME: Property 'maxRepeats' does not exist on type '{}'.
maxRepeats, 
// @ts-expect-error TS(2339) FIXME: Property 'genotypeDistribution' does not exist on ... Remove this comment to see the full error message
genotypeDistribution, 
// @ts-expect-error TS(2339) FIXME: Property 'size' does not exist on type '{}'.
size: { width }, 
// @ts-expect-error TS(2339) FIXME: Property 'xRanges' does not exist on type '{}'.
xRanges, 
// @ts-expect-error TS(2339) FIXME: Property 'yRanges' does not exist on type '{}'.
yRanges, 
// @ts-expect-error TS(2339) FIXME: Property 'onSelectBin' does not exist on type '{}'... Remove this comment to see the full error message
onSelectBin, }) => {
    const height = Math.min(width, 500);
    const margin = {
        bottom: 65,
        left: 80,
        right: 10,
        top: 20,
    };
    const plotWidth = width - (margin.left + margin.right);
    const plotHeight = height - (margin.top + margin.bottom);
    const xBinSize = Math.max(1, Math.ceil(maxRepeats[0] / (plotWidth / 10)));
    const xNumBins = Math.floor(maxRepeats[0] / xBinSize) + 1;
    const yBinSize = Math.max(1, Math.ceil(maxRepeats[1] / (plotHeight / 10)));
    const yNumBins = Math.floor(maxRepeats[1] / yBinSize) + 1;
    const data = Array.from(Array(xNumBins * yNumBins).keys()).map((n) => {
        const xBinIndex = Math.floor(n / yNumBins);
        const yBinIndex = n % yNumBins;
        const xRange = xBinSize === 1
            ? [xBinIndex, xBinIndex]
            : [xBinIndex * xBinSize, xBinIndex * xBinSize + xBinSize - 1];
        const yRange = yBinSize === 1
            ? [yBinIndex, yBinIndex]
            : [yBinIndex * yBinSize, yBinIndex * yBinSize + yBinSize - 1];
        const xLabel = xBinSize === 1
            ? `${xBinIndex}`
            : `${xBinIndex * xBinSize} - ${xBinIndex * xBinSize + xBinSize - 1}`;
        const yLabel = yBinSize === 1
            ? `${yBinIndex}`
            : `${yBinIndex * yBinSize} - ${yBinIndex * yBinSize + yBinSize - 1}`;
        return {
            label: `${xLabel} repeats in ${axisLabels[0]} / ${yLabel} repeats in ${axisLabels[1]}`,
            xBinIndex,
            yBinIndex,
            xRange,
            yRange,
            count: 0,
        };
    });
    // @ts-expect-error TS(7031) FIXME: Binding element 'repeats1' implicitly has an 'any'... Remove this comment to see the full error message
    genotypeDistribution.forEach(([repeats1, repeats2, nAlleles]) => {
        const xBinIndex = Math.floor(repeats1 / xBinSize);
        const yBinIndex = Math.floor(repeats2 / yBinSize);
        data[xBinIndex * yNumBins + yBinIndex].count += nAlleles;
    });
    const xScale = (0, d3_scale_1.scaleBand)()
        // @ts-expect-error TS(2345) FIXME: Argument of type 'number[]' is not assignable to p... Remove this comment to see the full error message
        .domain(Array.from(Array(xNumBins).keys()))
        .range([0, plotWidth]);
    const xBandwidth = xScale.bandwidth();
    const yScale = (0, d3_scale_1.scaleBand)()
        // @ts-expect-error TS(2345) FIXME: Argument of type 'number[]' is not assignable to p... Remove this comment to see the full error message
        .domain(Array.from(Array(yNumBins).keys()))
        .range([plotHeight, 0]);
    const yBandwidth = yScale.bandwidth();
    const xMaxNumLabels = Math.floor(plotWidth / 20);
    const xLabelInterval = Math.max(Math.round(xNumBins / xMaxNumLabels), 1);
    const xTickFormat = (binIndex) => {
        if (binIndex % xLabelInterval !== 0) {
            return '';
        }
        if (xBinSize === 1) {
            return `${binIndex}`;
        }
        return `${binIndex * xBinSize} - ${binIndex * xBinSize + xBinSize - 1}`;
    };
    const yTickFormat = (binIndex) => {
        if (yBinSize === 1) {
            return `${binIndex}`;
        }
        return `${binIndex * yBinSize} - ${binIndex * yBinSize + yBinSize - 1}`;
    };
    const opacityScale = (0, d3_scale_1.scaleLog)()
        // @ts-expect-error TS(2345) FIXME: Argument of type '(string | number | undefined)[]'... Remove this comment to see the full error message
        .domain([1, (0, d3_array_1.max)(genotypeDistribution, (d) => d[2])])
        .range([0.1, 1]);
    return (react_1.default.createElement(GraphWrapper, null,
        react_1.default.createElement("svg", { height: xBinSize === 1 ? height - 20 : height, width: width },
            react_1.default.createElement(axis_1.AxisBottom, { label: `Repeats in ${axisLabels[0]}`, labelOffset: xBinSize === 1 ? 10 : 30, 
                // @ts-expect-error TS(2322) FIXME: Type '{ fontSize: number; textAnchor: string; }' i... Remove this comment to see the full error message
                labelProps: labelProps, left: margin.left, scale: xScale, stroke: "#333", tickFormat: xTickFormat, tickLabelProps: xBinSize === 1
                    ? () => {
                        return {
                            dy: '0.25em',
                            fill: '#000',
                            fontSize: 10,
                            textAnchor: 'middle',
                        };
                    }
                    : (binIndex) => {
                        return {
                            dx: '-0.75em',
                            dy: '0.2em',
                            fill: '#000',
                            fontSize: 10,
                            textAnchor: 'end',
                            transform: `translate(0, 0), rotate(-40 ${
                            // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                            xScale(binIndex) + xBandwidth / 2}, 0)`,
                        };
                    }, top: height - margin.bottom }),
            react_1.default.createElement(axis_1.AxisLeft, { label: `Repeats in ${axisLabels[1]}`, labelOffset: 60, 
                // @ts-expect-error TS(2322) FIXME: Type '{ fontSize: number; textAnchor: string; }' i... Remove this comment to see the full error message
                labelProps: labelProps, left: margin.left, scale: yScale, stroke: "#333", tickFormat: yTickFormat, tickLabelProps: () => ({
                    dx: '-0.25em',
                    dy: '0.25em',
                    fill: '#000',
                    fontSize: 10,
                    textAnchor: 'end',
                }), top: margin.top }),
            react_1.default.createElement("g", { transform: `translate(${margin.left},${margin.top})` }, data
                .filter((d) => d.count !== 0)
                .map((d) => {
                return (react_1.default.createElement(react_1.default.Fragment, { key: `${d.xBinIndex}-${d.yBinIndex}` },
                    react_1.default.createElement(ui_1.TooltipAnchor
                    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: Element; }' is... Remove this comment to see the full error message
                    , { 
                        // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: Element; }' is... Remove this comment to see the full error message
                        tooltip: react_1.default.createElement(react_1.default.Fragment, null,
                            d.label,
                            react_1.default.createElement("br", null),
                            " ",
                            d.count.toLocaleString(),
                            " individual",
                            d.count === 1 ? '' : 's',
                            (d.xRange[0] !== d.xRange[1] || d.yRange[0] !== d.yRange[1]) && (react_1.default.createElement("p", { style: { marginBottom: 0 } }, "Click for details"))) },
                        react_1.default.createElement("rect", { x: xScale(d.xBinIndex), y: yScale(d.yBinIndex), width: xBandwidth, height: yBandwidth, fill: "#73ab3d", opacity: d.count === 0 ? 0 : opacityScale(d.count), stroke: "#333", onClick: () => {
                                onSelectBin(d);
                            } }))));
            })),
            react_1.default.createElement("g", { transform: `translate(${margin.left}, 0)` }, xRanges
                .filter((range) => range.start !== range.stop)
                .filter((range) => range.start <= maxRepeats[0])
                .map((range, rangeIndex, ranges) => {
                const startBinIndex = Math.floor(range.start / xBinSize);
                const startX = 
                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                xScale(startBinIndex) +
                    ((range.start - startBinIndex * xBinSize) / xBinSize) * xBandwidth;
                let stopX;
                if (range.stop <= maxRepeats[0]) {
                    const stopBinIndex = Math.floor(range.stop / xBinSize);
                    stopX =
                        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                        xScale(stopBinIndex) +
                            ((range.stop - stopBinIndex * xBinSize) / xBinSize) * xBandwidth;
                }
                else {
                    stopX = plotWidth;
                }
                let labelPosition = (startX + stopX) / 2;
                let labelAnchor = 'middle';
                if (rangeIndex === 0 && stopX < 50) {
                    labelPosition = stopX - 5;
                    labelAnchor = 'end';
                }
                if (rangeIndex === xRanges.length - 1 && plotWidth - startX < 60) {
                    labelPosition = startX + 5;
                    labelAnchor = 'start';
                }
                return (react_1.default.createElement(react_1.default.Fragment, { key: range.label },
                    range.start !== 0 &&
                        (rangeIndex === 0 || range.start > ranges[rangeIndex - 1].stop + 1) && (react_1.default.createElement("line", { x1: startX, y1: margin.top - 10, x2: startX, y2: margin.top + plotHeight, stroke: "#333", strokeDasharray: "3 3" })),
                    stopX !== plotWidth && (react_1.default.createElement("line", { x1: stopX, y1: margin.top - 10, x2: stopX, y2: margin.top + plotHeight, stroke: "#333", strokeDasharray: "3 3" })),
                    react_1.default.createElement("path", { d: `M ${startX + 1} ${margin.top - 6} L ${startX + 5} ${margin.top - 9} L ${startX + 5} ${margin.top - 3} Z`, fill: "#333" }),
                    react_1.default.createElement("line", { x1: startX + 1, y1: margin.top - 6, x2: stopX - 1, y2: margin.top - 6, stroke: "#333" }),
                    react_1.default.createElement("path", { d: `M ${stopX - 1} ${margin.top - 6} L ${stopX - 5} ${margin.top - 9} L ${stopX - 5} ${margin.top - 3} Z`, fill: "#333" }),
                    react_1.default.createElement("text", { x: labelPosition, y: margin.top - 6, dy: "-0.5em", fontSize: 10, textAnchor: labelAnchor }, range.label)));
            })),
            react_1.default.createElement("g", { transform: `translate(${margin.left}, ${margin.top})` }, yRanges
                .filter((range) => range.start !== range.stop)
                .filter((range) => range.start <= maxRepeats[1])
                .map((range, rangeIndex, ranges) => {
                const startBinIndex = Math.floor(range.start / yBinSize);
                const startY = 
                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                yScale(startBinIndex) +
                    (1 - (range.start - startBinIndex * yBinSize) / yBinSize) * yBandwidth;
                let stopY;
                if (range.stop <= maxRepeats[1]) {
                    const stopBinIndex = Math.floor(range.stop / yBinSize);
                    stopY =
                        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                        yScale(stopBinIndex) +
                            (1 - (range.stop - stopBinIndex * yBinSize) / yBinSize) * yBandwidth;
                }
                else {
                    stopY = 0;
                }
                return (react_1.default.createElement(react_1.default.Fragment, { key: range.label },
                    range.start !== 0 &&
                        (rangeIndex === 0 || range.start > ranges[rangeIndex - 1].stop + 1) && (react_1.default.createElement("line", { x1: 0, y1: startY, x2: plotWidth + 10, y2: startY, stroke: "#333", strokeDasharray: "3 3" })),
                    stopY !== 0 && (react_1.default.createElement("line", { x1: 0, y1: stopY, x2: plotWidth + 10, y2: stopY, stroke: "#333", strokeDasharray: "3 3" })),
                    react_1.default.createElement("path", { d: `M ${plotWidth + 6} ${stopY + 1} L ${plotWidth + 3} ${stopY + 5} L ${plotWidth + 9} ${stopY + 5} Z`, fill: "#333" }),
                    react_1.default.createElement("line", { x1: plotWidth + 6, y1: startY - 1, x2: plotWidth + 6, y2: stopY + 1, stroke: "#333" }),
                    react_1.default.createElement("path", { d: `M ${plotWidth + 6} ${startY - 1} L ${plotWidth + 3} ${startY - 5} L ${plotWidth + 9} ${startY - 5} Z`, fill: "#333" }),
                    react_1.default.createElement("text", { x: plotWidth + 2, y: (startY + stopY) / 2, fontSize: 10, textAnchor: "middle", transform: `rotate(-90, ${plotWidth + 2}, ${(startY + stopY) / 2})`, pointerEvents: "none" }, range.label)));
            })))));
});
ShortTandemRepeatGenotypeDistributionPlot.displayName = 'ShortTandemRepeatGenotypeDistributionPlot';
ShortTandemRepeatGenotypeDistributionPlot.propTypes = {
    // @ts-expect-error TS(2322) FIXME: Type '{ axisLabels: PropTypes.Validator<(string | ... Remove this comment to see the full error message
    axisLabels: prop_types_1.default.arrayOf(prop_types_1.default.string).isRequired,
    maxRepeats: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
    genotypeDistribution: prop_types_1.default.arrayOf(prop_types_1.default.arrayOf(prop_types_1.default.number)).isRequired,
    xRanges: prop_types_1.default.arrayOf(prop_types_1.default.shape({
        start: prop_types_1.default.number.isRequired,
        stop: prop_types_1.default.number.isRequired,
        label: prop_types_1.default.string.isRequired,
    })),
    yRanges: prop_types_1.default.arrayOf(prop_types_1.default.shape({
        start: prop_types_1.default.number.isRequired,
        stop: prop_types_1.default.number.isRequired,
        label: prop_types_1.default.string.isRequired,
    })),
    onSelectBin: prop_types_1.default.func,
};
ShortTandemRepeatGenotypeDistributionPlot.defaultProps = {
    // @ts-expect-error TS(2322) FIXME: Type '{ xRanges: never[]; yRanges: never[]; onSele... Remove this comment to see the full error message
    xRanges: [],
    yRanges: [],
    onSelectBin: () => { },
};
exports.default = ShortTandemRepeatGenotypeDistributionPlot;
//# sourceMappingURL=ShortTandemRepeatGenotypeDistributionPlot.js.map