"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
const arrow_circle_left_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/arrow-circle-left.svg"));
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
const arrow_circle_right_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/arrow-circle-right.svg"));
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const track_regions_1 = require("@gnomad/track-regions");
const LeftPanel = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding-right: 5px;

  svg {
    fill: #424242;
  }
`;
const transcriptFeatureAttributes = {
    exon: {
        fill: '#bdbdbd',
        height: 8,
    },
    CDS: {
        fill: '#424242',
        height: 20,
    },
    UTR: {
        fill: '#424242',
        height: 8,
    },
    start_pad: {
        fill: '#5A5E5C',
        height: 2,
    },
    end_pad: {
        fill: '#5A5E5C',
        height: 2,
    },
    intron: {
        fill: '#5A5E5C',
        height: 2,
    },
    default: {
        fill: 'grey',
        height: 2,
    },
};
const transcriptRegionAttributes = (region) => 
// @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
transcriptFeatureAttributes[region.feature_type] || transcriptFeatureAttributes.default;
const featureTypeOrder = {
    exon: 0,
    UTR: 1,
    CDS: 2,
};
const featureTypeCompareFn = (r1, r2) => 
// @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
featureTypeOrder[r1.feature_type] - featureTypeOrder[r2.feature_type];
const transcriptRegionKey = (region) => `${region.feature_type}-${region.start}-${region.stop}`;
// @ts-expect-error TS(7022) FIXME: 'TranscriptsTrack' implicitly has type 'any' becau... Remove this comment to see the full error message
const TranscriptsTrack = ({ transcript, showUTRs }) => {
    const isCodingTranscript = transcript.exons.some((exon) => exon.feature_type === 'CDS');
    return (react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: ({ width }) => (
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        react_1.default.createElement(LeftPanel, { width: width },
            react_1.default.createElement("img", { src: transcript.strand === '-' ? arrow_circle_left_svg_1.default : arrow_circle_right_svg_1.default, alt: "", "aria-hidden": "true", height: 20, width: 20 }))) }, ({ scalePosition, width }) => (react_1.default.createElement(track_regions_1.RegionsPlot, { height: 20, regions: transcript.exons
            .filter((exon) => exon.feature_type === 'CDS' ||
            (exon.feature_type === 'UTR' && showUTRs) ||
            (exon.feature_type === 'exon' && !isCodingTranscript))
            // Sort by feature type to ensure that when regions overlap, the most important
            // region is at the front.
            .sort(featureTypeCompareFn), regionAttributes: transcriptRegionAttributes, regionKey: transcriptRegionKey, scalePosition: scalePosition, width: width }))));
};
TranscriptsTrack.defaultProps = {
    showUTRs: false,
};
exports.default = TranscriptsTrack;
//# sourceMappingURL=TranscriptTrack.js.map