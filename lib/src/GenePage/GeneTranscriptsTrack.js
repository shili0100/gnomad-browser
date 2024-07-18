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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const track_transcripts_1 = __importDefault(require("@gnomad/track-transcripts"));
const ui_1 = require("@gnomad/ui");
const gtex_1 = require("../gtex");
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const Link_1 = __importDefault(require("../Link"));
const sortedTranscripts_1 = __importDefault(require("./sortedTranscripts"));
const TranscriptsTissueExpression_1 = __importDefault(require("./TranscriptsTissueExpression"));
const metadata_1 = require("../../dataset-metadata/metadata");
const TranscriptsInfoWrapper = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;
const TranscriptLabel = styled_components_1.default.span `
  font-size: 11px;
`;
const RightPanel = styled_components_1.default.div `
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.375em;
`;
// @ts-expect-error TS(7022) FIXME: 'GeneTranscriptsTrack' implicitly has type 'any' b... Remove this comment to see the full error message
const GeneTranscriptsTrack = ({ datasetId, gene, includeNonCodingTranscripts, includeUTRs, preferredTranscriptId, preferredTranscriptDescription, }) => {
    const transcriptsTrack = (0, react_1.useRef)(null);
    const isTissueExpressionAvailable = gene.reference_genome === 'GRCh37';
    const [showTissueExpressionModal, setShowTissueExpressionModal] = (0, react_1.useState)(false);
    const maxMeanExpression = isTissueExpressionAvailable
        ? (0, d3_array_1.max)(gene.transcripts.map((transcript) => (0, d3_array_1.mean)(Object.values(transcript.gtex_tissue_expression))))
        : undefined;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(region_viewer_1.Track, { renderRightPanel: ({ width }) => {
                return (width > 30 && (react_1.default.createElement(RightPanel, null,
                    react_1.default.createElement(InfoButton_1.default, { topic: "transcript-tissue-expression" }))));
            } }, () => (react_1.default.createElement(TranscriptsInfoWrapper, null,
            react_1.default.createElement("span", null, preferredTranscriptDescription && react_1.default.createElement(react_1.default.Fragment, null,
                "* ",
                preferredTranscriptDescription)),
            react_1.default.createElement("span", null,
                isTissueExpressionAvailable && (react_1.default.createElement(ui_1.Button, { style: { marginRight: '1ch' }, onClick: () => {
                        setShowTissueExpressionModal(true);
                    } }, "Show transcript tissue expression")),
                react_1.default.createElement(ui_1.Button, { onClick: () => {
                        // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
                        transcriptsTrack.current.downloadPlot(`${gene.gene_id}_transcripts`);
                    } }, "Save transcripts plot"))))),
        react_1.default.createElement(track_transcripts_1.default, { ref: transcriptsTrack, renderTranscriptLeftPanel: (0, metadata_1.hasStructuralVariants)(datasetId)
                ? ({ transcript }) => (react_1.default.createElement(TranscriptLabel, null,
                    transcript.transcript_id,
                    ".",
                    transcript.transcript_version,
                    transcript.transcript_id === preferredTranscriptId && '*'))
                : ({ transcript }) => (react_1.default.createElement(TranscriptLabel, null,
                    react_1.default.createElement(Link_1.default, { to: `/transcript/${transcript.transcript_id}` },
                        transcript.transcript_id,
                        ".",
                        transcript.transcript_version,
                        transcript.transcript_id === preferredTranscriptId && '*'))), renderTranscriptRightPanel: !isTissueExpressionAvailable
                ? null
                : ({ transcript, width }) => {
                    if (width < 36) {
                        return null;
                    }
                    const meanExpression = (0, d3_array_1.mean)(Object.values(transcript.gtex_tissue_expression));
                    const maxExpression = (0, d3_array_1.max)(Object.values(transcript.gtex_tissue_expression));
                    const tissueMostExpressedIn = Object.keys(transcript.gtex_tissue_expression).find((tissue) => transcript.gtex_tissue_expression[tissue] === maxExpression);
                    return (react_1.default.createElement("svg", { width: width, height: 10 },
                        react_1.default.createElement(ui_1.TooltipAnchor
                        // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: string; }' is ... Remove this comment to see the full error message
                        , { 
                            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: string; }' is ... Remove this comment to see the full error message
                            tooltip: `Mean expression across all tissues = ${meanExpression.toFixed(2)} TPM\nMost expressed in ${
                            // @ts-expect-error TS(2538) FIXME: Type 'undefined' cannot be used as an index type.
                            gtex_1.GTEX_TISSUE_NAMES[tissueMostExpressedIn]} (${
                            // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                            maxExpression.toFixed(2)} TPM)` },
                            react_1.default.createElement("rect", { x: 0, y: 0, width: 30, height: 10, fill: "none", pointerEvents: "visible" })),
                        react_1.default.createElement("circle", { cx: 15, cy: 5, r: Math.sqrt(meanExpression === 0
                                ? 0
                                : 0.25 +
                                    23.75 *
                                        // @ts-expect-error TS(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
                                        (maxMeanExpression === 0 ? 0 : meanExpression / maxMeanExpression)), fill: "#333", pointerEvents: "none" })));
                }, showNonCodingTranscripts: includeNonCodingTranscripts, showUTRs: includeUTRs, transcripts: (0, sortedTranscripts_1.default)(gene.transcripts, preferredTranscriptId) }),
        showTissueExpressionModal && (react_1.default.createElement(ui_1.Modal
        // @ts-expect-error TS(2820) FIXME: Type '"xlarge"' is not assignable to type '"small"... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2820) FIXME: Type '"xlarge"' is not assignable to type '"small"... Remove this comment to see the full error message
            size: "xlarge", title: "Transcript tissue expression", onRequestClose: () => {
                setShowTissueExpressionModal(false);
            } },
            react_1.default.createElement(TranscriptsTissueExpression_1.default, { transcripts: gene.transcripts, includeNonCodingTranscripts: includeNonCodingTranscripts, preferredTranscriptId: preferredTranscriptId, preferredTranscriptDescription: preferredTranscriptDescription })))));
};
GeneTranscriptsTrack.defaultProps = {
    preferredTranscriptId: null,
    preferredTranscriptDescription: null,
};
exports.default = GeneTranscriptsTrack;
//# sourceMappingURL=GeneTranscriptsTrack.js.map