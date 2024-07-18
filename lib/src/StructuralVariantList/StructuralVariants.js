"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const ui_1 = require("@gnomad/ui");
const Notifications_1 = require("../Notifications");
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const TrackPage_1 = require("../TrackPage");
const userPreferences_1 = __importDefault(require("../userPreferences"));
const VariantTableConfigurationModal_1 = __importDefault(require("../VariantList/VariantTableConfigurationModal"));
const ExportStructuralVariantsButton_1 = __importDefault(require("./ExportStructuralVariantsButton"));
const filterStructuralVariants_1 = __importDefault(require("./filterStructuralVariants"));
const structuralVariantConsequences_1 = require("./structuralVariantConsequences");
const structuralVariantTypes_1 = require("./structuralVariantTypes");
const StructuralVariantFilterControls_1 = __importDefault(require("./StructuralVariantFilterControls"));
const structuralVariantTableColumns_1 = __importStar(require("./structuralVariantTableColumns"));
const StructuralVariantsTable_1 = __importDefault(require("./StructuralVariantsTable"));
const StructuralVariantTracks_1 = __importDefault(require("./StructuralVariantTracks"));
const NUM_ROWS_RENDERED = 20;
const TRACK_HEIGHT = 14;
const TABLE_ROW_HEIGHT = 25;
const Wrapper = styled_components_1.default.div `
  margin-bottom: 1em;
`;
const ControlWrapper = (0, styled_components_1.default)(Wrapper) `
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (min-width: 900px) {
    margin-right: 160px;
  }
`;
const HUMAN_CHROMOSOMES = [...Array.from(new Array(22), (_x, i) => `${i + 1}`), 'X', 'Y'];
const DEFAULT_COLUMNS = [
    'source',
    'consequence',
    'class',
    'pos',
    'length',
    'ac',
    'an',
    'af',
    'homozygote_count',
    'hemizygote_count',
];
const sortVariants = (variants, { sortKey, sortOrder }) => {
    const sortColumn = structuralVariantTableColumns_1.default.find((column) => column.key === sortKey);
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    return [...variants].sort((v1, v2) => sortColumn.compareFunction(v1, v2, sortOrder));
};
const StructuralVariants = ({ context, exportFileName, variants }) => {
    const table = (0, react_1.useRef)(null);
    const tracks = (0, react_1.useRef)(null);
    const [selectedColumns, setSelectedColumns] = (0, react_1.useState)(() => {
        try {
            return userPreferences_1.default.getPreference('structuralVariantTableColumns') || DEFAULT_COLUMNS;
        }
        catch (error) {
            return DEFAULT_COLUMNS;
        }
    });
    const renderedTableColumns = (0, react_1.useMemo)(() => {
        const columnsForContext = (0, structuralVariantTableColumns_1.getColumnsForContext)(context);
        return (['variant_id', ...selectedColumns]
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            .map((columnKey) => columnsForContext[columnKey])
            .filter(Boolean)
            .map((column) => (Object.assign(Object.assign({}, column), { isSortable: Boolean(column.compareFunction), tooltip: column.description }))));
    }, [context, selectedColumns]);
    const [filter, setFilter] = (0, react_1.useState)({
        includeConsequenceCategories: {
            lof: true,
            dup_lof: true,
            copy_gain: true,
            other: true,
        },
        includeTypes: {
            DEL: true,
            DUP: true,
            MCNV: true,
            INS: true,
            INV: true,
            CPX: true,
            OTH: true,
        },
        includeFilteredVariants: false,
        searchText: '',
    });
    const [sortState, setSortState] = (0, react_1.useState)({
        sortKey: 'variant_id',
        sortOrder: 'ascending',
    });
    const { sortKey, sortOrder } = sortState;
    const setSortKey = (0, react_1.useCallback)((newSortKey) => {
        setSortState((prevSortState) => {
            if (newSortKey === prevSortState.sortKey) {
                return {
                    sortKey: newSortKey,
                    sortOrder: prevSortState.sortOrder === 'ascending' ? 'descending' : 'ascending',
                };
            }
            return {
                sortKey: newSortKey,
                sortOrder: 'descending',
            };
        });
    }, []);
    const filteredVariants = (0, react_1.useMemo)(() => (0, filterStructuralVariants_1.default)(variants, filter, renderedTableColumns), [variants, filter, renderedTableColumns]);
    const renderedVariants = (0, react_1.useMemo)(() => sortVariants(filteredVariants, sortState), [filteredVariants, sortState]);
    const [showTableConfigurationModal, setShowTableConfigurationModal] = (0, react_1.useState)(false);
    const [variantHoveredInTable, setVariantHoveredInTable] = (0, react_1.useState)(null);
    const [variantHoveredInTrack, setVariantHoveredInTrack] = (0, react_1.useState)(null);
    const shouldHighlightTableRow = (0, react_1.useCallback)((variant) => {
        return variant.variant_id === variantHoveredInTrack;
    }, [variantHoveredInTrack]);
    const onScrollTable = (0, react_1.useCallback)(({ scrollOffset, scrollUpdateWasRequested }) => {
        if (tracks.current && !scrollUpdateWasRequested) {
            ;
            tracks.current.scrollTo(Math.round(scrollOffset * (TRACK_HEIGHT / TABLE_ROW_HEIGHT)));
        }
    }, []);
    const onScrollTracks = (0, react_1.useCallback)(({ scrollOffset, scrollUpdateWasRequested }) => {
        if (table.current && !scrollUpdateWasRequested) {
            ;
            table.current.scrollTo(Math.round(scrollOffset * (TABLE_ROW_HEIGHT / TRACK_HEIGHT)));
        }
    }, []);
    const [colorKey, setColorKey] = (0, react_1.useState)('type');
    const trackColor = (0, react_1.useCallback)((variant) => {
        if (colorKey === 'type') {
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            return structuralVariantTypes_1.svTypeColors[variant.type] || structuralVariantTypes_1.svTypeColors.OTH;
        }
        return variant.consequence
            ? // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                structuralVariantConsequences_1.svConsequenceCategoryColors[structuralVariantConsequences_1.svConsequenceCategories[variant.consequence]]
            : structuralVariantConsequences_1.svConsequenceCategoryColors.other;
    }, [colorKey]);
    if (variants.length === 0) {
        return react_1.default.createElement(StatusMessage_1.default, null, "No variants found");
    }
    const numRowsRendered = Math.min(renderedVariants.length, NUM_ROWS_RENDERED);
    // pos/end and pos2/end2 coordinates are based on the chromosome which they are located on.
    // If that chromosome is not the same as the one that the region viewer's coordinates
    // are based on, then offset the positions so that they are based on the
    // region viewer's coordinate system.
    const currentChromIndex = HUMAN_CHROMOSOMES.indexOf(context.chrom); // eslint-disable-line react/destructuring-assignment
    const positionCorrectedVariants = renderedVariants.map((variant) => {
        const copy = Object.assign({}, variant);
        // This can only happen when chrom2/pos2/end2 is non-null
        if (variant.chrom2) {
            const chromIndex = HUMAN_CHROMOSOMES.indexOf(variant.chrom);
            const endChromIndex = HUMAN_CHROMOSOMES.indexOf(variant.chrom2);
            copy.pos += (chromIndex - currentChromIndex) * 1e9;
            copy.end += (chromIndex - currentChromIndex) * 1e9;
            copy.pos2 += (endChromIndex - currentChromIndex) * 1e9;
            copy.end2 += (endChromIndex - currentChromIndex) * 1e9;
        }
        return copy;
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(ControlWrapper, null,
            react_1.default.createElement("span", { style: { marginRight: '0.5em' } }, "Color variants by"),
            react_1.default.createElement(ui_1.SegmentedControl, { id: "sv-color-key", options: [
                    { label: 'Consequence', value: 'consequence' },
                    { label: 'Class', value: 'type' },
                ], value: colorKey, onChange: setColorKey })),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(StructuralVariantTracks_1.default, { ref: tracks, highlightedVariant: variantHoveredInTable, numTracksRendered: numRowsRendered, onHover: setVariantHoveredInTrack, onScroll: onScrollTracks, trackColor: trackColor, trackHeight: TRACK_HEIGHT, variants: positionCorrectedVariants })),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(region_viewer_1.PositionAxisTrack, null)),
        react_1.default.createElement(TrackPage_1.TrackPageSection, { style: { fontSize: '14px' } },
            react_1.default.createElement(Wrapper, null,
                react_1.default.createElement(StructuralVariantFilterControls_1.default
                // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type '"type" | ... Remove this comment to see the full error message
                , { 
                    // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type '"type" | ... Remove this comment to see the full error message
                    colorKey: colorKey, value: filter, onChange: setFilter }),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(ExportStructuralVariantsButton_1.default, { exportFileName: exportFileName, variants: renderedVariants }),
                    react_1.default.createElement(ui_1.Button, { onClick: () => {
                            setShowTableConfigurationModal(true);
                        }, style: { marginLeft: '1ch' } }, "Configure table"))),
            react_1.default.createElement(Wrapper, { style: {
                    // Keep the height of the table section constant when filtering variants, avoid layout shift
                    minHeight: 40 + TABLE_ROW_HEIGHT * Math.min(variants.length, NUM_ROWS_RENDERED),
                } }, renderedVariants.length ? (react_1.default.createElement(StructuralVariantsTable_1.default, { ref: table, 
                // @ts-expect-error TS(2322) FIXME: Type '{ ref: MutableRefObject<null>; cellData: { c... Remove this comment to see the full error message
                cellData: {
                    colorKey,
                    highlightWords: filter.searchText.split(',').map((s) => s.trim()),
                }, columns: renderedTableColumns, numRowsRendered: numRowsRendered, onHoverVariant: setVariantHoveredInTable, onRequestSort: setSortKey, onScroll: onScrollTable, rowHeight: TABLE_ROW_HEIGHT, shouldHighlightRow: shouldHighlightTableRow, sortKey: sortKey, sortOrder: sortOrder, variants: renderedVariants })) : (react_1.default.createElement(StatusMessage_1.default, null, "No matching variants")))),
        showTableConfigurationModal && (react_1.default.createElement(VariantTableConfigurationModal_1.default, { availableColumns: structuralVariantTableColumns_1.default, context: context, defaultColumns: DEFAULT_COLUMNS, selectedColumns: selectedColumns, onCancel: () => {
                setShowTableConfigurationModal(false);
            }, onSave: (newSelectedColumns) => {
                setSelectedColumns(newSelectedColumns);
                setShowTableConfigurationModal(false);
                userPreferences_1.default
                    .savePreference('structuralVariantTableColumns', newSelectedColumns)
                    .then(null, (error) => {
                    (0, Notifications_1.showNotification)({
                        title: 'Error',
                        message: error.message,
                        status: 'error',
                    });
                });
            } }))));
};
exports.default = StructuralVariants;
//# sourceMappingURL=StructuralVariants.js.map