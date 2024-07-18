"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const metadata_1 = require("../../dataset-metadata/metadata");
const Link_1 = __importDefault(require("../Link"));
const Query_1 = __importDefault(require("../Query"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const operationName = 'GeneSearch';
const geneSearchQuery = `
query ${operationName}($query: String!, $referenceGenome: ReferenceGenomeId!) {
  gene_search(query: $query, reference_genome: $referenceGenome) {
    ensembl_id
    symbol
  }
}
`;
const GeneNotFound = ({ datasetId, geneIdOrSymbol }) => {
    const isGeneId = /^ENSG\d{11}$/.test(geneIdOrSymbol.toUpperCase());
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(StatusMessage_1.default, null, "Gene not found"),
        !isGeneId && (react_1.default.createElement(Query_1.default, { operationName: operationName, query: geneSearchQuery, variables: {
                query: geneIdOrSymbol.slice(0, 2),
                referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
            }, loadingMessage: null, errorMessage: null, success: (data) => data.gene_search }, ({ data }) => {
            if (!data.gene_search.length) {
                return null;
            }
            return (react_1.default.createElement("div", { style: { textAlign: 'center' } },
                "Did you mean:",
                ' ',
                data.gene_search
                    .flatMap((gene) => [
                    ', ',
                    react_1.default.createElement(Link_1.default, { key: gene.ensembl_id, to: `/gene/${gene.ensembl_id}?dataset=${datasetId}` }, gene.symbol),
                ])
                    .slice(1)));
        }))));
};
exports.default = GeneNotFound;
//# sourceMappingURL=GeneNotFound.js.map