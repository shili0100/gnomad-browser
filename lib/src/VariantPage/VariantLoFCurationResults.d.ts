import PropTypes from 'prop-types';
import React from 'react';
type LoFCurationResultPropType = {
    gene_id: string;
    gene_symbol?: string;
    verdict: string;
    flags?: string[];
    project: string;
};
declare const LoFCurationResultPropType: PropTypes.Requireable<LoFCurationResultPropType>;
type VariantLoFCurationResultsProps = {
    variant: {
        lof_curations: LoFCurationResultPropType[];
    };
};
declare const VariantLoFCurationResults: ({ variant }: VariantLoFCurationResultsProps) => React.JSX.Element;
export default VariantLoFCurationResults;
