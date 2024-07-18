"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Legend = void 0;
exports.regionColor = regionColor;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const query_string_1 = __importDefault(require("query-string"));
// @ts-expect-error
const region_viewer_1 = require("@gnomad/region-viewer");
const ui_1 = require("@gnomad/ui");
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const question_circle_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/question-circle.svg"));
const Link_1 = __importDefault(require("./Link"));
const InfoButton_1 = __importDefault(require("./help/InfoButton"));
const Wrapper = styled_components_1.default.div `
  display: flex;
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
function regionColor(region) {
    // http://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=3
    let color;
    if (region.z > 4.0) {
        color = '#f03b20';
    }
    else if (region.z > 2.18) {
        color = '#ffeda0';
    }
    else {
        color = '#e2e2e2';
    }
    return color;
}
const LegendWrapper = styled_components_1.default.div `
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
const LegendTooltip = () => (react_1.default.createElement(react_1.default.Fragment, null, `The Z score ranges from -10 to 10. Z >= 2.18 (yellow) and Z >= 4.0 (red) represent the top 10% and top 1% of constrained non-coding regions, respectively.`));
const Legend = () => {
    const currentParams = query_string_1.default.parse(location.search);
    return (react_1.default.createElement(LegendWrapper, null,
        currentParams.variant && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", null, "Selected Variant"),
            react_1.default.createElement("svg", { width: 40, height: 25 },
                react_1.default.createElement("rect", { x: 10, y: 0, width: 2, height: 20, fill: "#000" })))),
        react_1.default.createElement("span", null,
            "Z Score",
            ' ',
            react_1.default.createElement(ui_1.TooltipAnchor, { key: "Legend", tooltipComponent: LegendTooltip },
                react_1.default.createElement("img", { src: question_circle_svg_1.default, height: "12", alt: "", "aria-hidden": "true" }))),
        react_1.default.createElement("svg", { width: 330, height: 25 },
            react_1.default.createElement("text", { x: 15, y: -4, fontSize: "10", dy: "1.2em" }, "not constrained"),
            react_1.default.createElement("rect", { x: 95, y: 0, width: 40, height: 10, stroke: "#000", fill: "#e2e2e2" }),
            react_1.default.createElement("rect", { x: 135, y: 0, width: 40, height: 10, stroke: "#000", fill: "#ffeda0" }),
            react_1.default.createElement("rect", { x: 175, y: 0, width: 40, height: 10, stroke: "#000", fill: "#f03b20" }),
            react_1.default.createElement("text", { x: 220, y: -4, fontSize: "10", dy: "1.2em" }, "constrained"),
            react_1.default.createElement("text", { x: 110, y: 10, fontSize: "10", dy: "1.2em", textAnchor: "middle" }),
            react_1.default.createElement("text", { x: 135, y: 10, fontSize: "10", dy: "1.2em", textAnchor: "middle" }, "2.18"),
            react_1.default.createElement("text", { x: 175, y: 10, fontSize: "10", dy: "1.2em", textAnchor: "middle" }, "4.0"))));
};
exports.Legend = Legend;
const renderNumber = (number) => number === undefined || number === null ? '-' : number.toPrecision(4);
const RegionTooltip = ({ region }) => (react_1.default.createElement(RegionAttributeList, null,
    react_1.default.createElement("div", null,
        react_1.default.createElement("dt", null, "Z:"),
        react_1.default.createElement("dd", null, renderNumber(region.z))),
    react_1.default.createElement("div", null,
        react_1.default.createElement("dt", null, "o/e:"),
        react_1.default.createElement("dd", null, renderNumber(region.obs_exp)))));
const renderTrackLeftPanel = (constraintWidth) => {
    return (react_1.default.createElement(SidePanel, null,
        react_1.default.createElement("span", null, `Regional genomic constraint (${constraintWidth / 1000}kb scale)`),
        react_1.default.createElement(InfoButton_1.default, { topic: "genomic-constraint" })));
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
// @ts-expect-error TS(7022) FIXME: 'RegionalConstraintTrack' implicitly has type 'any... Remove this comment to see the full error message
const RegionalGenomicConstraintTrack = ({ height, start, stop, regions, }) => {
    const returnConstraintsThreshold = 150000;
    const constraintRegionSize = 1000;
    if (regions === null) {
        return (react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: () => renderTrackLeftPanel(constraintRegionSize) }, ({ width }) => (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(PlotWrapper, null,
                    react_1.default.createElement("svg", { height: height, width: width },
                        react_1.default.createElement("text", { x: width / 2, y: height / 2, dy: "0.33rem", textAnchor: "middle" },
                            stop - start > returnConstraintsThreshold &&
                                `The genomic constraint track is only displayed for regions with a size of ${returnConstraintsThreshold / 1000}kb or smaller. Zoom in or adjust the region to see this track.`,
                            stop - start <= returnConstraintsThreshold &&
                                `There is no genomic constraint data for this region`))))))));
    }
    const currentParams = query_string_1.default.parse(location.search);
    const variantId = currentParams.variant;
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: () => renderTrackLeftPanel(constraintRegionSize) }, ({ scalePosition, width }) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TopPanel, null,
                react_1.default.createElement(exports.Legend, null)),
            react_1.default.createElement(PlotWrapper, null,
                react_1.default.createElement("svg", { height: height, width: width },
                    react_1.default.createElement("rect", { x: scalePosition(start), y: 30, width: scalePosition(stop) - scalePosition(start), height: 1, fill: "#000" }),
                    typeof variantId === 'string' && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("rect", { x: scalePosition(variantId.split('-')[1]), y: 15, width: 2, height: 30, fill: "#000" }),
                        react_1.default.createElement("text", { x: scalePosition(variantId.split('-')[1]), y: 9, dy: "0.33rem", textAnchor: "middle" },
                            react_1.default.createElement(Link_1.default, { to: `/variant/${variantId}` }, variantId)))),
                    regions.map((region) => {
                        const startX = scalePosition(region.start.toString());
                        const stopX = scalePosition(region.stop.toString());
                        const regionWidth = stopX - startX;
                        return (react_1.default.createElement(ui_1.TooltipAnchor, { key: `${region.start}-${region.stop}`, 
                            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; key: string; region: an... Remove this comment to see the full error message
                            region: region, tooltipComponent: RegionTooltip },
                            react_1.default.createElement("g", null,
                                react_1.default.createElement("rect", { x: startX, y: 22.5, width: regionWidth, height: 15, fill: regionColor(region), stroke: "black" }),
                                regionWidth > 32 && (react_1.default.createElement("text", { x: (startX + stopX) / 2, y: 30, dy: "0.33em", textAnchor: "middle" }, region.z.toFixed(2))))));
                    }))))))));
};
RegionalGenomicConstraintTrack.defaultProps = {
    height: 45,
};
exports.default = RegionalGenomicConstraintTrack;
//# sourceMappingURL=RegionalGenomicConstraintTrack.js.map