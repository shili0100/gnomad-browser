import React from 'react';
import TranscriptConsequencePropType from './TranscriptConsequencePropType';
type Props = {
    variant: {
        reference_genome: 'GRCh37' | 'GRCh38';
        transcript_consequences: TranscriptConsequencePropType[];
    };
};
declare const VariantTranscriptConsequences: ({ variant }: Props) => React.JSX.Element;
export default VariantTranscriptConsequences;
