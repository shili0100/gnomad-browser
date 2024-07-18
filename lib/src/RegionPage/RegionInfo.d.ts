import React from 'react';
type Props = {
    region: {
        reference_genome: 'GRCh37' | 'GRCh38';
        chrom: string;
        start: number;
        stop: number;
    };
};
declare const RegionInfo: ({ region }: Props) => React.JSX.Element;
export default RegionInfo;
