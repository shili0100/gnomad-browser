"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const vepConsequences_1 = require("./vepConsequences");
(0, globals_1.describe)('getConsequenceFromCategory', () => {
    (0, globals_1.it)('should return correct category for VEP consequence terms', () => {
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('transcript_ablation')).toBe('lof');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('splice_acceptor_variant')).toBe('lof');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('splice_donor_variant')).toBe('lof');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('stop_gained')).toBe('lof');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('frameshift_variant')).toBe('lof');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('stop_lost')).toBe('missense');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('start_lost')).toBe('missense');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('inframe_insertion')).toBe('missense');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('inframe_deletion')).toBe('missense');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('missense_variant')).toBe('missense');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('protein_altering_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('incomplete_terminal_codon_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('stop_retained_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('synonymous_variant')).toBe('synonymous');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('coding_sequence_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('mature_miRNA_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('5_prime_UTR_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('3_prime_UTR_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('non_coding_transcript_exon_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('non_coding_exon_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('NMD_transcript_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('non_coding_transcript_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('nc_transcript_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('downstream_gene_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('TFBS_ablation')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('TFBS_amplification')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('TF_binding_site_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('regulatory_region_ablation')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('regulatory_region_amplification')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('feature_elongation')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('regulatory_region_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('feature_truncation')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('intergenic_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('intron_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('splice_region_variant')).toBe('other');
        (0, globals_1.expect)((0, vepConsequences_1.getCategoryFromConsequence)('upstream_gene_variant')).toBe('other');
    });
});
//# sourceMappingURL=vepConsequences.spec.js.map