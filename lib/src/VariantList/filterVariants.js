"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredVariants = getFilteredVariants;
const vepConsequences_1 = require("../vepConsequences");
function getFilteredVariants(filter, variants, variantTableColumns) {
    const searchColumns = variantTableColumns.filter((column) => !!column.getSearchTerms);
    const getVariantSearchTerms = (variant) => searchColumns
        .flatMap((column) => {
        if (column.getSearchTerms) {
            return column.getSearchTerms(variant);
        }
        return [];
    })
        .filter(Boolean)
        .map((s) => s.toLowerCase());
    const searchTerms = filter.searchText
        .toLowerCase()
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    return variants.filter((variant) => getVariantSearchTerms(variant).some((variantTerm) => searchTerms.some((searchTerm) => variantTerm.includes(searchTerm))));
}
const filterVariants = (variants, filter, selectedColumns) => {
    let filteredVariants = variants;
    const isEveryConsequenceCategorySelected = filter.includeCategories.lof &&
        filter.includeCategories.missense &&
        filter.includeCategories.synonymous &&
        filter.includeCategories.other;
    if (!isEveryConsequenceCategorySelected) {
        filteredVariants = variants.filter((variant) => {
            const category = (0, vepConsequences_1.getCategoryFromConsequence)(variant.consequence) || 'other';
            return filter.includeCategories[category];
        });
    }
    if (!filter.includeFilteredVariants) {
        filteredVariants = filteredVariants.map((v) => (Object.assign(Object.assign({}, v), { exome: v.exome && v.exome.filters.length === 0 ? v.exome : null, genome: v.genome && v.genome.filters.length === 0 ? v.genome : null })));
    }
    if (!filter.includeExomes) {
        filteredVariants = filteredVariants.map((v) => (Object.assign(Object.assign({}, v), { exome: null })));
    }
    if (!filter.includeGenomes) {
        filteredVariants = filteredVariants.map((v) => (Object.assign(Object.assign({}, v), { genome: null })));
    }
    filteredVariants = filteredVariants.filter((v) => v.exome || v.genome);
    if (filter.searchText && !filter.includeContext) {
        filteredVariants = getFilteredVariants(filter, variants, selectedColumns);
    }
    // Indel and Snp filters.
    filteredVariants = filteredVariants.filter((v) => {
        const splits = v.variant_id.split('-');
        // ref and alt are extracted from variant id.
        const refLength = splits[2].length;
        const altLength = splits[3].length;
        const isSNV = refLength === 1 && altLength === 1;
        const isIndel = refLength !== altLength;
        return (filter.includeSNVs && isSNV) || (filter.includeIndels && isIndel);
    });
    return filteredVariants;
};
exports.default = filterVariants;
//# sourceMappingURL=filterVariants.js.map