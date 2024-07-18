import React from 'react';
type Props = {
    onChange: (...args: any[]) => any;
    value: {
        includeCategories: {
            lof: boolean;
            missense: boolean;
            synonymous: boolean;
            other: boolean;
        };
        includeExomes: boolean;
        includeGenomes: boolean;
        includeFilteredVariants: boolean;
        includeSNVs: boolean;
        includeIndels: boolean;
        includeContext: boolean;
        searchText: string;
    };
    jumpToRow: (...args: any[]) => any;
    position: number;
};
declare const VariantFilterControls: ({ onChange, value, jumpToRow, position }: Props) => React.JSX.Element;
export default VariantFilterControls;
