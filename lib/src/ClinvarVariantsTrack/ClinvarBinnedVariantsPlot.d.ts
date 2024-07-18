import React from 'react';
type IncludedCategories = {
    [key: string]: boolean;
};
type Props = {
    includedCategories: IncludedCategories;
};
declare const ClinvarBinnedVariantsPlot: ({ includedCategories, ...props }: Props) => React.JSX.Element;
export default ClinvarBinnedVariantsPlot;
