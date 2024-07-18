"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const metadata_1 = require("../../dataset-metadata/metadata");
const coverageStyles_1 = require("../coverageStyles");
const CoverageTrack_1 = __importDefault(require("../CoverageTrack"));
const Query_1 = __importDefault(require("../Query"));
const operationName = 'RegionCoverage';
const coverageQuery = `
query ${operationName}($chrom: String!, $start: Int!, $stop: Int!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!, $includeExomeCoverage: Boolean!, $includeGenomeCoverage: Boolean!) {
  region(chrom: $chrom, start: $start, stop: $stop, reference_genome: $referenceGenome) {
    coverage(dataset: $datasetId) {
      exome @include(if: $includeExomeCoverage) {
        pos
        mean
        median
        over_1
        over_5
        over_10
        over_15
        over_20
        over_25
        over_30
        over_50
        over_100
      }
      genome @include(if: $includeGenomeCoverage) {
        pos
        mean
        median
        over_1
        over_5
        over_10
        over_15
        over_20
        over_25
        over_30
        over_50
        over_100
      }
    }
  }
}
`;
// @ts-expect-error TS(7022) FIXME: 'RegionCoverageTrack' implicitly has type 'any' be... Remove this comment to see the full error message
const RegionCoverageTrack = ({ datasetId, chrom, start, stop, includeExomeCoverage, includeGenomeCoverage, }) => {
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: coverageQuery, variables: {
            chrom,
            start,
            stop,
            datasetId: (0, metadata_1.coverageDatasetId)(datasetId),
            referenceGenome: (0, metadata_1.referenceGenome)((0, metadata_1.coverageDatasetId)(datasetId)),
            includeExomeCoverage,
            includeGenomeCoverage,
        }, loadingMessage: "Loading coverage", loadingPlaceholderHeight: 220, errorMessage: "Unable to load coverage", success: (data) => {
            if (!data.region || !data.region.coverage) {
                return false;
            }
            const exomeCoverage = includeExomeCoverage ? data.region.coverage.exome : true;
            const genomeCoverage = includeGenomeCoverage ? data.region.coverage.genome : true;
            return exomeCoverage || genomeCoverage;
        } }, ({ data }) => {
        const exomeCoverage = includeExomeCoverage ? data.region.coverage.exome : null;
        const genomeCoverage = includeGenomeCoverage ? data.region.coverage.genome : null;
        const coverageConfig = datasetId === 'exac'
            ? (0, coverageStyles_1.coverageConfigClassic)(exomeCoverage, genomeCoverage)
            : (0, coverageStyles_1.coverageConfigNew)(exomeCoverage, genomeCoverage);
        return (react_1.default.createElement(CoverageTrack_1.default, { coverageOverThresholds: [1, 5, 10, 15, 20, 25, 30, 50, 100], filenameForExport: () => `${chrom}-${start}-${stop}_coverage`, datasets: coverageConfig, height: 200, datasetId: datasetId }));
    }));
};
RegionCoverageTrack.defaultProps = {
    includeExomeCoverage: true,
    includeGenomeCoverage: true,
};
exports.default = RegionCoverageTrack;
//# sourceMappingURL=RegionCoverageTrack.js.map