import React from 'react';
type Props = {
    multiNucleotideVariants: {
        changes_amino_acids: boolean;
        combined_variant_id: string;
        n_individuals: number;
        other_constituent_snvs: string[];
    }[];
};
declare const MNVSummaryList: ({ multiNucleotideVariants }: Props) => React.JSX.Element;
export default MNVSummaryList;
