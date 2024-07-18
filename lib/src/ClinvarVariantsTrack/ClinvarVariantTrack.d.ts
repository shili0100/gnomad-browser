import React from 'react';
import { ClinvarVariant } from '../VariantPage/VariantPage';
import { Transcript } from '../TranscriptPage/TranscriptPage';
type Props = {
    referenceGenome: 'GRCh37' | 'GRCh38';
    transcripts: Transcript[];
    variants: ClinvarVariant[];
};
declare const _default: React.MemoExoticComponent<({ referenceGenome, transcripts, variants }: Props) => React.JSX.Element>;
export default _default;
