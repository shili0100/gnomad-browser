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
const metadata_1 = require("../../dataset-metadata/metadata");
const ZoomableRegionViewer_1 = __importDefault(require("../RegionViewer/ZoomableRegionViewer"));
const TrackPage_1 = require("../TrackPage");
const windowSize_1 = require("../windowSize");
const preferredTranscript_1 = require("./preferredTranscript");
const VariantsInGene_1 = __importDefault(require("./VariantsInGene"));
const analytics_1 = require("../analytics");
const GeneName = styled_components_1.default.span `
  overflow: hidden;
  font-size: 0.75em;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const GeneInfoColumnWrapper = styled_components_1.default.div `
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
const GeneInfoColumn = styled_components_1.default.div `
  width: 40%;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;
const ConstraintOrCooccurrenceColumn = styled_components_1.default.div `
  width: 55%;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;
// prettier-ignore
const BaseTableSelector = (styled_components_1.default.div);
const TableSelector = BaseTableSelector.attrs(({ setSelectedTableName, ownTableName }) => ({
    onClick: () => {
        if (ownTableName === 'cooccurrence') {
            (0, analytics_1.logButtonClick)('User selected variant co-occurrence table on Gene page');
        }
        setSelectedTableName(ownTableName);
    },
})) `
  border: 1px solid black;
  border-radius: 0.5em;
  cursor: pointer;
  margin-right: 0.5em;
  padding: 0.25em;

  background-color: ${({ ownTableName, selectedTableName }) => ownTableName === selectedTableName ? '#cbd3da' : 'transparent'};
`;
const TableSelectorWrapper = styled_components_1.default.div `
  display: flex;
`;
const TrackWrapper = styled_components_1.default.div `
  margin-bottom: 1em;
`;
const ToggleTranscriptsPanel = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding-right: 5px;

  button {
    width: 70px;
    height: auto;
    padding-right: 0.25em;
    padding-left: 0.25em;
  }

  svg {
    fill: #424242;
  }
`;
const CompositeTranscriptPlotWrapper = styled_components_1.default.div `
  display: flex;
  align-items: center;
  height: 50px;
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
const GenePage = ({ datasetId, gene, geneId }) => {
    const hasCDS = gene.exons.some((exon) => exon.feature_type === 'CDS');
    const [includeNonCodingTranscripts, setIncludeNonCodingTranscripts] = (0, react_1.useState)(!hasCDS);
    const [includeUTRs, setIncludeUTRs] = (0, react_1.useState)(false);
    const [showTranscripts, setShowTranscripts] = (0, react_1.useState)(false);
    const [selectedTableName, setSelectedTableName] = (0, react_1.useState)('constraint');
    const { width: windowWidth } = (0, windowSize_1.useWindowSize)();
    const isSmallScreen = windowWidth < 900;
    // Subtract 30px for padding on Page component
    const regionViewerWidth = windowWidth - 30;
    const cdsCompositeExons = gene.exons.filter((exon) => exon.feature_type === 'CDS');
    const hasCodingExons = cdsCompositeExons.length > 0;
    const hasUTRs = gene.exons.some((exon) => exon.feature_type === 'UTR');
    const hasNonCodingTranscripts = gene.transcripts.some((tx) => !tx.exons.some((exon) => exon.feature_type === 'CDS'));
    const regionViewerRegions = !(0, metadata_1.hasExons)(datasetId)
        ? [
            {
                start: Math.max(1, gene.start - 75),
                stop: gene.stop + 75,
            },
        ]
        : gene.exons
            .filter((exon) => exon.feature_type === 'CDS' ||
            (exon.feature_type === 'UTR' && includeUTRs) ||
            (exon.feature_type === 'exon' && includeNonCodingTranscripts))
            .map((exon) => ({
            start: Math.max(1, exon.start - 75),
            stop: exon.stop + 75,
        }));
    const [zoomRegion, setZoomRegion] = (0, react_1.useState)(null);
    const { preferredTranscriptId, preferredTranscriptDescription } = (0, preferredTranscript_1.getPreferredTranscript)(gene);
    return (react_1.default.createElement(TrackPage_1.TrackPage, null,
        react_1.default.createElement(ZoomableRegionViewer_1.default, { contextType: "gene", leftPanelWidth: 115, width: regionViewerWidth, regions: regionViewerRegions, rightPanelWidth: isSmallScreen ? 0 : 80 },
            react_1.default.createElement(VariantsInGene_1.default, { datasetId: datasetId, gene: gene, 
                // @ts-expect-error TS(2322) FIXME: Type '{ datasetId: string; gene: { gene_id: string... Remove this comment to see the full error message
                includeNonCodingTranscripts: includeNonCodingTranscripts, includeUTRs: includeUTRs, zoomRegion: zoomRegion }))));
};
exports.default = GenePage;
//# sourceMappingURL=GenePage.js.map