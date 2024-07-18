import React from 'react';
type Props = {
    onChange: (...args: any[]) => any;
    colorKey: 'type';
    value: {
        includeTypes: {
            [key: string]: boolean;
        };
        includeFilteredVariants: boolean;
        searchText: string;
    };
};
declare const CopyNumberVariantFilterControls: ({ onChange, colorKey, value }: Props) => React.JSX.Element;
export default CopyNumberVariantFilterControls;
