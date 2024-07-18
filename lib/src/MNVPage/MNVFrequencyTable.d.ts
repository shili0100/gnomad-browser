import React from 'react';
type Props = {
    variant: {
        exome?: {
            ac: number;
            ac_hom: number;
            n_individuals: number;
        };
        genome?: {
            ac: number;
            ac_hom: number;
            n_individuals: number;
        };
    };
};
declare const MNVFrequencyTable: ({ variant }: Props) => React.JSX.Element;
export default MNVFrequencyTable;
