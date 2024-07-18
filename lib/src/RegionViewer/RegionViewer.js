"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const RegionViewerWrapper = styled_components_1.default.div `
  font-size: 12px;
`;
const GnomadRegionViewer = (props) => {
    return (react_1.default.createElement(RegionViewerWrapper, null,
        react_1.default.createElement(region_viewer_1.RegionViewer, Object.assign({}, props))));
};
exports.default = GnomadRegionViewer;
//# sourceMappingURL=RegionViewer.js.map