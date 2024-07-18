"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const GnomadPageHeading_1 = __importDefault(require("../GnomadPageHeading"));
const Link_1 = __importDefault(require("../Link"));
const RegionalGenomicConstraintTrack_1 = __importDefault(require("../RegionalGenomicConstraintTrack"));
const RegionViewer_1 = __importDefault(require("../RegionViewer/RegionViewer"));
const TrackPage_1 = require("../TrackPage");
const windowSize_1 = require("../windowSize");
const EditRegion_1 = __importDefault(require("./EditRegion"));
const GenesInRegionTrack_1 = __importDefault(require("./GenesInRegionTrack"));
const MitochondrialRegionCoverageTrack_1 = __importDefault(require("./MitochondrialRegionCoverageTrack"));
const MitochondrialVariantsInRegion_1 = __importDefault(require("./MitochondrialVariantsInRegion"));
const RegionControls_1 = __importDefault(require("./RegionControls"));
const RegionCoverageTrack_1 = __importDefault(require("./RegionCoverageTrack"));
const RegionInfo_1 = __importDefault(require("./RegionInfo"));
const VariantsInRegion_1 = __importDefault(require("./VariantsInRegion"));
const StructuralVariantsInRegion_1 = __importDefault(require("./StructuralVariantsInRegion"));
const CopyNumberVariantsInRegion_1 = __importDefault(require("./CopyNumberVariantsInRegion"));
const RegionInfoColumnWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }

  /* Matches responsive styles in AttributeList */
  @media (max-width: 600px) {
    align-items: stretch;
  }
`;
const RegionControlsWrapper = styled_components_1.default.div `
  @media (min-width: 1201px) {
    margin-top: 1em;
  }
`;
const variantsInRegion = (datasetId, region) => {
    if ((0, metadata_1.isSVs)(datasetId)) {
        return react_1.default.createElement(StructuralVariantsInRegion_1.default, { datasetId: datasetId, region: region, zoomRegion: region });
    }
    if ((0, metadata_1.isV4CNVs)(datasetId)) {
        return react_1.default.createElement(CopyNumberVariantsInRegion_1.default, { datasetId: datasetId, region: region, zoomRegion: region });
    }
    if (region.chrom === 'M') {
        return (react_1.default.createElement(MitochondrialVariantsInRegion_1.default, { datasetId: datasetId, region: region, zoomRegion: region }));
    }
    return react_1.default.createElement(VariantsInRegion_1.default, { datasetId: datasetId, region: region });
};
const RegionPage = ({ datasetId, region }) => {
    const { chrom, start, stop } = region;
    const { width: windowWidth } = (0, windowSize_1.useWindowSize)();
    const isSmallScreen = windowWidth < 900;
    // Subtract 30px for padding on Page component
    const regionViewerWidth = windowWidth - 30;
    const nccToRegion = (ncc) => {
        return {
            start: ncc.start,
            stop: ncc.stop,
            z: ncc.z,
            obs_exp: ncc.oe,
        };
    };
    return (react_1.default.createElement(TrackPage_1.TrackPage, null,
        react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement(DocumentTitle_1.default, { title: `${region.chrom}-${region.start}-${region.stop} | ${(0, metadata_1.labelForDataset)(datasetId)}` }),
            react_1.default.createElement(GnomadPageHeading_1.default, { extra: react_1.default.createElement(EditRegion_1.default, { initialRegion: region, style: { marginLeft: '1em' } }), selectedDataset: datasetId, datasetOptions: {
                    includeShortVariants: true,
                    includeStructuralVariants: chrom !== 'M',
                    includeCopyNumberVariants: true,
                    includeExac: region.reference_genome === 'GRCh37' && chrom !== 'M',
                    includeGnomad2: region.reference_genome === 'GRCh37' && chrom !== 'M',
                    includeGnomad3: region.reference_genome === 'GRCh38' || chrom === 'M',
                    includeGnomad3Subsets: chrom !== 'M',
                    includeGnomad4Subsets: true,
                } }, `${region.chrom}-${region.start}-${region.stop}`),
            react_1.default.createElement(RegionInfoColumnWrapper, null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement(RegionInfo_1.default, { region: region }),
                    region.short_tandem_repeats && region.short_tandem_repeats.length > 0 && (react_1.default.createElement("p", null,
                        react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                        " Data is available for a",
                        ' ',
                        react_1.default.createElement(Link_1.default, { to: `/short-tandem-repeat/${region.short_tandem_repeats[0].id}` }, "tandem repeat locus"),
                        ' ',
                        "within this region."))),
                react_1.default.createElement(RegionControlsWrapper, null,
                    react_1.default.createElement(RegionControls_1.default, { region: region })))),
        react_1.default.createElement(RegionViewer_1.default, { leftPanelWidth: 115, regions: [region], rightPanelWidth: isSmallScreen ? 0 : 80, width: regionViewerWidth },
            region.chrom === 'M' ? (react_1.default.createElement(MitochondrialRegionCoverageTrack_1.default, { datasetId: datasetId, start: start, stop: stop })) : (react_1.default.createElement(RegionCoverageTrack_1.default, { datasetId: datasetId, chrom: chrom, includeExomeCoverage: (0, metadata_1.regionsHaveExomeCoverage)(datasetId), includeGenomeCoverage: (0, metadata_1.regionsHaveGenomeCoverage)(datasetId), start: start, stop: stop })),
            react_1.default.createElement(GenesInRegionTrack_1.default, { genes: region.genes, region: region }),
            (0, metadata_1.hasNonCodingConstraints)(datasetId) && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(RegionalGenomicConstraintTrack_1.default, { start: region.start, stop: region.stop, regions: region.non_coding_constraints !== null
                        ? region.non_coding_constraints.map(nccToRegion)
                        : null }))),
            variantsInRegion(datasetId, region))));
};
exports.default = RegionPage;
//# sourceMappingURL=RegionPage.js.map