"use strict";
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
const query_string_1 = __importDefault(require("query-string"));
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Wrapper = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  align-items: center;

  ${ui_1.Button} {
    margin-left: 0.5em;

    &:first-child {
      margin-left: 0;
    }
  }
`;
const ZoomLabel = styled_components_1.default.span `
  margin: 0 0.5em;

  @media (max-width: 600px) {
    margin-bottom: 0.5em;
  }
`;
const ZoomControlsWrapper = styled_components_1.default.div `
  display: flex;
  align-items: center;
  margin-left: 1em;

  @media (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 1em;

    &:first-child {
      margin-left: 0;
    }
  }
`;
const zoomedRegion = (region, zoom) => {
    const { chrom, start, stop } = region;
    const center = (start + stop) / 2;
    const size = stop - start + 1;
    const newSize = size / zoom;
    return {
        chrom,
        start: Math.max(1, Math.floor(center - newSize / 2)),
        stop: Math.floor(center + newSize / 2),
    };
};
const RegionControls = (_a) => {
    var { region, onChange } = _a, otherProps = __rest(_a, ["region", "onChange"]);
    return (react_1.default.createElement(Wrapper, Object.assign({}, otherProps),
        react_1.default.createElement(ZoomControlsWrapper, null,
            react_1.default.createElement(ZoomLabel, null, "Zoom in"),
            react_1.default.createElement("span", null,
                react_1.default.createElement(ui_1.Button, { "aria-label": "Zoom in 1.5x", onClick: () => {
                        onChange(zoomedRegion(region, 1.5));
                    } }, "1.5x"),
                react_1.default.createElement(ui_1.Button, { "aria-label": "Zoom in 3x", onClick: () => {
                        onChange(zoomedRegion(region, 3));
                    } }, "3x"),
                react_1.default.createElement(ui_1.Button, { "aria-label": "Zoom in 10x", onClick: () => {
                        onChange(zoomedRegion(region, 10));
                    } }, "10x"))),
        react_1.default.createElement(ZoomControlsWrapper, null,
            react_1.default.createElement(ZoomLabel, null, "Zoom out"),
            react_1.default.createElement("span", null,
                react_1.default.createElement(ui_1.Button, { "aria-label": "Zoom out 1.5x", onClick: () => {
                        onChange(zoomedRegion(region, 1 / 1.5));
                    } }, "1.5x"),
                react_1.default.createElement(ui_1.Button, { "aria-label": "Zoom out 3x", onClick: () => {
                        onChange(zoomedRegion(region, 1 / 3));
                    } }, "3x"),
                react_1.default.createElement(ui_1.Button, { "aria-label": "Zoom out 10x", onClick: () => {
                        onChange(zoomedRegion(region, 1 / 10));
                    } }, "10x")))));
};
const GnomadRegionControls = (0, react_router_dom_1.withRouter)((_a) => {
    var { history, location, match: _match } = _a, otherProps = __rest(_a, ["history", "location", "match"]);
    return (react_1.default.createElement(RegionControls, Object.assign({}, otherProps, { onChange: (region) => {
            const regionId = `${region.chrom}-${region.start}-${region.stop}`;
            const currentParams = query_string_1.default.parse(location.search);
            const next = {
                pathname: `/region/${regionId}`,
                search: query_string_1.default.stringify({ dataset: currentParams.dataset }),
            };
            history.push(next);
        } })));
});
exports.default = GnomadRegionControls;
//# sourceMappingURL=RegionControls.js.map