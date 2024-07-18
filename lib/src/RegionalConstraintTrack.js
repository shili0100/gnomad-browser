"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const polished_1 = require("polished");
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const ui_1 = require("@gnomad/ui");
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
    if (region.obs_exp > 0.6) {
        color = '#e2e2e2';
    }
    else if (region.obs_exp > 0.4) {
        color = '#ffeda0';
    }
    else if (region.obs_exp > 0.2) {
        color = '#feb24c';
    }
    else {
        color = '#f03b20';
    }
    return region.chisq_diff_null < 10.8 ? (0, polished_1.transparentize)(0.8, color) : color;
}
const renderNumber = (number) => number === undefined || number === null ? '-' : number.toPrecision(4);
const RegionTooltip = ({ region }) => (react_1.default.createElement(RegionAttributeList, null,
    react_1.default.createElement("div", null,
        react_1.default.createElement("dt", null, "O/E missense:"),
        react_1.default.createElement("dd", null, renderNumber(region.obs_exp))),
    react_1.default.createElement("div", null,
        react_1.default.createElement("dt", null,
            "\u03C7",
            react_1.default.createElement("sup", null, "2"),
            ":"),
        react_1.default.createElement("dd", null,
            renderNumber(region.chisq_diff_null),
            region.chisq_diff_null !== null && region.chisq_diff_null < 10.8 && ' (not significant)'))));
const SidePanel = styled_components_1.default.div `
  display: flex;
  align-items: center;
`;
// @ts-expect-error TS(7022) FIXME: 'RegionalConstraintTrack' implicitly has type 'any... Remove this comment to see the full error message
const RegionalConstraintTrack = ({ height, regions }) => (react_1.default.createElement(Wrapper, null,
    react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: () => (react_1.default.createElement(SidePanel, null,
            react_1.default.createElement("span", null, "Regional missense constraint"),
            react_1.default.createElement(InfoButton_1.default, { topic: "regional-constraint" }))) }, ({ scalePosition, width }) => (react_1.default.createElement(PlotWrapper, null,
        react_1.default.createElement("svg", { height: height, width: width }, regions.map((region) => {
            const startX = scalePosition(region.start);
            const stopX = scalePosition(region.stop);
            const regionWidth = stopX - startX;
            return (react_1.default.createElement(ui_1.TooltipAnchor, { key: `${region.start}-${region.stop}`, 
                // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; key: string; region: an... Remove this comment to see the full error message
                region: region, tooltipComponent: RegionTooltip },
                react_1.default.createElement("g", null,
                    react_1.default.createElement("rect", { x: startX, y: 0, width: regionWidth, height: height, fill: regionColor(region), stroke: "black" }),
                    regionWidth > 30 && (react_1.default.createElement("text", { x: (startX + stopX) / 2, y: height / 2, dy: "0.33em", textAnchor: "middle" }, region.obs_exp.toFixed(2))))));
        })))))));
RegionalConstraintTrack.defaultProps = {
    height: 15,
};
exports.default = RegionalConstraintTrack;
//# sourceMappingURL=RegionalConstraintTrack.js.map