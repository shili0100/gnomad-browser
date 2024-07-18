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
const operationName = 'TranscriptCoverage';
const coverageQuery = `
query ${operationName}($transcriptId: String!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!, $includeExomeCoverage: Boolean!, $includeGenomeCoverage: Boolean!) {
  transcript(transcript_id: $transcriptId, reference_genome: $referenceGenome) {
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
// @ts-expect-error TS(7022) FIXME: 'TranscriptCoverageTrack' implicitly has type 'any... Remove this comment to see the full error message
const TranscriptCoverageTrack = ({ datasetId, transcriptId, includeExomeCoverage, includeGenomeCoverage, }) => {
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: coverageQuery, variables: {
            transcriptId,
            datasetId: (0, metadata_1.coverageDatasetId)(datasetId),
            referenceGenome: (0, metadata_1.referenceGenome)((0, metadata_1.coverageDatasetId)(datasetId)),
            includeExomeCoverage,
            includeGenomeCoverage,
        }, loadingMessage: "Loading coverage", loadingPlaceholderHeight: 220, errorMessage: "Unable to load coverage", success: (data) => {
            if (!data.transcript || !data.transcript.coverage) {
                return false;
            }
            const exomeCoverage = includeExomeCoverage ? data.transcript.coverage.exome : true;
            const genomeCoverage = includeGenomeCoverage ? data.transcript.coverage.genome : true;
            return exomeCoverage || genomeCoverage;
        } }, ({ data }) => {
        const exomeCoverage = includeExomeCoverage ? data.transcript.coverage.exome : null;
        const genomeCoverage = includeGenomeCoverage ? data.transcript.coverage.genome : null;
        const coverageConfig = datasetId === 'exac'
            ? (0, coverageStyles_1.coverageConfigClassic)(exomeCoverage, genomeCoverage)
            : (0, coverageStyles_1.coverageConfigNew)(exomeCoverage, genomeCoverage);
        return (react_1.default.createElement(CoverageTrack_1.default, { coverageOverThresholds: [1, 5, 10, 15, 20, 25, 30, 50, 100], datasets: coverageConfig, filenameForExport: () => `${transcriptId}_coverage`, height: 190, datasetId: datasetId }));
    }));
};
TranscriptCoverageTrack.defaultProps = {
    includeExomeCoverage: true,
    includeGenomeCoverage: true,
};
exports.default = TranscriptCoverageTrack;
//# sourceMappingURL=TranscriptCoverageTrack.js.map