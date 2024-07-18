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
const lodash_es_1 = require("lodash-es");
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const formatClinvarDate_1 = __importDefault(require("../ClinvarVariantsTrack/formatClinvarDate"));
const Notifications_1 = require("../Notifications");
const RegionViewerCursor_1 = __importDefault(require("../RegionViewerCursor"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const TrackPage_1 = require("../TrackPage");
const userPreferences_1 = __importDefault(require("../userPreferences"));
const VariantTableConfigurationModal_1 = __importDefault(require("../VariantList/VariantTableConfigurationModal"));
const VariantTrack_1 = __importDefault(require("../VariantList/VariantTrack"));
const ExportMitochondrialVariantsButton_1 = __importDefault(require("./ExportMitochondrialVariantsButton"));
const filterMitochondrialVariants_1 = __importDefault(require("./filterMitochondrialVariants"));
const MitochondrialVariantFilterControls_1 = __importDefault(require("./MitochondrialVariantFilterControls"));
const mitochondrialVariantTableColumns_1 = __importStar(require("./mitochondrialVariantTableColumns"));
const MitochondrialVariantsTable_1 = __importDefault(require("./MitochondrialVariantsTable"));
const NUM_ROWS_RENDERED = 20;
const Wrapper = styled_components_1.default.div `
  margin-bottom: 1em;
`;
const DEFAULT_COLUMNS = [
    'source',
    'gene',
    'hgvs',
    'consequence',
    'clinical_significance',
    'flags',
    'an',
    'ac_hom',
    'af_hom',
    'ac_het',
    'af_het',
    'max_heteroplasmy',
];
const sortMitochondrialVariants = (variants, { sortKey, sortOrder }) => {
    const sortColumn = mitochondrialVariantTableColumns_1.default.find((column) => column.key === sortKey);
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    return [...variants].sort((v1, v2) => sortColumn.compareFunction(v1, v2, sortOrder));
};
const MitochondrialVariants = ({ clinvarReleaseDate, context, exportFileName, variants, }) => {
    const table = (0, react_1.useRef)(null);
    const [selectedColumns, setSelectedColumns] = (0, react_1.useState)(() => {
        try {
            return userPreferences_1.default.getPreference('mitochondrialVariantTableColumns') || DEFAULT_COLUMNS;
        }
        catch (error) {
            return DEFAULT_COLUMNS;
        }
    });
    const renderedTableColumns = (0, react_1.useMemo)(() => {
        const columnsForContext = (0, mitochondrialVariantTableColumns_1.getColumnsForContext)(context);
        if (columnsForContext.clinical_significance) {
            ;
            columnsForContext.clinical_significance.description = `ClinVar clinical significance, based on ClinVar's ${(0, formatClinvarDate_1.default)(clinvarReleaseDate)} release`;
        }
        return (['variant_id', ...selectedColumns]
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            .map((columnKey) => columnsForContext[columnKey])
            .filter(Boolean)
            .map((column) => (Object.assign(Object.assign({}, column), { isSortable: Boolean(column.compareFunction), tooltip: column.description }))));
    }, [clinvarReleaseDate, context, selectedColumns]);
    const [filter, setFilter] = (0, react_1.useState)({
        includeCategories: {
            lof: true,
            missense: true,
            synonymous: true,
            other: true,
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
    const filteredVariants = (0, react_1.useMemo)(() => (0, filterMitochondrialVariants_1.default)(variants, filter, renderedTableColumns), [variants, filter, renderedTableColumns]);
    const renderedVariants = (0, react_1.useMemo)(() => sortMitochondrialVariants(filteredVariants, sortState), [filteredVariants, sortState]);
    const [showTableConfigurationModal, setShowTableConfigurationModal] = (0, react_1.useState)(false);
    const [variantHoveredInTable, setVariantHoveredInTable] = (0, react_1.useState)(null);
    const [variantHoveredInTrack, setVariantHoveredInTrack] = (0, react_1.useState)(null);
    const [visibleVariantWindow, setVisibleVariantWindow] = (0, react_1.useState)([0, 19]);
    const shouldHighlightTableRow = (0, react_1.useCallback)((variant) => {
        return variant.variant_id === variantHoveredInTrack;
    }, [variantHoveredInTrack]);
    const onHoverVariantsInTrack = (0, react_1.useMemo)(() => (0, lodash_es_1.throttle)((hoveredVariants) => {
        setVariantHoveredInTrack(hoveredVariants.length > 0 ? hoveredVariants[0].variant_id : null);
    }, 100), []);
    const onVisibleRowsChange = (0, react_1.useMemo)(() => (0, lodash_es_1.throttle)(({ startIndex, stopIndex }) => {
        setVisibleVariantWindow([startIndex, stopIndex]);
    }, 100), []);
    const [positionLastClicked, setPositionLastClicked] = (0, react_1.useState)(null);
    const onNavigatorClick = (0, react_1.useCallback)((position) => {
        setSortState({
            sortKey: 'variant_id',
            sortOrder: 'ascending',
        });
        setPositionLastClicked(position);
    }, []);
    (0, react_1.useEffect)(() => {
        if (positionLastClicked === null) {
            return;
        }
        let index;
        if (renderedVariants.length === 0 || positionLastClicked < renderedVariants[0].pos) {
            index = 0;
        }
        index = renderedVariants.findIndex((variant, i) => renderedVariants[i + 1] &&
            positionLastClicked >= variant.pos &&
            positionLastClicked <= renderedVariants[i + 1].pos);
        if (index === -1) {
            index = renderedVariants.length - 1;
        }
        // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
        table.current.scrollToDataRow(index);
    }, [positionLastClicked]); // eslint-disable-line react-hooks/exhaustive-deps
    if (variants.length === 0) {
        return (react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement("h2", { style: { margin: '2em 0 0.25em' } }, "gnomAD variants"),
            react_1.default.createElement("p", null, "No gnomAD variants found.")));
    }
    const numRowsRendered = Math.min(renderedVariants.length, NUM_ROWS_RENDERED);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement("h2", { style: { margin: '2em 0 0.25em' } }, "gnomAD variants")),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(RegionViewerCursor_1.default, { onClick: onNavigatorClick },
                react_1.default.createElement(VariantTrack_1.default
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                , { 
                    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                    title: `gnomAD variants\n(${renderedVariants.length})`, variants: renderedVariants.map((variant) => (Object.assign(Object.assign({}, variant), { allele_freq: variant.af }))) }),
                react_1.default.createElement(VariantTrack_1.default
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                , { 
                    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                    title: "Viewing in table", variants: renderedVariants
                        .slice(visibleVariantWindow[0], visibleVariantWindow[1] + 1)
                        .map((variant) => (Object.assign(Object.assign({}, variant), { allele_freq: variant.af, isHighlighted: variant.variant_id === variantHoveredInTable }))), onHoverVariants: onHoverVariantsInTrack })),
            react_1.default.createElement(region_viewer_1.PositionAxisTrack, null)),
        react_1.default.createElement(TrackPage_1.TrackPageSection, { style: { fontSize: '14px' } },
            react_1.default.createElement(Wrapper, null,
                react_1.default.createElement(MitochondrialVariantFilterControls_1.default, { value: filter, onChange: setFilter }),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(ExportMitochondrialVariantsButton_1.default, { exportFileName: exportFileName, includeGene: context.gene_id === undefined && context.transcript_id === undefined, variants: renderedVariants }))),
            react_1.default.createElement(Wrapper, { style: {
                    // Keep the height of the table section constant when filtering variants, avoid layout shift
                    minHeight: 55 + 25 * Math.min(variants.length, NUM_ROWS_RENDERED),
                } }, renderedVariants.length ? (react_1.default.createElement(MitochondrialVariantsTable_1.default, { ref: table, 
                // @ts-expect-error TS(2322) FIXME: Type '{ ref: MutableRefObject<null>; columns: any[... Remove this comment to see the full error message
                columns: renderedTableColumns, highlightText: filter.searchText, numRowsRendered: numRowsRendered, shouldHighlightRow: shouldHighlightTableRow, sortKey: sortKey, sortOrder: sortOrder, variants: renderedVariants, onHoverVariant: setVariantHoveredInTable, onRequestSort: setSortKey, onVisibleRowsChange: onVisibleRowsChange })) : (react_1.default.createElement(StatusMessage_1.default, null, "No matching variants")))),
        showTableConfigurationModal && (react_1.default.createElement(VariantTableConfigurationModal_1.default, { availableColumns: mitochondrialVariantTableColumns_1.default, context: context, defaultColumns: DEFAULT_COLUMNS, selectedColumns: selectedColumns, onCancel: () => {
                setShowTableConfigurationModal(false);
            }, onSave: (newSelectedColumns) => {
                setSelectedColumns(newSelectedColumns);
                setShowTableConfigurationModal(false);
                userPreferences_1.default
                    .savePreference('mitochondrialVariantTableColumns', newSelectedColumns)
                    .then(null, (error) => {
                    (0, Notifications_1.showNotification)({
                        title: 'Error',
                        message: error.message,
                        status: 'error',
                    });
                });
            } }))));
};
exports.default = MitochondrialVariants;
//# sourceMappingURL=MitochondrialVariants.js.map