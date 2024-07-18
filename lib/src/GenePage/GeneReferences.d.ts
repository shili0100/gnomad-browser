import React from 'react';
type Props = {
    gene: {
        gene_id: string;
        reference_genome: 'GRCh37' | 'GRCh38';
        symbol: string;
        chrom: string;
        start: number;
        stop: number;
        hgnc_id?: string;
        ncbi_id?: string;
        omim_id?: string;
    };
};
declare const GeneReferences: ({ gene }: Props) => React.JSX.Element;
export default GeneReferences;
