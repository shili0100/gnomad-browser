import React from 'react';
type Props = {
    onChange: (...args: any[]) => any;
    colorKey: 'consequence' | 'type';
    value: {
        includeConsequenceCategories: {
            [key: string]: boolean;
        };
        includeTypes: {
            [key: string]: boolean;
        };
        includeFilteredVariants: boolean;
        searchText: string;
    };
};
declare const StructuralVariantFilterControls: ({ onChange, colorKey, value }: Props) => React.JSX.Element;
export default StructuralVariantFilterControls;
