"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importDefault(require("react"));
const react_sizeme_1 = require("react-sizeme");
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const RegionCoverageTrack_1 = __importDefault(require("../RegionPage/RegionCoverageTrack"));
const RegionViewer_1 = __importDefault(require("../RegionViewer/RegionViewer"));
const Link_1 = __importDefault(require("../Link"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
// The 100% width/height container is necessary the component
// to size to fit its container vs staying at its initial size.
const Wrapper = styled_components_1.default.div `
  width: 100%;
`;
// @ts-expect-error TS(2339) FIXME: Property 'datasetId' does not exist on type '{}'.
const VariantNotFound = (0, react_sizeme_1.withSize)()(({ datasetId, size: { width }, variantId }) => {
    const parts = variantId.split('-');
    const chrom = parts[0];
    const pos = Number(parts[1]);
    const redirectRegion = `${chrom}-${pos - 20}-${pos + 20}`;
    const regionViewerRegions = [
        {
            start: Math.max(1, pos - 20),
            stop: pos + 20,
        },
    ];
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(StatusMessage_1.default, null,
            "Variant not found",
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Link_1.default, { to: `/region/${redirectRegion}` }, "View surrounding region")),
        react_1.default.createElement(RegionViewer_1.default, { regions: regionViewerRegions, rightPanelWidth: 0, width: width },
            react_1.default.createElement(RegionCoverageTrack_1.default, { datasetId: datasetId, chrom: chrom, start: regionViewerRegions[0].start, stop: regionViewerRegions[0].stop }),
            react_1.default.createElement(region_viewer_1.PositionAxisTrack, null))));
});
VariantNotFound.displayName = 'VariantNotFound';
VariantNotFound.propTypes = {
    // @ts-expect-error TS(2322) FIXME: Type '{ variantId: PropTypes.Validator<string>; }'... Remove this comment to see the full error message
    variantId: prop_types_1.default.string.isRequired,
};
exports.default = VariantNotFound;
//# sourceMappingURL=VariantNotFound.js.map