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
const react_1 = __importDefault(require("react"));
const metadata_1 = require("../../dataset-metadata/metadata");
const CoverageTrack_1 = __importStar(require("../CoverageTrack"));
const Query_1 = __importDefault(require("../Query"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const operationName = 'MitochondrialCoverageInGene';
const query = `
query ${operationName}($geneId: String!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!) {
  gene(gene_id: $geneId, reference_genome: $referenceGenome) {
    mitochondrial_coverage(dataset: $datasetId) {
      pos
      mean
      median
      over_100
      over_1000
    }
  }
}
`;
const MitochondrialGeneCoverageTrack = ({ datasetId, geneId }) => {
    if (!(0, metadata_1.hasMitochondrialGenomeCoverage)(datasetId)) {
        return (react_1.default.createElement(StatusMessage_1.default, null,
            "Mitochondrial genome coverage is not available in ",
            (0, metadata_1.labelForDataset)(datasetId)));
    }
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: { geneId, datasetId, referenceGenome: (0, metadata_1.referenceGenome)(datasetId) }, loadingMessage: "Loading coverage", loadingPlaceholderHeight: 220, errorMessage: "Unable to load coverage", success: (data) => data.gene && data.gene.mitochondrial_coverage }, ({ data }) => {
        const coverage = [
            {
                color: 'rgb(115, 171, 61)',
                buckets: data.gene.mitochondrial_coverage,
                name: 'mitochondrial genome',
                opacity: 0.7,
            },
        ];
        return (react_1.default.createElement(CoverageTrack_1.default, { coverageOverThresholds: [100, 1000], datasets: coverage, filenameForExport: () => `${geneId}_coverage`, height: 190, maxCoverage: 3000, datasetId: datasetId, metric: CoverageTrack_1.MetricOptions.mean }));
    }));
};
exports.default = MitochondrialGeneCoverageTrack;
//# sourceMappingURL=MitochondrialGeneCoverageTrack.js.map