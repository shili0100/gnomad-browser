"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterVariants = (variants, filter, selectedColumns) => {
    let filteredVariants = variants;
    filteredVariants = filteredVariants.filter((v) => filter.includeTypes[v.type] === undefined
        ? filter.includeTypes.OTH
        : filter.includeTypes[v.type]);
    if (!filter.includeFilteredVariants) {
        filteredVariants = filteredVariants.filter((v) => v.filters.length === 0);
    }
    if (filter.searchText) {
        const searchColumns = selectedColumns.filter((column) => !!column.getSearchTerms);
        const getVariantSearchTerms = (variant) => searchColumns
            .flatMap((column) => column.getSearchTerms(variant))
            .filter(Boolean)
            .map((s) => s.toLowerCase());
        const searchTerms = filter.searchText
            .toLowerCase()
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        filteredVariants = filteredVariants.filter((variant) => getVariantSearchTerms(variant).some((variantTerm) => searchTerms.some((searchTerm) => variantTerm.includes(searchTerm))));
    }
    return filteredVariants;
};
exports.default = filterVariants;
//# sourceMappingURL=filterCopyNumberVariants.js.map