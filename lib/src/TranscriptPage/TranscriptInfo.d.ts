import React from 'react';
import { GeneMetadata } from '../GenePage/GenePage';
type TranscriptInfoProps = {
    transcript: {
        transcript_id: string;
        transcript_version: string;
        reference_genome: 'GRCh37' | 'GRCh38';
        chrom: string;
        start: number;
        stop: number;
        gene: GeneMetadata;
    };
};
declare const TranscriptInfo: ({ transcript }: TranscriptInfoProps) => React.JSX.Element;
export default TranscriptInfo;
