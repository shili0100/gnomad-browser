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
const ageRangeLabel = (ageRange) => {
    const [minAge, maxAge] = ageRange;
    if (minAge === null) {
        return `<${maxAge}`;
    }
    if (maxAge === null) {
        return `>${minAge}`;
    }
    return `${minAge}-${maxAge}`;
};
const ShortTandemRepeatAgeDistributionPlot = (0, react_sizeme_1.withSize)()(
// @ts-expect-error TS(2339) FIXME: Property 'ageDistribution' does not exist on type ... Remove this comment to see the full error message
({ ageDistribution, maxRepeats, ranges, size: { width } }) => {
    const height = Math.min(width, 300);
    const margin = {
        bottom: 65,
        left: 60,
        right: 10,
        top: 20,
    };
    const plotWidth = width - (margin.left + margin.right);
    const plotHeight = height - (margin.top + margin.bottom);
    const xBinSize = Math.max(1, Math.ceil(maxRepeats / (plotWidth / 10)));
    const xNumBins = Math.floor(maxRepeats / xBinSize) + 1;
    const yNumBins = ageDistribution.length;
    const data = Array.from(Array(xNumBins * yNumBins).keys()).map((n) => {
        const xBinIndex = Math.floor(n / yNumBins);
        const yBinIndex = n % yNumBins;
        const xRange = xBinSize === 1
            ? [xBinIndex, xBinIndex]
            : [xBinIndex * xBinSize, xBinIndex * xBinSize + xBinSize - 1];
        const xLabel = xBinSize === 1
            ? `${xBinIndex}`
            : `${xBinIndex * xBinSize} - ${xBinIndex * xBinSize + xBinSize - 1}`;
        return {
            label: `Age ${ageRangeLabel(ageDistribution[yBinIndex].age_range)}, ${xLabel} repeats`,
            xBinIndex,
            yBinIndex,
            xRange,
            count: 0,
        };
    });
    ageDistribution.forEach((ageBin, yBinIndex) => {
        // @ts-expect-error TS(7031) FIXME: Binding element 'repeats' implicitly has an 'any' ... Remove this comment to see the full error message
        ageBin.distribution.forEach(([repeats, nAlleles]) => {
            const xBinIndex = Math.floor(repeats / xBinSize);
            data[xBinIndex * yNumBins + yBinIndex].count += nAlleles;
        });
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
        return ageRangeLabel(ageDistribution[binIndex].age_range);
    };
    const opacityScale = (0, d3_scale_1.scaleLog)()
        // @ts-expect-error TS(2345) FIXME: Argument of type '(string | number | undefined)[]'... Remove this comment to see the full error message
        .domain([
        1,
        (0, d3_array_1.max)(ageDistribution, (ageBin) => (0, d3_array_1.max)(ageBin.distribution, (d) => d[1])),
    ])
        .range([0.1, 1]);
    return (react_1.default.createElement(GraphWrapper, null,
        react_1.default.createElement("svg", { height: xBinSize === 1 ? height - 20 : height, width: width },
            react_1.default.createElement(axis_1.AxisBottom, { label: "Repeats", labelOffset: xBinSize === 1 ? 10 : 30, 
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
            react_1.default.createElement(axis_1.AxisLeft, { label: "Age", labelOffset: 42, 
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
                            d.count === 1 ? '' : 's') },
                        react_1.default.createElement("rect", { x: xScale(d.xBinIndex), y: yScale(d.yBinIndex), width: xBandwidth, height: yBandwidth, fill: "#73ab3d", opacity: d.count === 0 ? 0 : opacityScale(d.count), stroke: "#333" }))));
            })),
            react_1.default.createElement("g", { transform: `translate(${margin.left}, 0)` }, ranges
                .filter((range) => range.start !== range.stop)
                .filter((range) => range.start <= maxRepeats)
                .map((range, rangeIndex) => {
                const startBinIndex = Math.floor(range.start / xBinSize);
                const startX = 
                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                xScale(startBinIndex) +
                    ((range.start - startBinIndex * xBinSize) / xBinSize) * xBandwidth;
                let stopX;
                if (range.stop <= maxRepeats) {
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
                if (rangeIndex === ranges.length - 1 && plotWidth - startX < 60) {
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
            })))));
});
ShortTandemRepeatAgeDistributionPlot.displayName = 'ShortTandemRepeatAgeDistributionPlot';
ShortTandemRepeatAgeDistributionPlot.propTypes = {
    // @ts-expect-error TS(2322) FIXME: Type '{ ageDistribution: PropTypes.Requireable<(Pr... Remove this comment to see the full error message
    ageDistribution: prop_types_1.default.arrayOf(prop_types_1.default.shape({
        age_range: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
        distribution: prop_types_1.default.arrayOf(prop_types_1.default.arrayOf(prop_types_1.default.number)).isRequired,
    })),
    maxRepeats: prop_types_1.default.number.isRequired,
    ranges: prop_types_1.default.arrayOf(prop_types_1.default.shape({
        start: prop_types_1.default.number.isRequired,
        stop: prop_types_1.default.number.isRequired,
        label: prop_types_1.default.string.isRequired,
    })),
};
ShortTandemRepeatAgeDistributionPlot.defaultProps = {
    // @ts-expect-error TS(2322) FIXME: Type '{ ranges: never[]; }' is not assignable to t... Remove this comment to see the full error message
    ranges: [],
};
exports.default = ShortTandemRepeatAgeDistributionPlot;
//# sourceMappingURL=ShortTandemRepeatAgeDistributionPlot.js.map