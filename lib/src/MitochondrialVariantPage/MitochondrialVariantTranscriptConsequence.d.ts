import React from 'react';
import { MitochondrialVariant } from './MitochondrialVariantPage';
declare const MITOTIP_TRNA_PREDICTIONS: {
    likely_benign: string;
    possibly_benign: string;
    possibly_pathogenic: string;
    likely_pathogenic: string;
};
export type MitotipTrnaPrediction = keyof typeof MITOTIP_TRNA_PREDICTIONS;
declare const PON_MT_TRNA_PREDICTIONS: {
    neutral: string;
    likely_neutral: string;
    likely_pathogenic: string;
    pathogenic: string;
};
export type PonMtTrnaPrediction = keyof typeof PON_MT_TRNA_PREDICTIONS;
type MitochondrialVariantTranscriptConsequenceProps = {
    consequence: any;
    variant: MitochondrialVariant;
};
declare const MitochondrialVariantTranscriptConsequence: ({ consequence, variant, }: MitochondrialVariantTranscriptConsequenceProps) => React.JSX.Element | null;
export default MitochondrialVariantTranscriptConsequence;
