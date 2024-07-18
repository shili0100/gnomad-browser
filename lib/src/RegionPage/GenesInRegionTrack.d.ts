import React from 'react';
type GenesInRegionTrackProps = {
    genes: {
        gene_id: string;
        symbol: string;
        start: number;
        stop: number;
        exons: {
            feature_type: 'CDS' | 'exon' | 'UTR';
            start: number;
            stop: number;
        }[];
    }[];
    region: {
        reference_genome: 'GRCh37' | 'GRCh38';
        chrom: string;
        start: number;
        stop: number;
    };
};
declare const GenesInRegionTrack: ({ genes, region }: GenesInRegionTrackProps) => React.JSX.Element;
export default GenesInRegionTrack;
