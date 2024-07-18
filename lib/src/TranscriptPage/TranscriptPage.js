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
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const track_transcripts_1 = require("@gnomad/track-transcripts");
const metadata_1 = require("../../dataset-metadata/metadata");
const ConstraintTable_1 = __importDefault(require("../ConstraintTable/ConstraintTable"));
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const GeneFlags_1 = __importDefault(require("../GenePage/GeneFlags"));
const GnomadPageHeading_1 = __importDefault(require("../GnomadPageHeading"));
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const ZoomableRegionViewer_1 = __importDefault(require("../RegionViewer/ZoomableRegionViewer"));
const TrackPage_1 = require("../TrackPage");
const windowSize_1 = require("../windowSize");
const MitochondrialTranscriptCoverageTrack_1 = __importDefault(require("./MitochondrialTranscriptCoverageTrack"));
const MitochondrialVariantsInTranscript_1 = __importDefault(require("./MitochondrialVariantsInTranscript"));
const TranscriptCoverageTrack_1 = __importDefault(require("./TranscriptCoverageTrack"));
const TranscriptInfo_1 = __importDefault(require("./TranscriptInfo"));
const TranscriptTrack_1 = __importDefault(require("./TranscriptTrack"));
const VariantsInTranscript_1 = __importDefault(require("./VariantsInTranscript"));
const ChartStyles_1 = require("../ChartStyles");
const TranscriptInfoColumnWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1em;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }

  /* Matches responsive styles in AttributeList */
  @media (max-width: 600px) {
    align-items: stretch;
  }
`;
const transcriptFeatureAttributes = {
    exon: {
        fill: '#bdbdbd',
        height: 4,
    },
    CDS: {
        fill: '#424242',
        height: 10,
    },
    UTR: {
        fill: '#424242',
        height: 4,
    },
};
const TranscriptPage = ({ datasetId, transcript }) => {
    const [includeUTRs, setIncludeUTRs] = (0, react_1.useState)(false);
    const { width: windowWidth } = (0, windowSize_1.useWindowSize)();
    const isSmallScreen = windowWidth < 900;
    // Subtract 30px for padding on Page component
    const regionViewerWidth = windowWidth - 30;
    const cdsCompositeExons = transcript.exons.filter((exon) => exon.feature_type === 'CDS');
    const hasCodingExons = cdsCompositeExons.length > 0;
    const hasUTRs = transcript.exons.some((exon) => exon.feature_type === 'UTR');
    const isCodingTranscript = transcript.exons.some((exon) => exon.feature_type === 'CDS');
    const regionViewerRegions = transcript.exons
        .filter((exon) => exon.feature_type === 'CDS' ||
        (exon.feature_type === 'UTR' && includeUTRs) ||
        (exon.feature_type === 'exon' && !isCodingTranscript))
        .map((exon) => ({
        start: Math.max(1, exon.start - 75),
        stop: exon.stop + 75,
    }));
    const [zoomRegion, setZoomRegion] = (0, react_1.useState)(null);
    return (react_1.default.createElement(TrackPage_1.TrackPage, null,
        react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement(DocumentTitle_1.default, { title: `${transcript.transcript_id} | ${(0, metadata_1.labelForDataset)(datasetId)}` }),
            react_1.default.createElement(GnomadPageHeading_1.default, { selectedDataset: datasetId, datasetOptions: {
                    includeShortVariants: true,
                    includeStructuralVariants: false,
                    includeExac: transcript.chrom !== 'M',
                    includeGnomad2: transcript.chrom !== 'M',
                    includeGnomad3: true,
                    includeGnomad3Subsets: transcript.chrom !== 'M',
                    includeGnomad4Subsets: true,
                } },
                "Transcript: ",
                transcript.transcript_id,
                ".",
                transcript.transcript_version),
            react_1.default.createElement(TranscriptInfoColumnWrapper, null,
                react_1.default.createElement("div", { style: { maxWidth: '50%' } },
                    react_1.default.createElement(TranscriptInfo_1.default, { transcript: transcript }),
                    react_1.default.createElement(GeneFlags_1.default, { gene: transcript.gene })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h2", null,
                        "Constraint ",
                        transcript.chrom !== 'M' && react_1.default.createElement(InfoButton_1.default, { topic: "constraint" })),
                    react_1.default.createElement(ConstraintTable_1.default, { datasetId: datasetId, geneOrTranscript: transcript })))),
        react_1.default.createElement(ZoomableRegionViewer_1.default, { contextType: "transcript", leftPanelWidth: 115, width: regionViewerWidth, regions: regionViewerRegions, rightPanelWidth: isSmallScreen ? 0 : 80, renderOverview: ({ scalePosition, width: overviewWidth }) => (react_1.default.createElement(track_transcripts_1.TranscriptPlot, { height: 10, scalePosition: scalePosition, showNonCodingExons: true, showUTRs: includeUTRs, transcript: transcript, width: overviewWidth })), zoomRegion: zoomRegion, onChangeZoomRegion: setZoomRegion },
            transcript.chrom === 'M' ? (react_1.default.createElement(MitochondrialTranscriptCoverageTrack_1.default, { datasetId: datasetId, transcriptId: transcript.transcript_id })) : (react_1.default.createElement(TranscriptCoverageTrack_1.default, { datasetId: datasetId, transcriptId: transcript.transcript_id, includeExomeCoverage: (0, metadata_1.transcriptsHaveExomeCoverage)(datasetId) })),
            react_1.default.createElement(ChartStyles_1.ControlPanel, { marginLeft: 100, width: regionViewerWidth - 100 - (isSmallScreen ? 0 : 80) },
                "Include:",
                react_1.default.createElement(ChartStyles_1.Legend, null,
                    react_1.default.createElement(ChartStyles_1.LegendItemWrapper, null,
                        react_1.default.createElement(ChartStyles_1.Label, { htmlFor: "include-cds-regions" },
                            react_1.default.createElement(ChartStyles_1.CheckboxInput, { checked: hasCodingExons, disabled: true, id: "include-cds-regions", onChange: () => { } }),
                            "Coding regions (CDS)",
                            react_1.default.createElement(ChartStyles_1.LegendSwatch, { color: transcriptFeatureAttributes.CDS.fill, 
                                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                                height: transcriptFeatureAttributes.CDS.height }))),
                    react_1.default.createElement(ChartStyles_1.LegendItemWrapper, null,
                        react_1.default.createElement(ChartStyles_1.Label, { htmlFor: "include-utr-regions" },
                            react_1.default.createElement(ChartStyles_1.CheckboxInput, { checked: includeUTRs, disabled: !hasUTRs, id: "include-utr-regions", onChange: (e) => {
                                    setIncludeUTRs(e.target.checked);
                                } }),
                            "Untranslated regions (UTRs)",
                            react_1.default.createElement(ChartStyles_1.LegendSwatch, { color: transcriptFeatureAttributes.UTR.fill, 
                                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                                height: transcriptFeatureAttributes.UTR.height }))),
                    react_1.default.createElement(ChartStyles_1.LegendItemWrapper, null,
                        react_1.default.createElement(ChartStyles_1.Label, { htmlFor: "include-nc-regions" },
                            react_1.default.createElement(ChartStyles_1.CheckboxInput, { checked: !isCodingTranscript, disabled: true, id: "include-nc-regions", onChange: () => { } }),
                            "Non-coding regions",
                            react_1.default.createElement(ChartStyles_1.LegendSwatch, { color: transcriptFeatureAttributes.exon.fill, 
                                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                                height: transcriptFeatureAttributes.exon.height }))))),
            react_1.default.createElement("div", { style: { margin: '1em 0' } },
                react_1.default.createElement(TranscriptTrack_1.default, { transcript: transcript, showUTRs: includeUTRs })),
            transcript.chrom === 'M' ? (react_1.default.createElement(MitochondrialVariantsInTranscript_1.default, { datasetId: datasetId, transcript: transcript, zoomRegion: zoomRegion })) : (react_1.default.createElement(VariantsInTranscript_1.default, { datasetId: datasetId, 
                // @ts-expect-error TS(2322) FIXME: Type '{ datasetId: string; includeUTRs: boolean; t... Remove this comment to see the full error message
                includeUTRs: includeUTRs, transcript: transcript, zoomRegion: zoomRegion })))));
};
exports.default = TranscriptPage;
//# sourceMappingURL=TranscriptPage.js.map