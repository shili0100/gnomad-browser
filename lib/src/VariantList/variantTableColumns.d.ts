import { Variant } from '../VariantPage/VariantPage';
export type VariantTableColumn = {
    key: string;
    heading: string;
    description?: string;
    grow?: number;
    minWidth?: number;
    compareFunction?: (a: any, b: any) => number;
    render: (variant: any, key: string, options: any) => JSX.Element | null;
    shouldShowInContext?: (context: string, contextType: string) => boolean;
    contextNotes?: string;
    getSearchTerms?: (variant: Variant) => Variant[];
    descriptionInContext?: (context: string, contextType: string) => string;
    isRowHeader?: boolean;
};
declare const variantTableColumns: VariantTableColumn[];
export default variantTableColumns;
export declare const getColumnsForContext: (context: any) => {};
