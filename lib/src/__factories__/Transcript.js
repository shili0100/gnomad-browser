"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fishery_1 = require("fishery");
const GeneMetadata_1 = __importDefault(require("./GeneMetadata"));
const TissueExpression_1 = require("./TissueExpression");
const transcriptFactory = fishery_1.Factory.define(({ params, associations }) => {
    const { transcript_id = 'dummy_transcript', transcript_version = '12.34.5', reference_genome = 'GRCh37', chrom = '13', strand = '+', start = 123, stop = 321, } = params;
    const { exons = [], gene = GeneMetadata_1.default.build(), gtex_tissue_expression = TissueExpression_1.gtexTissueExpressionFactory.build(), gnomad_constraint = null, exac_constraint = null, variants = [], clinvar_variants = [], mitochondrial_variants = [], } = associations;
    return {
        transcript_id,
        transcript_version,
        reference_genome,
        chrom,
        strand,
        start,
        stop,
        exons,
        gene,
        gtex_tissue_expression,
        gnomad_constraint,
        exac_constraint,
        variants,
        mitochondrial_variants,
        clinvar_variants,
    };
});
exports.default = transcriptFactory;
//# sourceMappingURL=Transcript.js.map