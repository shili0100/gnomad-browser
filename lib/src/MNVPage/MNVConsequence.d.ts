import PropTypes from 'prop-types';
import React from 'react';
type MNVConsequencePropType = {
    category?: string;
    consequence: string;
    codons: string;
    amino_acids: string;
    snv_consequences?: {
        variant_id: any;
        consequence: string;
        codons: string;
        amino_acids: string;
    }[];
};
declare const MNVConsequencePropType: PropTypes.Requireable<MNVConsequencePropType>;
export { MNVConsequencePropType };
type MNVConsequenceProps = {
    consequence: MNVConsequencePropType;
};
declare const MNVConsequence: ({ consequence }: MNVConsequenceProps) => React.JSX.Element;
export default MNVConsequence;
