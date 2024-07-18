"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const metadata_1 = require("../../dataset-metadata/metadata");
const CoverageTrack_1 = __importDefault(require("../CoverageTrack"));
const Query_1 = __importDefault(require("../Query"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const operationName = 'CopyNumberVariantsCoverageInRegion';
const query = `
query ${operationName}($start: Int!, $stop: Int!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!) {
  region(chrom: $chrom, start: $start, stop: $stop, reference_genome: $referenceGenome) {
    copy_number_variants_coverage(dataset: $datasetId) {
      xpos
      percent_callable
    }
  }
}
`;
const CopyNumberVariantsRegionCoverageTrack = ({ datasetId, chrom, start, stop }) => {
    if (!(0, metadata_1.hasMitochondrialGenomeCoverage)(datasetId)) {
        return (react_1.default.createElement(StatusMessage_1.default, null,
            "Copy Number Variant exome coverage is not available in ",
            (0, metadata_1.labelForDataset)(datasetId)));
    }
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: { datasetId, chrom, start, stop, referenceGenome: (0, metadata_1.referenceGenome)(datasetId) }, loadingMessage: "Loading coverage", loadingPlaceholderHeight: 220, errorMessage: "Unable to load coverage", success: (data) => {
            return data.region && data.region.copy_number_variant_coverage;
        } }, ({ data }) => {
        const coverage = [
            {
                color: 'rgb(115, 171, 61)',
                buckets: data.region.copy_number_variant_coverage,
                name: 'copy number variant coverage', // TODO
                opacity: 0.7,
            },
        ];
        return (react_1.default.createElement(CoverageTrack_1.default, { coverageOverThresholds: [100, 1000], datasets: coverage, filenameForExport: () => `${chrom}-${start}-${stop}_coverage`, height: 190, maxCoverage: 3000, datasetId: datasetId }));
    }));
};
exports.default = CopyNumberVariantsRegionCoverageTrack;
//# sourceMappingURL=CopyNumberVariantsRegionCoverageTrack.js.map