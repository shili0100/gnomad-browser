"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnsForContext = void 0;
const react_1 = __importDefault(require("react"));
const react_highlight_words_1 = __importDefault(require("react-highlight-words"));
const Link_1 = __importDefault(require("../Link"));
const tableCells_1 = require("../tableCells");
const SampleSourceIcon_1 = __importDefault(require("../VariantList/SampleSourceIcon"));
const sortUtilities_1 = require("../VariantList/sortUtilities");
const VariantCategoryMarker_1 = __importDefault(require("../VariantList/VariantCategoryMarker"));
const structuralVariantConsequences_1 = require("./structuralVariantConsequences");
const structuralVariantTypes_1 = require("./structuralVariantTypes");
const renderConsequence = (variant, _key, { colorKey, highlightWords }) => {
    const { consequence } = variant;
    let renderedConsequence = '';
    if (consequence) {
        renderedConsequence = structuralVariantConsequences_1.svConsequenceLabels[consequence];
    }
    else if (variant.intergenic) {
        renderedConsequence = 'intergenic';
    }
    return (react_1.default.createElement(tableCells_1.Cell, null,
        consequence && colorKey === 'consequence' && (react_1.default.createElement(VariantCategoryMarker_1.default
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            color: structuralVariantConsequences_1.svConsequenceCategoryColors[structuralVariantConsequences_1.svConsequenceCategories[consequence] || 'other'] })),
        react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: renderedConsequence })));
};
const renderType = (variant, _key, { colorKey, highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
    colorKey === 'type' && (
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    react_1.default.createElement(VariantCategoryMarker_1.default, { color: structuralVariantTypes_1.svTypeColors[variant.type] || structuralVariantTypes_1.svTypeColors.OTH })),
    react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: structuralVariantTypes_1.svTypeLabels[variant.type] || variant.type })));
const structuralVariantTableColumns = [
    {
        key: 'ac',
        heading: 'Allele Count',
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('ac'),
        render: tableCells_1.renderAlleleCountCell,
    },
    {
        key: 'an',
        heading: 'Allele Number',
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('an'),
        render: tableCells_1.renderAlleleCountCell,
    },
    {
        key: 'af',
        heading: 'Allele Frequency',
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('af'),
        render: tableCells_1.renderAlleleFrequencyCell,
    },
    {
        key: 'class',
        heading: 'Class',
        minWidth: 130,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('type'),
        getSearchTerms: (variant) => [structuralVariantTypes_1.svTypeLabels[variant.type]],
        render: renderType,
    },
    {
        key: 'consequence',
        heading: 'Consequence',
        minWidth: 160,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('consequence'),
        getSearchTerms: (variant) => [structuralVariantConsequences_1.svConsequenceLabels[variant.consequence] || ''],
        render: renderConsequence,
    },
    {
        key: 'homozygote_count',
        heading: 'Number of Homozygotes',
        contextNotes: 'Not shown when viewing Y chromosome',
        minWidth: 100,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('ac_hom'),
        render: (variant) => (0, tableCells_1.renderAlleleCountCell)(variant, 'ac_hom'),
        shouldShowInContext: (context) => context.chrom !== 'Y',
    },
    {
        key: 'hemizygote_count',
        heading: 'Number of Hemizygotes',
        contextNotes: 'Only shown when viewing X or Y chromosomes',
        minWidth: 100,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('ac_hemi'),
        render: (variant) => (0, tableCells_1.renderAlleleCountCell)(variant, 'ac_hemi'),
        shouldShowInContext: (context) => context.chrom === 'X' || context.chrom === 'Y',
    },
    {
        key: 'length',
        heading: 'Size',
        minWidth: 100,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('length'),
        render: (variant) => {
            let s;
            if (variant.type === 'CTX' || variant.type === 'BND' || variant.length === -1) {
                s = '—';
            }
            else {
                const size = variant.length;
                if (size >= 1e6) {
                    s = `${(size / 1e6).toPrecision(3)} Mb`;
                }
                else if (size >= 1e3) {
                    s = `${(size / 1e3).toPrecision(3)} kb`;
                }
                else {
                    s = `${size} bp`;
                }
            }
            return react_1.default.createElement(tableCells_1.NumericCell, null, s);
        },
    },
    {
        key: 'pos',
        heading: 'Position',
        minWidth: 200,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('pos'),
        render: (variant) => {
            let position;
            if (variant.type === 'INS') {
                position = `${variant.pos}`;
            }
            else if (variant.type === 'BND' || variant.type === 'CTX') {
                // Only show pos because end == pos + 1 for BNDs and CTXs
                position = `${variant.chrom}:${variant.pos} | ${variant.chrom2}:${variant.pos2}`;
            }
            else {
                position = `${variant.pos} - ${variant.end}`;
            }
            return react_1.default.createElement(tableCells_1.Cell, null, position);
        },
    },
    {
        key: 'source',
        heading: 'Source',
        grow: 0,
        minWidth: 70,
        render: (variant) => react_1.default.createElement(SampleSourceIcon_1.default, { source: "genome", filters: variant.filters }),
    },
    {
        key: 'variant_id',
        heading: 'Variant ID',
        isRowHeader: true,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('variant_id'),
        getSearchTerms: (variant) => [variant.variant_id],
        render: (variant, _key, { highlightWords }) => (react_1.default.createElement(tableCells_1.Cell, null,
            react_1.default.createElement(Link_1.default, { target: "_blank", to: `/variant/${variant.variant_id}` },
                react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: variant.variant_id })))),
    },
];
exports.default = structuralVariantTableColumns;
const getColumnsForContext = (context) => {
    const columns = structuralVariantTableColumns
        .filter((column) => column.shouldShowInContext === undefined || column.shouldShowInContext(context))
        .reduce((acc, column) => (Object.assign(Object.assign({}, acc), { [column.key]: column })), {});
    return columns;
};
exports.getColumnsForContext = getColumnsForContext;
//# sourceMappingURL=structuralVariantTableColumns.js.map