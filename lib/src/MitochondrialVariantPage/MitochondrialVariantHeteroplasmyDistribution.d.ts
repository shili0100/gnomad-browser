import React from 'react';
type Props = {
    variant: {
        heteroplasmy_distribution: {
            bin_edges: number[];
            bin_freq: number[];
        };
    };
};
declare const MitochondrialVariantHeteroplasmyDistribution: ({ variant }: Props) => React.JSX.Element;
export default MitochondrialVariantHeteroplasmyDistribution;
