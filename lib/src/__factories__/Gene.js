"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fishery_1 = require("fishery");
const Transcript_1 = __importDefault(require("./Transcript"));
const VariantCooccurrenceCountsPerSeverityAndAf_1 = require("./VariantCooccurrenceCountsPerSeverityAndAf");
const geneFactory = fishery_1.Factory.define(({ params, associations }) => {
    const { gene_id = 'dummy_gene-1', gene_version = '5.6.7.8', symbol = 'FAKEGENE', canonical_transcript_id = 'transcript-999', flags = [], reference_genome = 'GRCh37', chrom = '13', strand = '+', start = 123, stop = 321, variants = [], structural_variants = [], clinvar_variants = [], copy_number_variants = [], } = params;
    const heterozygous_variant_cooccurrence_counts = associations.heterozygous_variant_cooccurrence_counts ||
        VariantCooccurrenceCountsPerSeverityAndAf_1.HeterozygousVariantCooccurrenceCountsPerSeverityAndAfFactory.build();
    const homozygous_variant_cooccurrence_counts = associations.homozygous_variant_cooccurrence_counts ||
        VariantCooccurrenceCountsPerSeverityAndAf_1.HomozygousVariantCooccurrenceCountsPerSeverityAndAfFactory.build();
    const metadata = { gene_id, gene_version, symbol, canonical_transcript_id, flags };
    const transcripts = canonical_transcript_id !== null
        ? [
            Transcript_1.default.build({
                transcript_id: canonical_transcript_id,
                reference_genome,
                chrom,
                strand,
                start,
                stop,
            }, { transient: metadata }),
        ]
        : [];
    return {
        gene_id,
        gene_version,
        canonical_transcript_id,
        symbol,
        flags,
        reference_genome,
        chrom,
        strand,
        start,
        stop,
        transcripts,
        exons: [],
        heterozygous_variant_cooccurrence_counts,
        homozygous_variant_cooccurrence_counts,
        variants,
        structural_variants,
        clinvar_variants,
        copy_number_variants,
    };
});
exports.default = geneFactory;
//# sourceMappingURL=Gene.js.map