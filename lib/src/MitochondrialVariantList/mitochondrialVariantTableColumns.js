"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnsForContext = void 0;
const react_1 = __importDefault(require("react"));
const react_highlight_words_1 = __importDefault(require("react-highlight-words"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const tableCells_1 = require("../tableCells");
const vepConsequences_1 = require("../vepConsequences");
const SampleSourceIcon_1 = __importDefault(require("../VariantList/SampleSourceIcon"));
const sortUtilities_1 = require("../VariantList/sortUtilities");
const VariantCategoryMarker_1 = __importDefault(require("../VariantList/VariantCategoryMarker"));
const VariantFlag_1 = __importDefault(require("../VariantList/VariantFlag"));
const categoryColors = {
    lof: '#DD2C00',
    missense: 'orange',
    synonymous: '#2E7D32',
    other: '#424242',
};
const getConsequenceColor = (consequenceTerm) => {
    if (!consequenceTerm) {
        return 'gray';
    }
    const category = (0, vepConsequences_1.getCategoryFromConsequence)(consequenceTerm) || 'other';
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return categoryColors[category];
};
const getConsequenceName = (consequenceTerm) => consequenceTerm ? (0, vepConsequences_1.getLabelForConsequenceTerm)(consequenceTerm) : 'N/A';
const getConsequenceDescription = (context) => {
    switch (context) {
        case 'gene':
            return ' for most severe consequence across all transcripts for this gene';
        case 'region':
            return ' for most severe consequence across all transcripts';
        case 'transcript':
        default:
            return ' for consequence in this transcript';
    }
};
const mitochondrialVariantTableColumns = [
    {
        key: 'ac_het',
        description: 'Number of individuals with a variant at heteroplasmy level 0.10 - 0.95.',
        heading: 'Heteroplasmic Allele Count',
        grow: 0,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('ac_het'),
        render: tableCells_1.renderAlleleCountCell,
    },
    {
        key: 'ac_hom',
        heading: 'Homoplasmic Allele Count',
        tooltip: 'Number of individuals with homoplasmic or near-homoplasmic variant (heteroplasmy level ≥ 0.95).',
        grow: 0,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('ac_hom'),
        render: tableCells_1.renderAlleleCountCell,
    },
    {
        key: 'af_het',
        heading: 'Heteroplasmic Allele Frequency',
        description: 'Proportion of individuals with a variant at heteroplasmy level 0.10 - 0.95.',
        grow: 0,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('af_het'),
        render: tableCells_1.renderAlleleFrequencyCell,
    },
    {
        key: 'af_hom',
        heading: 'Homoplasmic Allele Frequency',
        tooltip: 'Proportion of individuals with homoplasmic or near-homoplasmic variant (heteroplasmy level ≥ 0.95).',
        grow: 0,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('af_hom'),
        render: tableCells_1.renderAlleleFrequencyCell,
    },
    {
        key: 'an',
        heading: 'Allele Number',
        description: 'Total number of individuals with high quality sequence at this position.',
        grow: 0,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('an'),
        render: tableCells_1.renderAlleleCountCell,
    },
    {
        key: 'clinical_significance',
        heading: 'Clinical Significance',
        description: 'ClinVar clinical significance',
        grow: 1,
        minWidth: 150,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('clinical_significance'),
        getSearchTerms: (variant) => [variant.clinical_significance],
        render: (variant, _, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: `https://www.ncbi.nlm.nih.gov/clinvar/variation/${variant.clinvar_variation_id}/` },
                react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: variant.clinical_significance || '' })))),
    },
    {
        key: 'consequence',
        heading: 'VEP Annotation',
        description: 'Variant Effect Predictor (VEP) annotation',
        descriptionInContext: (context, contextType) => `Variant Effect Predictor (VEP) annotation${getConsequenceDescription(contextType)}`,
        grow: 0,
        minWidth: 140,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('consequence'),
        getSearchTerms: (variant) => [(0, vepConsequences_1.getLabelForConsequenceTerm)(variant.consequence)],
        render: (row, key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(VariantCategoryMarker_1.default, { color: getConsequenceColor(row[key]) }),
            react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: getConsequenceName(row[key]) }))),
    },
    {
        key: 'flags',
        heading: 'Flags',
        description: 'Flags that may affect annotation and/or confidence',
        grow: 0,
        minWidth: 140,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)((variant) => variant.flags.length || null),
        render: (row, key) => row[key].map((flag) => react_1.default.createElement(VariantFlag_1.default, { key: flag, type: flag, variant: row })),
    },
    {
        key: 'gene',
        heading: 'Gene',
        description: 'Gene in which variant has the most severe consequence',
        contextNotes: 'Only shown when viewing a region',
        minWidth: 100,
        render: (row) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(Link_1.default, { to: `/gene/${row.gene_id}` }, row.gene_symbol || row.gene_id))),
        shouldShowInContext: (context, contextType) => contextType === 'region',
    },
    {
        key: 'hgvs',
        heading: 'HGVS Consequence',
        description: 'HGVS protein sequence (where defined) or coding sequence',
        descriptionInContext: (context, contextType) => `HGVS protein sequence (where defined) or coding sequence${getConsequenceDescription(contextType)}`,
        grow: 1,
        minWidth: 160,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('hgvs'),
        getSearchTerms: (variant) => [variant.hgvsp || variant.hgvsc],
        render: (variant, key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: variant.hgvsp || variant.hgvsc || '' }))),
    },
    {
        key: 'hgvsc',
        heading: 'HGVSc Consequence',
        description: 'HGVS coding sequence',
        descriptionInContext: (context, contextType) => `HGVS coding sequence${getConsequenceDescription(contextType)}`,
        grow: 1,
        minWidth: 160,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('hgvsc'),
        getSearchTerms: (variant) => [variant.hgvsc],
        render: (variant, key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: variant.hgvsc || '' }))),
    },
    {
        key: 'hgvsp',
        heading: 'HGVSp Consequence',
        description: 'HGVS protein sequence',
        descriptionInContext: (context, contextType) => `HGVS protein sequence${getConsequenceDescription(contextType)}`,
        grow: 1,
        minWidth: 160,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('hgvsp'),
        getSearchTerms: (variant) => [variant.hgvsp],
        render: (variant, key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: variant.hgvsp || '' }))),
    },
    {
        key: 'max_heteroplasmy',
        heading: 'Max observed heteroplasmy',
        description: 'Maximum heteroplasmy level observed across all individuals (range 0.10 - 1.00).',
        grow: 0,
        minWidth: 120,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('max_heteroplasmy'),
        render: (row, key) => react_1.default.createElement(tableCells_1.NumericCell, null, row[key]),
    },
    {
        key: 'source',
        heading: 'Source',
        description: 'Quality control filters',
        grow: 0,
        minWidth: 100,
        render: (variant) => react_1.default.createElement(SampleSourceIcon_1.default, { source: "genome", filters: variant.filters }),
    },
    {
        key: 'variant_id',
        heading: 'Variant ID',
        description: 'Chromosome-position-reference-alternate',
        grow: 1,
        isRowHeader: true,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('pos'),
        getSearchTerms: (variant) => [variant.variant_id],
        render: (variant, key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(Link_1.default, { target: "_blank", to: `/variant/${variant.variant_id}` },
                react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: variant.variant_id })))),
    },
];
exports.default = mitochondrialVariantTableColumns;
const getContextType = (context) => {
    if (context.transcript_id) {
        return 'transcript';
    }
    if (context.gene_id) {
        return 'gene';
    }
    return 'region';
};
const getColumnsForContext = (context) => {
    const contextType = getContextType(context);
    return mitochondrialVariantTableColumns
        .filter((column) => column.shouldShowInContext === undefined || column.shouldShowInContext(context, contextType))
        .map((column) => (Object.assign(Object.assign({}, column), { description: column.descriptionInContext
            ? column.descriptionInContext(context, contextType)
            : column.description })))
        .reduce((acc, column) => (Object.assign(Object.assign({}, acc), { [column.key]: column })), {});
};
exports.getColumnsForContext = getColumnsForContext;
//# sourceMappingURL=mitochondrialVariantTableColumns.js.map