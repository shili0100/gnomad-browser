"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_scale_1 = require("d3-scale");
const react_1 = __importDefault(require("react"));
const react_sizeme_1 = require("react-sizeme");
const styled_components_1 = __importDefault(require("styled-components"));
const axis_1 = require("@visx/axis");
const ui_1 = require("@gnomad/ui");
const Legend_1 = __importDefault(require("../Legend"));
const DownloadFigure_1 = require("./DownloadFigure");
const GraphWrapper = styled_components_1.default.div `
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin-bottom: 1em;
`;
const TwoColumns = styled_components_1.default.div `
  display: flex;
  justify-content: space-around;

  @media (max-width: 992px) {
    display: block;
  }
`;
const GraphSide = styled_components_1.default.div `
  width: 75%;

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const LegendSide = styled_components_1.default.div `
  width: 25%;

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const LegendWrapper = styled_components_1.default.div `
  margin-top: 3em;

  @media (max-width: 992px) {
    margin-top: 0;
  }
`;
const BinHoverTarget = styled_components_1.default.rect `
  pointer-events: visible;
  fill: none;

  &:hover {
    fill: rgba(0, 0, 0, 0.05);
  }
`;
const TitleRow = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
`;
const Title = styled_components_1.default.span `
  width: 70%;
  margin: 14px auto 14px auto;
  font-weight: bold;

  /* non-zero letter spacing fixes html2canvas rendering errors */
  letter-spacing: 0.01px;
  text-align: center;
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
    bottom: 30,
    left: 60,
    right: 10,
    top: 10,
    legend: 50,
    bar: 25,
};
const labelProps = {
    fontSize: 14,
    textAnchor: 'middle',
};
const getDataCategories = (dataRow) => {
    const dataCategories = Object.keys(dataRow);
    dataCategories.splice(dataCategories.indexOf('label'), 1);
    return dataCategories;
};
const getMaxRowSum = (dataRows, dataCategories) => {
    let maxY = 0;
    dataRows.forEach((row) => {
        let rowSum = 0;
        dataCategories.forEach((category) => {
            rowSum += row[category];
        });
        if (rowSum > maxY) {
            maxY = rowSum;
        }
    });
    return maxY;
};
const StackedBarGraph = (0, react_sizeme_1.withSize)()(({ barColors, barValues, formatTooltip, size: { width }, height, xLabel, yLabel, displayNumbers, }) => {
    const dataCategories = getDataCategories(barValues[0]);
    const maxY = getMaxRowSum(barValues, dataCategories);
    const yDomain = [0, maxY];
    const plotWidth = width - margin.legend - (margin.left + margin.right);
    const plotHeight = height - (margin.top + margin.bottom);
    const xBandScale = (0, d3_scale_1.scaleBand)()
        .domain(barValues.map((row) => row.label))
        .range([0, plotWidth]);
    const barMargin = plotWidth / 25;
    const bandWidth = xBandScale.bandwidth() - barMargin * 2;
    const yScale = (0, d3_scale_1.scaleLinear)().domain(yDomain).range([plotHeight, 0]);
    return (react_1.default.createElement(GraphWrapper, null,
        react_1.default.createElement("svg", { height: height, width: width - margin.legend },
            react_1.default.createElement(axis_1.AxisBottom, { label: xLabel, labelOffset: 30, 
                // @ts-expect-error
                labelProps: labelProps, left: margin.left, top: margin.top + plotHeight, scale: xBandScale, stroke: "#333", tickLabelProps: () => ({
                    dx: '-0.25em',
                    dy: '0.25em',
                    fill: '#000',
                    fontSize: 12,
                    textAnchor: 'middle',
                }), tickLength: 3 }),
            react_1.default.createElement(axis_1.AxisLeft, { label: yLabel, 
                // @ts-expect-error
                labelProps: labelProps, left: margin.left, numTicks: Math.min(10, yDomain[1]), tickFormat: yTickFormat, tickLabelProps: () => ({
                    dx: '-0.25em',
                    dy: '0.25em',
                    fill: '#000',
                    fontSize: 10,
                    textAnchor: 'end',
                }), top: margin.top, scale: yScale, stroke: "#333" }),
            dataCategories,
            react_1.default.createElement("g", { transform: `translate(${margin.left},${margin.top})` }, barValues.map((row) => {
                let offset = 0;
                return dataCategories.map((category) => {
                    const barHeight = plotHeight - yScale(row[category]);
                    const barSection = (react_1.default.createElement(react_1.default.Fragment, { key: `${row.label}-${category}` },
                        react_1.default.createElement("rect", { 
                            // @ts-expect-error
                            x: xBandScale(row.label) + barMargin, y: yScale(row[category]) - offset, height: barHeight, width: bandWidth, fill: barColors[category], stroke: "#333" }),
                        displayNumbers && row[category] !== 0 && true && barHeight > 15 && (react_1.default.createElement("text", { 
                            // @ts-expect-error
                            x: xBandScale(row.label) + bandWidth / 2 + barMargin, y: yScale(row[category]) - offset + barHeight / 2, fontSize: 12, dy: 4, textAnchor: "middle", fill: "white" }, row[category].toLocaleString())),
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: formatTooltip(row) },
                            react_1.default.createElement(BinHoverTarget
                            // @ts-expect-error
                            , { 
                                // @ts-expect-error
                                x: xBandScale(row.label) + barMargin, y: 0, height: plotHeight, width: bandWidth }))));
                    offset += barHeight;
                    return barSection;
                });
            })))));
});
const StackedBarGraphWithLegend = ({ title, barColors, barValues, formatTooltip, height, xLabel, yLabel, displayNumbers, }) => {
    const sluggedTitle = title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .concat('test');
    const dataCategories = getDataCategories(barValues[0]);
    const seriesLegend = [];
    dataCategories.forEach((category) => {
        seriesLegend.unshift({
            label: category,
            color: barColors[category],
        });
    });
    return (react_1.default.createElement("div", { id: sluggedTitle },
        react_1.default.createElement(TitleRow, null,
            react_1.default.createElement(Title, null,
                title,
                react_1.default.createElement(DownloadFigure_1.DownloadElementAsPNGButton, { elementId: sluggedTitle }))),
        react_1.default.createElement(TwoColumns, null,
            react_1.default.createElement(GraphSide, null,
                react_1.default.createElement(StackedBarGraph, { barColors: barColors, barValues: barValues, formatTooltip: formatTooltip, height: height, xLabel: xLabel, yLabel: yLabel, displayNumbers: displayNumbers })),
            react_1.default.createElement(LegendSide, null,
                react_1.default.createElement(LegendWrapper, null,
                    react_1.default.createElement(Legend_1.default, { series: seriesLegend }))))));
};
exports.default = StackedBarGraphWithLegend;
//# sourceMappingURL=StackedBarGraph.js.map