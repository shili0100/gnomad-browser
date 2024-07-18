"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const metadata_1 = require("../../dataset-metadata/metadata");
const Link_1 = __importDefault(require("../Link"));
const MNVSummaryList_1 = __importDefault(require("../MNVPage/MNVSummaryList"));
const VariantLiftover_1 = __importDefault(require("./VariantLiftover"));
const CODING_AND_UTR_VEP_CONSEQUENCES = new Set([
    'transcript_ablation',
    'splice_acceptor_variant',
    'splice_donor_variant',
    'stop_gained',
    'frameshift_variant',
    'stop_lost',
    'start_lost',
    'initiator_codon_variant',
    'transcript_amplification',
    'inframe_insertion',
    'inframe_deletion',
    'missense_variant',
    'protein_altering_variant',
    'splice_region_variant',
    'incomplete_terminal_codon_variant',
    'start_retained_variant',
    'stop_retained_variant',
    'synonymous_variant',
    'coding_sequence_variant',
    'mature_miRNA_variant',
    '5_prime_UTR_variant',
    '3_prime_UTR_variant',
]);
const isVariantEligibleForCooccurrence = (variant, datasetId) => {
    if ((0, metadata_1.hasRelatedVariants)(datasetId)) {
        return false;
    }
    const exomeAC = ((variant.exome || {}).ac || 0) / ((variant.exome || {}).an || 1);
    return (exomeAC <= 0.05 &&
        !!variant.transcript_consequences &&
        variant.transcript_consequences.some((csq) => CODING_AND_UTR_VEP_CONSEQUENCES.has(csq.major_consequence)));
};
const Wrapper = styled_components_1.default.div `
  columns: 2;
  column-gap: 30px;

  @media (max-width: 992px) {
    columns: 1;
  }
`;
const Item = styled_components_1.default.div `
  break-inside: avoid;

  h3 {
    margin-top: 0;
  }
`;
const getLocusWindow = ({ chrom, pos }, range = 20) => {
    const start = Math.max(1, pos - range);
    const stop = pos + range;
    return `${chrom}-${start}-${stop}`;
};
const VariantRelatedVariants = ({ datasetId, variant }) => {
    return (react_1.default.createElement(Wrapper, null,
        variant.colocated_variants && variant.colocated_variants.length > 0 && (react_1.default.createElement(Item, null,
            react_1.default.createElement("h3", null, "Other Alternate Alleles"),
            react_1.default.createElement("p", null, "This variant is multiallelic. Other alternate alleles are:"),
            react_1.default.createElement("ul", null, variant.colocated_variants.map((colocatedVariantId) => (react_1.default.createElement("li", { key: colocatedVariantId },
                react_1.default.createElement(Link_1.default, { to: `/variant/${colocatedVariantId}` }, colocatedVariantId))))))),
        (variant.multi_nucleotide_variants || []).length > 0 && (react_1.default.createElement(Item, null,
            react_1.default.createElement("h3", null, "Multi-nucleotide Variants"),
            react_1.default.createElement("p", null, "This variant's consequence may be affected by other variants:"),
            react_1.default.createElement(MNVSummaryList_1.default, { multiNucleotideVariants: variant.multi_nucleotide_variants }))),
        (variant.liftover || variant.liftover_sources || []).length > 0 && (react_1.default.createElement(Item, null,
            react_1.default.createElement("h3", null, "Liftover"),
            react_1.default.createElement(VariantLiftover_1.default, { variant: variant }))),
        isVariantEligibleForCooccurrence(variant, datasetId) && (react_1.default.createElement(Item, null,
            react_1.default.createElement("h3", null, "Variant Co-occurrence"),
            react_1.default.createElement("p", null,
                react_1.default.createElement(Link_1.default, { to: {
                        pathname: '/variant-cooccurrence',
                        search: `variant=${variant.variant_id}`,
                    } }, "Check if this variant occurs on the same haplotype as another variant.")))),
        react_1.default.createElement(Item, null,
            react_1.default.createElement("h3", null, "Nearby Variants"),
            react_1.default.createElement("p", null,
                react_1.default.createElement(Link_1.default, { to: `/region/${getLocusWindow(variant, 20)}` }, "View variants located within 20 bases of this variant.")))));
};
exports.default = VariantRelatedVariants;
//# sourceMappingURL=VariantRelatedVariants.js.map