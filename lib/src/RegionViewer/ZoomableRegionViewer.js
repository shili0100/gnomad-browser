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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const getVisibleRegions_1 = __importDefault(require("./getVisibleRegions"));
const RegionViewer_1 = __importDefault(require("./RegionViewer"));
const ZoomControlsWrapper = styled_components_1.default.div `
  /* Subtract 10px to offset the bottom margin on RegionViewer in ZoomRegionOverview */
  padding: 1em 1em calc(1em - 10px) 1em;
  border: 1px solid #333;
  border-radius: 0.5em;
  margin-bottom: 1em;
  background: #f4f4f4;
`;
// @ts-expect-error TS(7022) FIXME: 'ZoomableRegionViewer' implicitly has type 'any' b... Remove this comment to see the full error message
const ZoomableRegionViewer = (_a) => {
    var { contextType, regions, renderOverview, zoomDisabled, zoomRegion, onChangeZoomRegion } = _a, otherProps = __rest(_a, ["contextType", "regions", "renderOverview", "zoomDisabled", "zoomRegion", "onChangeZoomRegion"]);
    const overviewRef = (0, react_1.useRef)(null);
    const visibleRegions = (0, react_1.useMemo)(() => (0, getVisibleRegions_1.default)(regions, zoomRegion), [regions, zoomRegion]);
    const isZoomed = zoomRegion &&
        (zoomRegion.start > regions[0].start || zoomRegion.stop < regions[regions.length - 1].stop);
    const [isSelectRegionModalOpen, setIsSelectRegionModalOpen] = (0, react_1.useState)(false);
    return (react_1.default.createElement(RegionViewer_1.default, Object.assign({}, otherProps, { regions: visibleRegions })));
};
ZoomableRegionViewer.defaultProps = {
    contextType: 'region',
    zoomDisabled: false,
    zoomRegion: null,
    onChangeZoomRegion: () => { },
};
exports.default = ZoomableRegionViewer;
//# sourceMappingURL=ZoomableRegionViewer.js.map