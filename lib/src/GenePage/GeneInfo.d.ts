import React from 'react';
type GeneInfoProps = {
    gene: {
        gene_id: string;
        gene_version: string;
        symbol: string;
        gencode_symbol: string;
        reference_genome: 'GRCh37' | 'GRCh38';
        chrom: string;
        start: number;
        stop: number;
        canonical_transcript_id?: string;
        mane_select_transcript?: {
            ensembl_id: string;
            ensembl_version: string;
            refseq_id: string;
            refseq_version: string;
        };
        transcripts: {
            transcript_id: string;
            transcript_version: string;
        }[];
    };
};
declare const GeneInfo: ({ gene }: GeneInfoProps) => React.JSX.Element;
export default GeneInfo;
