"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Variant_1 = require("../__factories__/Variant");
const Variants_1 = require("./Variants");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('getFirstIndexFromSearchText', () => {
    const mockVariantsSearched = [];
    for (let i = 0; i < 50; i += 1) {
        mockVariantsSearched[i] = Variant_1.v2VariantFactory.build({ variant_id: `example${i}`, pos: i });
    }
    const mockVariantsTableColumns = [
        {
            key: 'variant_id',
            heading: 'Variant ID',
            description: 'Chromosome-position-reference-alternate',
            isRowHeader: true,
            minWidth: 150,
            grow: 1,
            compareFunction: () => 1,
            getSearchTerms: (variant) => [variant.variant_id].concat(variant.rsids || []),
            render: () => 1,
        },
    ];
    (0, globals_1.it)('returns expected index when searchedVariants has length > 0 and firstIndex > visibleVariantWindow[0]', () => {
        const mockSearchFilter = {
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
            searchText: 'example35',
        };
        const mockVisibleVariantWindow = [0, 19];
        (0, globals_1.expect)((0, Variants_1.getFirstIndexFromSearchText)(mockSearchFilter, mockVariantsSearched, mockVariantsTableColumns, mockVisibleVariantWindow)).toBe(45);
    });
    (0, globals_1.it)('returns expected index when searchedVariants has length > 0 and firstIndex < visibleVariantWindow[0]', () => {
        const mockSearchFilter = {
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
            searchText: 'example16',
        };
        const mockVisibleVariantWindow = [20, 39];
        (0, globals_1.expect)((0, Variants_1.getFirstIndexFromSearchText)(mockSearchFilter, mockVariantsSearched, mockVariantsTableColumns, mockVisibleVariantWindow)).toBe(6);
    });
    (0, globals_1.it)('returns expected index when searchedVariants has length of 0, no results found', () => {
        const mockSearchFilter = {
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
            searchText: '1234',
        };
        const mockVisibleVariantWindow = [0, 19];
        (0, globals_1.expect)((0, Variants_1.getFirstIndexFromSearchText)(mockSearchFilter, mockVariantsSearched, mockVariantsTableColumns, mockVisibleVariantWindow)).toBe(0);
    });
});
//# sourceMappingURL=Variants.spec.js.map