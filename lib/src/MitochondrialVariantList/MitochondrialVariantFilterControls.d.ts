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
        includeFilteredVariants: boolean;
        searchText: string;
    };
};
declare const MitochondrialVariantFilterControls: ({ onChange, value }: Props) => React.JSX.Element;
export default MitochondrialVariantFilterControls;
