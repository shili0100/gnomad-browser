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
const copyNumberVariantTypes_1 = require("./copyNumberVariantTypes");
const renderType = (variant, _, { colorKey, highlightWords }) => {
    return (react_1.default.createElement(tableCells_1.Cell, null,
        colorKey === 'type' && (
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        react_1.default.createElement(VariantCategoryMarker_1.default, { color: copyNumberVariantTypes_1.cnvTypeColors[variant.type] })),
        react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, 
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            textToHighlight: copyNumberVariantTypes_1.cnvTypeLabels[variant.type] || variant.type })));
};
const copyNumberVariantTableColumns = [
    {
        key: 'sc',
        heading: 'Site Count',
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('sc'),
        render: tableCells_1.renderAlleleCountCell,
    },
    {
        key: 'sn',
        heading: 'Site Number',
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('sn'),
        render: tableCells_1.renderAlleleCountCell,
    },
    {
        key: 'sf',
        heading: 'Site Frequency',
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('sf'),
        render: tableCells_1.renderAlleleFrequencyCell,
        shouldShowInContext: (context) => context.chrom !== 'Y',
    },
    {
        key: 'class',
        heading: 'Class',
        minWidth: 130,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('type'),
        getSearchTerms: (variant) => {
            const variantType = variant.type;
            if (variantType === 'DEL') {
                return 'deletion';
            }
            return 'duplication';
        },
        render: renderType,
    },
    {
        key: 'length',
        heading: 'Size',
        minWidth: 100,
        compareFunction: (0, sortUtilities_1.makeNumericCompareFunction)('length'),
        render: (variant) => {
            let s;
            if (variant.length === -1) {
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
            const position = `${variant.chrom}:${variant.pos} - ${variant.end}`;
            return react_1.default.createElement(tableCells_1.Cell, null, position);
        },
    },
    {
        key: 'source',
        heading: 'Source',
        grow: 0,
        minWidth: 70,
        render: (variant) => react_1.default.createElement(SampleSourceIcon_1.default, { source: "exome", filters: variant.filters }),
    },
    {
        key: 'variant_id',
        heading: 'Variant ID',
        isRowHeader: true,
        minWidth: 110,
        compareFunction: (0, sortUtilities_1.makeStringCompareFunction)('variant_id'),
        getSearchTerms: (variant) => [variant.variant_id],
        render: (variant, _, { highlightWords }) => {
            return (react_1.default.createElement(tableCells_1.Cell, null,
                react_1.default.createElement(Link_1.default, { target: "_blank", to: `/variant/${variant.variant_id}` },
                    react_1.default.createElement(react_highlight_words_1.default, { autoEscape: true, searchWords: highlightWords, textToHighlight: variant.variant_id }))));
        },
    },
];
exports.default = copyNumberVariantTableColumns;
const getColumnsForContext = (context) => {
    const columns = copyNumberVariantTableColumns
        .filter((column) => column.shouldShowInContext === undefined || column.shouldShowInContext(context))
        .reduce((acc, column) => (Object.assign(Object.assign({}, acc), { [column.key]: column })), {});
    return columns;
};
exports.getColumnsForContext = getColumnsForContext;
//# sourceMappingURL=copyNumberVariantTableColumns.js.map