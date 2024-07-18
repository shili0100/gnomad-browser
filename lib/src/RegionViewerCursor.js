"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const Cursor = (props) => (react_1.default.createElement(region_viewer_1.Cursor, Object.assign({}, props, { renderCursor: (x) => react_1.default.createElement("line", { x1: x, y1: 0, x2: x, y2: "100%", stroke: "#000", strokeWidth: 1 }) })));
exports.default = Cursor;
//# sourceMappingURL=RegionViewerCursor.js.map