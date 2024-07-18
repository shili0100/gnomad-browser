"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLAGS_CONFIG = void 0;
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
exports.FLAGS_CONFIG = {
    lcr: {
        label: 'LCR',
        level: 'info',
        formatTooltip: () => 'Found in a low complexity region\nVariant annotation or quality dubious',
    },
    lc_lof: {
        label: 'LC pLoF',
        level: 'error',
        formatTooltip: (variant) => `Low-confidence pLoF: ${variant.lof_filter}\nVariant annotation or quality dubious`,
    },
    lof_flag: {
        label: 'pLoF flag',
        level: 'warning',
        formatTooltip: (variant) => `Flagged by LOFTEE: ${variant.lof_flags}\nVariant annotation or quality dubious`,
    },
    nc_transcript: {
        label: 'NC Transcript',
        level: 'error',
        formatTooltip: () => 'Non-protein-coding transcript\nVariant annotation dubious',
    },
    os_lof: {
        label: 'OS pLoF',
        level: 'info',
        formatTooltip: () => 'Other Splice Predicted Loss-of-Function: this variant is predicted to create or disrupt a splice site outside the canonical splice site (beta)',
    },
    mnv: {
        label: 'MNV',
        level: 'error',
        formatTooltip: () => 'Multi-nucleotide variant: this variant is found in phase with another variant in some individuals, altering the amino acid sequence\nVariant annotation dubious',
    },
    monoallelic: {
        label: 'Monoallelic',
        level: 'info',
        formatTooltip: () => 'All samples are homozygous alternate for the variant',
    },
    // Mitochondrial variants
    common_low_heteroplasmy: {
        label: 'Common Low Heteroplasmy',
        level: 'warning',
        formatTooltip: () => 'Variant is present at an overall frequency of .001 across all samples with a heteroplasmy level > 0 and < 0.50',
    },
};
const VariantFlag = ({ type, variant }) => {
    if (type in exports.FLAGS_CONFIG) {
        const { label, level, formatTooltip } = exports.FLAGS_CONFIG[type];
        return (react_1.default.createElement(ui_1.Badge, { level: level, tooltip: formatTooltip(variant) }, label));
    }
    return null;
};
exports.default = VariantFlag;
//# sourceMappingURL=VariantFlag.js.map