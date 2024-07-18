"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_sizeme_1 = require("react-sizeme");
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const Wrapper = styled_components_1.default.div `
  width: 100%;
`;
const AutosizedRegionViewer = (props) => (react_1.default.createElement(react_sizeme_1.SizeMe, null, ({ size }) => (react_1.default.createElement(Wrapper, null, size.width && react_1.default.createElement(region_viewer_1.RegionViewer, Object.assign({}, props, { width: size.width }))))));
exports.default = AutosizedRegionViewer;
//# sourceMappingURL=AutosizedRegionViewer.js.map