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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricOptions = void 0;
const d3_scale_1 = require("d3-scale");
const d3_shape_1 = require("d3-shape");
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const axis_1 = require("@visx/axis");
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../dataset-metadata/metadata");
const TopPanel = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
const LegendWrapper = styled_components_1.default.ul `
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0 1em 0 0;
  list-style-type: none;
`;
const LegendItem = styled_components_1.default.li `
  display: flex;
  margin-left: 1em;
`;
const LegendSwatch = styled_components_1.default.span `
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 1px solid black;
  margin-right: 0.5em;

  &::before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    background: ${(props) => props.color};
    opacity: ${(props) => props.opacity};
  }
`;
const Legend = ({ datasets }) => (react_1.default.createElement(LegendWrapper, null, datasets.map((dataset) => (react_1.default.createElement(LegendItem, { key: dataset.name },
    react_1.default.createElement(LegendSwatch, { color: dataset.color, opacity: dataset.opacity }),
    dataset.name)))));
const TitlePanel = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-right: 40px;
`;
var MetricOptions;
(function (MetricOptions) {
    MetricOptions["mean"] = "mean";
    MetricOptions["median"] = "median";
    MetricOptions["over_1"] = "over_1";
    MetricOptions["over_5"] = "over_5";
    MetricOptions["over_10"] = "over_10";
    MetricOptions["over_15"] = "over_15";
    MetricOptions["over_20"] = "over_20";
    MetricOptions["over_25"] = "over_25";
    MetricOptions["over_30"] = "over_30";
    MetricOptions["over_50"] = "over_50";
    MetricOptions["over_100"] = "over_100";
})(MetricOptions || (exports.MetricOptions = MetricOptions = {}));
class CoverageTrack extends react_1.Component {
    constructor(props) {
        super(props);
        this.plotRef = (el) => {
            this.plotElement = el;
        };
        if (this.props.metric) {
            this.state = { selectedMetric: this.props.metric };
        }
        else if ((0, metadata_1.isV4)(this.props.datasetId)) {
            this.state = { selectedMetric: MetricOptions.over_20 };
        }
        else {
            this.state = { selectedMetric: MetricOptions.mean };
        }
    }
    exportPlot() {
        const { filenameForExport } = this.props;
        const { selectedMetric } = this.state;
        const serializer = new XMLSerializer();
        const data = serializer.serializeToString(this.plotElement);
        const blob = new Blob(['<?xml version="1.0" standalone="no"?>\r\n', data], {
            type: 'image/svg+xml;charset=utf-8',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filenameForExport({ selectedMetric })}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    renderArea({ scaleCoverageMetric, scalePosition }) {
        const { datasets, height } = this.props;
        const { selectedMetric } = this.state;
        const pathGenerator = (0, d3_shape_1.area)()
            .x((bucket) => scalePosition(bucket.pos))
            .y0(height)
            // @ts-expect-error TS(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
            .y1((bucket) => scaleCoverageMetric(bucket[selectedMetric]));
        return datasets.map((dataset) => (react_1.default.createElement("g", { key: dataset.name },
            react_1.default.createElement("path", { 
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                d: pathGenerator(dataset.buckets), fill: dataset.color, fillOpacity: dataset.opacity }))));
    }
    renderBars({ isPositionDefined, scaleCoverageMetric, scalePosition, totalBases, width }) {
        const { datasets, height } = this.props;
        const { selectedMetric } = this.state;
        const barWidth = width / totalBases - 1;
        return datasets.map((dataset) => (react_1.default.createElement("g", { key: dataset.name }, dataset.buckets
            .filter((bucket) => bucket[selectedMetric] !== undefined &&
            bucket[selectedMetric] !== null &&
            isPositionDefined(bucket.pos))
            .map((bucket) => {
            const barHeight = height - scaleCoverageMetric(bucket[selectedMetric]);
            const x = scalePosition(bucket.pos);
            return (react_1.default.createElement("rect", { key: bucket.pos, x: x, y: height - barHeight, width: barWidth, height: barHeight, fill: dataset.color, fillOpacity: dataset.opacity, stroke: "none" }));
        }))));
    }
    renderPlot({ isPositionDefined, regions, scaleCoverageMetric, scalePosition, width }) {
        const totalBases = regions.reduce((acc, region) => acc + region.stop - region.start, 0);
        return totalBases < 100
            ? this.renderBars({
                isPositionDefined,
                scaleCoverageMetric,
                scalePosition,
                totalBases,
                width,
            })
            : this.renderArea({
                isPositionDefined,
                scaleCoverageMetric,
                scalePosition,
                totalBases,
                width,
            });
    }
    render() {
        const { coverageOverThresholds, datasets, height, maxCoverage } = this.props;
        const { selectedMetric } = this.state;
        const trackTitle = selectedMetric === 'mean' || selectedMetric === 'median'
            ? `Per-base ${selectedMetric} depth of coverage`
            : `Fraction of individuals with coverage over ${selectedMetric.slice(5)}`;
        return (react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: () => react_1.default.createElement(TitlePanel, null, trackTitle), renderTopPanel: () => (react_1.default.createElement(TopPanel, null,
                react_1.default.createElement(Legend, { datasets: datasets }),
                react_1.default.createElement("label", { htmlFor: "coverage-metric" },
                    "Metric: ",
                    react_1.default.createElement(ui_1.Select, { id: "coverage-metric", value: selectedMetric, onChange: (e) => {
                            this.setState({ selectedMetric: e.target.value });
                        } },
                        react_1.default.createElement("optgroup", { label: "Per-base depth of coverage" },
                            react_1.default.createElement("option", { value: "mean" }, "Mean"),
                            react_1.default.createElement("option", { value: "median" }, "Median")),
                        coverageOverThresholds && (react_1.default.createElement("optgroup", { label: "Fraction of individuals with coverage over X" }, coverageOverThresholds.map((threshold) => (react_1.default.createElement("option", { key: `${threshold}`, value: `over_${threshold}` },
                            "Over ",
                            threshold))))))),
                react_1.default.createElement(ui_1.Button, { style: { marginLeft: '1em' }, onClick: () => this.exportPlot() }, "Save plot"))) }, ({ isPositionDefined, regions, scalePosition, width }) => {
            const scaleCoverageMetric = (0, d3_scale_1.scaleLinear)()
                .domain(selectedMetric === 'mean' || selectedMetric === 'median' ? [0, maxCoverage] : [0, 1])
                .range([height, 7]);
            const axisWidth = 60;
            return (react_1.default.createElement("div", { style: { marginLeft: -axisWidth } },
                react_1.default.createElement("svg", { ref: this.plotRef, height: height, width: axisWidth + width },
                    react_1.default.createElement(axis_1.AxisLeft, { hideZero: true, left: axisWidth, tickLabelProps: () => ({
                            dx: '-0.25em',
                            dy: '0.25em',
                            fill: '#000',
                            fontSize: 10,
                            textAnchor: 'end',
                        }), scale: scaleCoverageMetric, stroke: "#333" }),
                    react_1.default.createElement("g", { transform: `translate(${axisWidth},0)` },
                        this.renderPlot({
                            isPositionDefined,
                            regions,
                            scalePosition,
                            scaleCoverageMetric,
                            width,
                        }),
                        react_1.default.createElement("line", { x1: 0, y1: height, x2: width, y2: height, stroke: "#333" })))));
        }));
    }
}
CoverageTrack.defaultProps = {
    filenameForExport: () => 'coverage',
    height: 190,
    maxCoverage: 100,
};
exports.default = CoverageTrack;
//# sourceMappingURL=CoverageTrack.js.map