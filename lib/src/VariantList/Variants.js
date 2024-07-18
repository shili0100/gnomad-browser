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
exports.getFirstIndexFromSearchText = getFirstIndexFromSearchText;
const lodash_es_1 = require("lodash-es");
const react_1 = __importStar(require("react"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const formatClinvarDate_1 = __importDefault(require("../ClinvarVariantsTrack/formatClinvarDate"));
const Notifications_1 = require("../Notifications");
const RegionViewerCursor_1 = __importDefault(require("../RegionViewerCursor"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const TrackPage_1 = require("../TrackPage");
const userPreferences_1 = __importDefault(require("../userPreferences"));
const ExportVariantsButton_1 = __importDefault(require("./ExportVariantsButton"));
const filterVariants_1 = __importStar(require("./filterVariants"));
const mergeExomeAndGenomeData_1 = __importDefault(require("./mergeExomeAndGenomeData"));
const VariantFilterControls_1 = __importDefault(require("./VariantFilterControls"));
const VariantTable_1 = __importDefault(require("./VariantTable"));
const variantTableColumns_1 = __importStar(require("./variantTableColumns"));
const VariantTableConfigurationModal_1 = __importDefault(require("./VariantTableConfigurationModal"));
const VariantTrack_1 = __importDefault(require("./VariantTrack"));
const DEFAULT_COLUMNS = [
    'source',
    'gene',
    'hgvs',
    'consequence',
    'lof_curation',
    'clinical_significance',
    'flags',
    'ac',
    'an',
    'af',
    'homozygote_count',
    'hemizygote_count',
];
const sortVariants = (variants, { sortKey, sortOrder }) => {
    const sortColumn = variantTableColumns_1.default.find((column) => column.key === sortKey);
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    return [...variants].sort((v1, v2) => sortColumn.compareFunction(v1, v2, sortOrder));
};
const variantsDefaultProps = {
    children: null,
    exportFileName: 'variants',
};
function getFirstIndexFromSearchText(searchFilter, variantSearched, variantsTableColumns, variantWindow) {
    const searchedVariants = (0, filterVariants_1.getFilteredVariants)(searchFilter, variantSearched, variantsTableColumns);
    if (searchedVariants.length > 0) {
        const firstVariant = searchedVariants[0];
        const firstIndex = variantSearched.findIndex((variant) => variant.pos === firstVariant.pos);
        if (variantWindow[0] !== null && firstIndex < variantWindow[0]) {
            return firstIndex - 10;
        }
        return firstIndex + 10;
    }
    return variantWindow[0];
}
const Variants = ({ children, clinvarReleaseDate, context, datasetId, exportFileName, variants, }) => {
    const table = (0, react_1.useRef)(null);
    const [selectedColumns, setSelectedColumns] = (0, react_1.useState)(() => {
        try {
            return userPreferences_1.default.getPreference('variantTableColumns') || DEFAULT_COLUMNS;
        }
        catch (error) {
            return DEFAULT_COLUMNS;
        }
    });
    const renderedTableColumns = (0, react_1.useMemo)(() => {
        const columnsForContext = (0, variantTableColumns_1.getColumnsForContext)(context);
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
        includeSNVs: true,
        includeIndels: true,
        includeExomes: true,
        includeGenomes: true,
        includeContext: true,
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
    const filteredVariants = (0, react_1.useMemo)(() => {
        return (0, mergeExomeAndGenomeData_1.default)({
            datasetId,
            variants: (0, filterVariants_1.default)(variants, filter, renderedTableColumns),
        });
    }, [datasetId, variants, filter, renderedTableColumns]);
    const renderedVariants = (0, react_1.useMemo)(() => {
        return sortVariants(filteredVariants, sortState);
    }, [filteredVariants, sortState]);
    const [showTableConfigurationModal, setShowTableConfigurationModal] = (0, react_1.useState)(false);
    const [variantHoveredInTable, setVariantHoveredInTable] = (0, react_1.useState)(null);
    const [variantHoveredInTrack, setVariantHoveredInTrack] = (0, react_1.useState)(null);
    const [visibleVariantWindow, setVisibleVariantWindow] = (0, react_1.useState)([0, 19]);
    const [currentSearchIndex, setCurrentSearchIndex] = (0, react_1.useState)(0);
    const onHoverVariantsInTrack = (0, react_1.useMemo)(() => (0, lodash_es_1.throttle)((hoveredVariants) => {
        setVariantHoveredInTrack(hoveredVariants.length > 0 ? hoveredVariants[0].variant_id : null);
    }, 100), []);
    const onVisibleRowsChange = (0, react_1.useMemo)(() => (0, lodash_es_1.throttle)(({ startIndex, stopIndex }) => {
        setVisibleVariantWindow([startIndex, stopIndex]);
    }, 100), []);
    const [positionLastClicked, setPositionLastClicked] = (0, react_1.useState)(null);
    const createCallback = (0, react_1.useCallback)((sortByKey, stateSetter) => (position) => {
        setSortState({
            sortKey: sortByKey,
            sortOrder: 'ascending',
        });
        stateSetter(position);
    }, []);
    const onNavigatorClick = createCallback('variant_id', setPositionLastClicked);
    const onSearchResult = createCallback('variant_id', setFilter);
    // When a user clicks on the bubble track, update the position in the variant table
    (0, react_1.useEffect)(() => {
        if (positionLastClicked === null || table.current === null) {
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
        // @ts-expect-error TS(2339) FIXME: 'scrollToDataRow' does not exist on type 'never'.
        table.current.scrollToDataRow(index);
    }, [positionLastClicked]); // eslint-disable-line react-hooks/exhaustive-deps
    // When searching the table with context, scroll to the first hit whenever the
    //   search text changes
    (0, react_1.useEffect)(() => {
        if (!filter.includeContext) {
            return;
        }
        if (filter.searchText === '') {
            setCurrentSearchIndex(-1);
            return;
        }
        const searchIndex = getFirstIndexFromSearchText(filter, renderedVariants, renderedTableColumns, visibleVariantWindow);
        if (searchIndex !== -1) {
            setCurrentSearchIndex(searchIndex);
        }
        // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
        table.current.scrollToDataRow(searchIndex);
    }, [filter.searchText]); // eslint-disable-line react-hooks/exhaustive-deps
    const datasetLabel = (0, metadata_1.labelForDataset)(datasetId);
    if (variants.length === 0) {
        return (react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement("h2", { style: { margin: '2em 0 0.25em' } }, "gnomAD variants"),
            react_1.default.createElement("p", null, "No gnomAD variants found.")));
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement("h2", { style: { margin: '2em 0 0.25em' } }, "gnomAD variants")),
        react_1.default.createElement(RegionViewerCursor_1.default, { onClick: onNavigatorClick },
            react_1.default.createElement(VariantTrack_1.default
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            , { 
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                title: `${datasetLabel} variants (${renderedVariants.length})`, variants: renderedVariants }),
            react_1.default.createElement(VariantTrack_1.default
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            , { 
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                title: "Viewing in table", variants: renderedVariants
                    .slice(visibleVariantWindow[0], visibleVariantWindow[1] + 1)
                    .map((variant) => (Object.assign(Object.assign({}, variant), { isHighlighted: variant.variant_id === variantHoveredInTable }))), onHoverVariants: onHoverVariantsInTrack })),
        react_1.default.createElement(region_viewer_1.PositionAxisTrack, null),
        react_1.default.createElement(TrackPage_1.TrackPageSection, { style: { fontSize: '14px', marginTop: '1em' } },
            react_1.default.createElement(VariantFilterControls_1.default, { onChange: setFilter, value: filter, jumpToRow: onSearchResult, position: currentSearchIndex }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(ExportVariantsButton_1.default, { datasetId: datasetId, exportFileName: exportFileName, variants: renderedVariants }),
                react_1.default.createElement(ui_1.Button, { onClick: () => {
                        setShowTableConfigurationModal(true);
                    }, style: { marginLeft: '1ch' } }, "Configure table")),
            children,
            react_1.default.createElement("div", { style: {
                    // Keep the height of the table section constant when filtering variants, avoid layout shift
                    minHeight: '540px',
                } }, renderedVariants.length ? (react_1.default.createElement(VariantTable_1.default, { ref: table, 
                // @ts-expect-error TS(2322) FIXME: Type '{ ref: MutableRefObject<null>; columns: any[... Remove this comment to see the full error message
                columns: renderedTableColumns, highlightText: filter.searchText, highlightedVariantId: variantHoveredInTrack, onHoverVariant: setVariantHoveredInTable, onRequestSort: setSortKey, onVisibleRowsChange: onVisibleRowsChange, sortKey: sortKey, sortOrder: sortOrder, variants: renderedVariants })) : (react_1.default.createElement(StatusMessage_1.default, null, "No matching variants")))),
        showTableConfigurationModal && (react_1.default.createElement(VariantTableConfigurationModal_1.default, { availableColumns: variantTableColumns_1.default, context: context, defaultColumns: DEFAULT_COLUMNS, selectedColumns: selectedColumns, onCancel: () => {
                setShowTableConfigurationModal(false);
            }, onSave: (newSelectedColumns) => {
                setSelectedColumns(newSelectedColumns);
                setShowTableConfigurationModal(false);
                userPreferences_1.default
                    .savePreference('variantTableColumns', newSelectedColumns)
                    .then(null, (error) => {
                    (0, Notifications_1.showNotification)({
                        title: 'Error',
                        message: error.message,
                        status: 'error',
                    });
                });
            } }))));
};
Variants.defaultProps = variantsDefaultProps;
exports.default = Variants;
//# sourceMappingURL=Variants.js.map