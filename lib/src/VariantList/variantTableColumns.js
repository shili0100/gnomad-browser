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
const SampleSourceIcon_1 = __importDefault(require("./SampleSourceIcon"));
const sortUtilities_1 = require("./sortUtilities");
const VariantCategoryMarker_1 = __importDefault(require("./VariantCategoryMarker"));
const VariantFlag_1 = __importDefault(require("./VariantFlag"));
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
const getConsequenceDescription = (contextType) => {
    switch (contextType) {
        case 'gene':
            return ' for most severe consequence across all transcripts for this gene';
        case 'region':
            return ' for most severe consequence across all transcripts';
        case 'transcript':
        default:
            return ' for consequence in this transcript';
    }
};
const variantTableColumns = [
    {
        key: 'ac',
        heading: 'Allele Count',
        description: 'Alternate allele count in high quality genotypes',
        grow: 0,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('ac'),
        render: tableCells_1.renderAlleleCountCell,
    },
    {
        key: 'an',
        heading: 'Allele Number',
        description: 'Total number of called high quality genotypes',
        grow: 0,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('an'),
        render: tableCells_1.renderAlleleCountCell,
    },
    {
        key: 'af',
        heading: 'Allele Frequency',
        description: 'Alternate allele frequency in high quality genotypes',
        grow: 0,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('af'),
        render: tableCells_1.renderAlleleFrequencyCell,
    },
    {
        key: 'base_level_pext',
        heading: 'pext',
        description: 'Base-level pext score',
        contextNotes: 'Only shown when viewing a gene',
        minWidth: 80,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('base_level_pext'),
        render: (variant) => (react_1.default.createElement(tableCells_1.NumericCell, null, variant.base_level_pext != null &&
            variant.base_level_pext.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }))),
        shouldShowInContext: (context, contextType) => contextType === 'gene',
    },
    {
        key: 'clinical_significance',
        heading: 'Clinical Significance',
        description: 'ClinVar clinical significance',
        grow: 1,
        minWidth: 150,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('clinical_significance'),
        getSearchTerms: (variant) => variant.clinical_significance,
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
        render: (row, key) => row[key]
            .filter((flag) => flag !== 'segdup' && flag !== 'par')
            .map((flag) => react_1.default.createElement(VariantFlag_1.default, { key: flag, type: flag, variant: row })),
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
        key: 'hemizygote_count',
        heading: 'Number of Hemizygotes',
        description: 'Number of individuals hemizygous for alternate allele',
        contextNotes: 'Only shown when viewing X or Y chromosomes',
        grow: 0,
        minWidth: 100,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('ac_hemi'),
        render: (variant) => (0, tableCells_1.renderAlleleCountCell)(variant, 'ac_hemi'),
        shouldShowInContext: (context) => context.chrom === 'X' || context.chrom === 'Y',
    },
    {
        key: 'hgvs',
        heading: 'HGVS Consequence',
        description: 'HGVS protein sequence (where defined) or coding sequence',
        descriptionInContext: (context, contextType) => `HGVS protein sequence (where defined) or coding sequence${getConsequenceDescription(contextType)}`,
        grow: 1,
        minWidth: 160,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('hgvs'),
        getSearchTerms: (variant) => [variant.hgvs],
        render: (variant, key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: variant.hgvs || '' }))),
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
        key: 'homozygote_count',
        heading: 'Number of Homozygotes',
        description: 'Number of individuals homozygous for alternate allele',
        contextNotes: 'Not shown when viewing Y chromosome',
        grow: 0,
        minWidth: 100,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('ac_hom'),
        render: (variant) => (0, tableCells_1.renderAlleleCountCell)(variant, 'ac_hom'),
        shouldShowInContext: (context) => context.chrom !== 'Y',
    },
    {
        key: 'lof_curation',
        heading: 'LoF Curation',
        description: 'Results of manual curation of pLoF variants',
        contextNotes: 'Not shown when viewing a transcript',
        minWidth: 100,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)((row) => (row.lof_curation || {}).verdict),
        render: (row) => {
            if (!row.lof_curation) {
                return null;
            }
            const { verdict, flags = [] } = row.lof_curation;
            let content;
            if (flags.length) {
                const tooltip = `This variant was curated as "${verdict}". The following factors contributed to this verdict: ${flags.join(', ')}. See variant page for details.`;
                content = (
                // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: string; }' is ... Remove this comment to see the full error message
                react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: tooltip },
                    react_1.default.createElement(ui_1.TooltipHint, null, verdict)));
            }
            else {
                content = verdict;
            }
            return react_1.default.createElement(tableCells_1.Cell, null, content);
        },
        shouldShowInContext: (context, contextType) => contextType === 'gene' || contextType === 'region',
    },
    {
        key: 'rsid',
        heading: 'rsIDs',
        description: 'dbSNP rsIDs',
        grow: 1,
        minWidth: 160,
        compareFunction: (0, sortUtilities_1.makeCompareFunction)('rsids', (rsids1, rsids2) => rsids1[0].localeCompare(rsids2[0])),
        getSearchTerms: (variant) => variant.rsids || [],
        render: (variant, key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: (variant.rsids || []).join(', ') }))),
    },
    {
        key: 'source',
        heading: 'Source',
        description: 'Sample set and quality control filters',
        grow: 0,
        minWidth: 100,
        render: (variant) => (react_1.default.createElement(react_1.default.Fragment, null,
            variant.exome && react_1.default.createElement(SampleSourceIcon_1.default, { source: "exome", filters: variant.exome.filters }),
            variant.genome && react_1.default.createElement(SampleSourceIcon_1.default, { source: "genome", filters: variant.genome.filters }))),
    },
    {
        key: 'transcript_id',
        heading: 'Transcript',
        description: 'Transcript in which the displayed consequence occurs',
        contextNotes: 'Not shown when viewing a transcript',
        grow: 0,
        minWidth: 160,
        render: (row) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(Link_1.default, { to: `/transcript/${row.transcript_id}` },
                row.transcript_id,
                ".",
                row.transcript_version))),
        shouldShowInContext: (context, contextType) => contextType !== 'transcript',
    },
    {
        key: 'variant_id',
        heading: 'Variant ID',
        description: 'Chromosome-position-reference-alternate',
        isRowHeader: true,
        minWidth: 150,
        grow: 1,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('pos'),
        getSearchTerms: (variant) => [variant.variant_id].concat(variant.rsids || []),
        render: (row, key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(Link_1.default, { target: "_blank", to: `/variant/${row.variant_id}` },
                react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: row.variant_id })))),
    },
];
exports.default = variantTableColumns;
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
    const columns = variantTableColumns
        .filter((column) => column.shouldShowInContext === undefined || column.shouldShowInContext(context, contextType))
        .map((column) => (Object.assign(Object.assign({}, column), { description: column.descriptionInContext
            ? column.descriptionInContext(context, contextType)
            : column.description })))
        .reduce((acc, column) => (Object.assign(Object.assign({}, acc), { [column.key]: column })), {});
    if (contextType === 'gene') {
        const primaryTranscriptId = context.mane_select_transcript
            ? context.mane_select_transcript.ensembl_id
            : context.canonical_transcript_id;
        // @ts-expect-error TS(2339) Property 'hgvs' does not exist on type '{}'.
        columns.hgvs.render = (variant, key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: variant.hgvs || '' }),
            primaryTranscriptId && variant.transcript_id !== primaryTranscriptId && ' †'));
    }
    return columns;
};
exports.getColumnsForContext = getColumnsForContext;
//# sourceMappingURL=variantTableColumns.js.map