import { Variant } from '../VariantPage/VariantPage';
import { VariantTableColumn } from './variantTableColumns';
type Categories = {
    lof: boolean;
    missense: boolean;
    synonymous: boolean;
    other: boolean;
};
export type VariantFilterState = {
    includeCategories: Categories;
    includeFilteredVariants: boolean;
    includeSNVs: boolean;
    includeIndels: boolean;
    includeExomes: boolean;
    includeGenomes: boolean;
    includeContext: boolean;
    searchText: string;
};
export declare function getFilteredVariants(filter: VariantFilterState, variants: Variant[], variantTableColumns: VariantTableColumn[]): Variant[];
declare const filterVariants: (variants: Variant[], filter: VariantFilterState, selectedColumns: any) => Variant[];
export default filterVariants;
