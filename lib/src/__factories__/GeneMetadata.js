"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fishery_1 = require("fishery");
const geneMetadataFactory = fishery_1.Factory.define(() => ({
    gene_id: 'dummy_gene',
    gene_version: '5.6.7.8',
    symbol: 'FAKEGENE',
    canonical_transcript_id: 'some-transcript',
    flags: [],
}));
exports.default = geneMetadataFactory;
//# sourceMappingURL=GeneMetadata.js.map