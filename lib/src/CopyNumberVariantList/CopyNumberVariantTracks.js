"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_window_1 = require("react-window");
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const Link_1 = __importDefault(require("../Link"));
const CopyNumberVariantPlot_1 = __importDefault(require("./CopyNumberVariantPlot"));
const Row = ({ data: { highlightedVariant, isPositionDefined, onHover, scalePosition, trackColor, variants, width, }, index, style, }) => {
    const variant = variants[index];
    return (react_1.default.createElement("div", { style: style },
        react_1.default.createElement(Link_1.default, { target: "_blank", to: `/variant/${variant.variant_id}`, onMouseEnter: () => {
                onHover(variant.variant_id);
            } },
            react_1.default.createElement(CopyNumberVariantPlot_1.default, { color: trackColor(variant), isHighlighted: variant.variant_id === highlightedVariant, isPositionDefined: isPositionDefined, scalePosition: scalePosition, variant: variant, width: width }))));
};
// @ts-expect-error TS(7022) FIXME: 'CopyNumberVariantTracks' implicitly has type 'any... Remove this comment to see the full error message
const CopyNumberVariantTracks = ({ forwardedRef, // eslint-disable-line react/prop-types
highlightedVariant, numTracksRendered, onHover, onScroll, trackColor, trackHeight, variants, }) => (react_1.default.createElement("div", { onMouseLeave: () => {
        onHover(null);
    } },
    react_1.default.createElement(region_viewer_1.Track, null, ({ isPositionDefined, scalePosition, width }) => (react_1.default.createElement(react_window_1.FixedSizeList, { ref: forwardedRef, height: numTracksRendered * trackHeight, itemCount: variants.length, itemData: {
            highlightedVariant,
            isPositionDefined,
            onHover,
            scalePosition,
            trackColor,
            variants,
            width,
        }, itemKey: (rowIndex) => variants[rowIndex].variant_id, itemSize: trackHeight, onScroll: onScroll, overscanCount: 10, width: "100%" }, Row)))));
CopyNumberVariantTracks.defaultProps = {
    highlightedVariant: null,
};
exports.default = react_1.default.forwardRef((props, ref) => (react_1.default.createElement(CopyNumberVariantTracks, Object.assign({}, props, { forwardedRef: ref }))));
//# sourceMappingURL=CopyNumberVariantTracks.js.map