"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionIntersections = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("./Link"));
const InfoButton_1 = __importDefault(require("./help/InfoButton"));
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;
const PlotWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const RegionAttributeList = styled_components_1.default.dl `
  margin: 0;

  div {
    margin-bottom: 0.25em;
  }

  dt {
    display: inline;
    font-weight: bold;
  }

  dd {
    display: inline;
    margin-left: 0.5em;
  }
`;
const regionIntersections = (regionArrays) => {
    const sortedRegionsArrays = regionArrays.map((regions) => [...regions].sort((a, b) => a.start - b.start));
    const intersections = [];
    const indices = sortedRegionsArrays.map(() => 0);
    while (sortedRegionsArrays.every((regions, i) => indices[i] < regions.length)) {
        const maxStart = Math.max(...sortedRegionsArrays.map((regions, i) => regions[indices[i]].start));
        const minStop = Math.min(...sortedRegionsArrays.map((regions, i) => regions[indices[i]].stop));
        if (maxStart < minStop) {
            const next = Object.assign(
            // @ts-ignore TS2556: A spread argument must either have a tuple type or be ...
            ...[
                {},
                ...sortedRegionsArrays.map((regions, i) => regions[indices[i]]),
                {
                    start: maxStart,
                    stop: minStop,
                },
            ]);
            intersections.push(next);
        }
        sortedRegionsArrays.forEach((regions, i) => {
            if (regions[indices[i]].stop === minStop) {
                indices[i] += 1;
            }
        });
    }
    return intersections;
};
exports.regionIntersections = regionIntersections;
// https://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=5
const colorScale = {
    not_significant: '#e2e2e2',
    least: '#9b001f',
    less: '#de351b',
    middle: '#fd8d3c',
    greater: '#fecc5c',
    greatest: '#ffffb2',
};
function regionColor(region) {
    if (region.z_score) {
        return region.z_score > 3.09 ? colorScale.middle : colorScale.not_significant;
    }
    let color;
    if (region.obs_exp > 0.8) {
        color = colorScale.greatest;
    }
    else if (region.obs_exp > 0.6) {
        color = colorScale.greater;
    }
    else if (region.obs_exp > 0.4) {
        color = colorScale.middle;
    }
    else if (region.obs_exp > 0.2) {
        color = colorScale.less;
    }
    else {
        color = colorScale.least;
    }
    return region.p_value > 0.001 ? colorScale.not_significant : color;
}
const LegendWrapper = styled_components_1.default.div `
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Legend = () => {
    return (react_1.default.createElement(LegendWrapper, null,
        react_1.default.createElement("span", null, "Missense observed/expected"),
        react_1.default.createElement("svg", { width: 170, height: 25 },
            react_1.default.createElement("rect", { x: 10, y: 0, width: 30, height: 10, stroke: "#000", fill: colorScale.least }),
            react_1.default.createElement("rect", { x: 40, y: 0, width: 30, height: 10, stroke: "#000", fill: colorScale.less }),
            react_1.default.createElement("rect", { x: 70, y: 0, width: 30, height: 10, stroke: "#000", fill: colorScale.middle }),
            react_1.default.createElement("rect", { x: 100, y: 0, width: 30, height: 10, stroke: "#000", fill: colorScale.greater }),
            react_1.default.createElement("rect", { x: 130, y: 0, width: 30, height: 10, stroke: "#000", fill: colorScale.greatest }),
            react_1.default.createElement("text", { x: 10, y: 10, fontSize: "10", dy: "1.2em", textAnchor: "middle" }, "0.0"),
            react_1.default.createElement("text", { x: 40, y: 10, fontSize: "10", dy: "1.2em", textAnchor: "middle" }, "0.2"),
            react_1.default.createElement("text", { x: 70, y: 10, fontSize: "10", dy: "1.2em", textAnchor: "middle" }, "0.4"),
            react_1.default.createElement("text", { x: 100, y: 10, fontSize: "10", dy: "1.2em", textAnchor: "middle" }, "0.6"),
            react_1.default.createElement("text", { x: 130, y: 10, fontSize: "10", dy: "1.2em", textAnchor: "middle" }, "0.8"),
            react_1.default.createElement("text", { x: 160, y: 10, fontSize: "10", dy: "1.2em", textAnchor: "middle" }, "1.0+")),
        react_1.default.createElement("svg", { width: 170, height: 25 },
            react_1.default.createElement("rect", { x: 10, y: 0, width: 20, height: 10, stroke: "#000", fill: colorScale.not_significant }),
            react_1.default.createElement("text", { x: 35, y: 0, fontSize: "10", dy: "1em", textAnchor: "start" }, "Not significant (p > 1e-3)"))));
};
const renderNumber = (number) => {
    return number === undefined || number === null ? '-' : number.toPrecision(4);
};
const renderNumberExponential = (number) => {
    return number === undefined || number === null ? '-' : number.toExponential(3);
};
const printAAorNA = (aa) => {
    if (aa === null) {
        return 'n/a';
    }
    return aa;
};
const RegionTooltip = ({ region, isTranscriptWide }) => {
    if (isTranscriptWide) {
        return (react_1.default.createElement(RegionAttributeList, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("dt", null, "Missense observed/expected:"),
                react_1.default.createElement("dd", null, `${renderNumber(region.obs_exp)} (${region.obs_mis}/${renderNumber(region.exp_mis)})`)),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", null, "The observed/expected ratio for this gene is transcript-wide.")));
    }
    return (react_1.default.createElement(RegionAttributeList, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("dt", null, "Coordinates:"),
            react_1.default.createElement("dd", null, `${region.chrom}:${region.region_start}-${region.region_stop}`)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("dt", null, "Amino acids:"),
            react_1.default.createElement("dd", null, `${printAAorNA(region.aa_start)}-${printAAorNA(region.aa_stop)}`)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("dt", null, "Missense observed/expected:"),
            react_1.default.createElement("dd", null, `${renderNumber(region.obs_exp)} (${region.obs_mis}/${renderNumber(region.exp_mis)})`)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("dt", null, "p-value:"),
            react_1.default.createElement("dd", null,
                renderNumberExponential(region.p_value),
                region.p_value !== null && region.p_value > 0.001 && ' (not significant)'))));
};
const SidePanel = styled_components_1.default.div `
  display: flex;
  align-items: center;
  height: 100%;
`;
const TopPanel = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 5px;
`;
const RegionalMissenseConstraintTrack = ({ regionalMissenseConstraint, gene }) => {
    if (!regionalMissenseConstraint ||
        regionalMissenseConstraint.regions === null ||
        (regionalMissenseConstraint.passed_qc === false &&
            regionalMissenseConstraint.has_no_rmc_evidence === false)) {
        return (react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: () => (react_1.default.createElement(SidePanel, null,
                react_1.default.createElement("span", null, "Regional missense constraint"),
                react_1.default.createElement(InfoButton_1.default, { topic: "regional-constraint" }))) }, ({ width }) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(PlotWrapper, null,
                react_1.default.createElement("svg", { height: 35, width: width },
                    react_1.default.createElement("text", { x: width / 2, y: 35 / 2, dy: "1.0rem", textAnchor: "middle" },
                        react_1.default.createElement("tspan", null,
                            "This gene was not searched for evidence of regional missense constraint. See our",
                            ' '),
                        react_1.default.createElement("tspan", { fill: "#0000ff" },
                            react_1.default.createElement(Link_1.default, { to: "/help" }, "help page")),
                        react_1.default.createElement("tspan", null, " for additional information."))))))));
    }
    // This transcript was searched, but no RMC evidence was found
    //   instead, use the available gene level constraint data to display a single
    //   region for the RMC track
    if (regionalMissenseConstraint.has_no_rmc_evidence) {
        // eslint-disable-next-line no-param-reassign
        regionalMissenseConstraint.regions = [];
        if (gene.gnomad_constraint) {
            // eslint-disable-next-line no-param-reassign
            regionalMissenseConstraint.regions = [
                {
                    chrom: gene.chrom,
                    start: Math.min(gene.start, gene.stop),
                    stop: Math.max(gene.start, gene.stop),
                    region_start: Math.min(gene.start, gene.stop),
                    region_stop: Math.max(gene.start, gene.stop),
                    obs_mis: gene.gnomad_constraint.obs_mis,
                    exp_mis: gene.gnomad_constraint.exp_mis,
                    obs_exp: gene.gnomad_constraint.oe_mis,
                    z_score: gene.gnomad_constraint.mis_z,
                    p_value: -0.01,
                    chisq_diff_null: undefined,
                    aa_start: null,
                    aa_stop: null,
                },
            ];
        }
    }
    const constrainedExons = (0, exports.regionIntersections)([
        regionalMissenseConstraint.regions.map((region) => {
            return Object.assign(Object.assign({}, region), { region_start: region.start, region_stop: region.stop });
        }),
        gene.exons.filter((exon) => exon.feature_type === 'CDS'),
    ]);
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: () => (react_1.default.createElement(SidePanel, null,
                react_1.default.createElement("span", null, "Regional missense constraint"),
                react_1.default.createElement(InfoButton_1.default, { topic: "regional-constraint" }))) }, ({ scalePosition, width }) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TopPanel, null,
                react_1.default.createElement(Legend, null)),
            react_1.default.createElement(PlotWrapper, null,
                react_1.default.createElement("svg", { height: 55, width: width },
                    constrainedExons.map((region) => {
                        const startX = scalePosition(region.start);
                        const stopX = scalePosition(region.stop);
                        const regionWidth = stopX - startX;
                        return (react_1.default.createElement(ui_1.TooltipAnchor, { key: `${region.start}-${region.stop}`, 
                            // @ts-expect-error - from TooltipAnchor component of GBTK
                            region: region, isTranscript: regionalMissenseConstraint.regions.length === 1, tooltipComponent: RegionTooltip },
                            react_1.default.createElement("g", null,
                                react_1.default.createElement("rect", { x: startX, y: 0, width: regionWidth, height: 15, fill: regionColor(region), stroke: "black" }))));
                    }),
                    react_1.default.createElement("g", { transform: "translate(0,20)" }, regionalMissenseConstraint.regions.map((region, index) => {
                        const startX = scalePosition(region.start);
                        const stopX = scalePosition(region.stop);
                        const regionWidth = stopX - startX;
                        const midX = (startX + stopX) / 2;
                        // const offset = index * 15
                        const offset = index * 0;
                        return (react_1.default.createElement("g", { key: `${region.start}-${region.stop}` },
                            react_1.default.createElement("line", { x1: startX, y1: 2 + offset, x2: startX, y2: 11 + offset, stroke: "#424242" }),
                            react_1.default.createElement("line", { x1: startX, y1: 7 + offset, x2: stopX, y2: 7 + offset, stroke: "#424242" }),
                            react_1.default.createElement("line", { x1: stopX, y1: 2 + offset, x2: stopX, y2: 11 + offset, stroke: "#424242" }),
                            regionWidth > 40 && (react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("rect", { x: midX - 15, y: 3 + offset, width: 30, height: 5, fill: "#fafafa" }),
                                react_1.default.createElement("text", { x: midX, y: 8 + offset, dy: "0.33em", textAnchor: "middle" }, region.obs_exp.toFixed(2))))));
                    })))))))));
};
RegionalMissenseConstraintTrack.defaultProps = {
    height: 15,
};
exports.default = RegionalMissenseConstraintTrack;
//# sourceMappingURL=RegionalMissenseConstraintTrack.js.map