import React from 'react';
import { ClinvarVariant } from '../VariantPage/VariantPage';
import { Transcript } from '../TranscriptPage/TranscriptPage';
type ScalePositionFn = (...args: any[]) => any;
type VariantClickCallback = (...args: any[]) => any;
type ClinvarAllVariantsPlotProps = {
    scalePosition: ScalePositionFn;
    transcripts: Transcript[];
    variants: ClinvarVariant[];
    width: number;
    onClickVariant: VariantClickCallback;
};
declare const ClinvarAllVariantsPlot: ({ scalePosition, transcripts, variants, width, onClickVariant, }: ClinvarAllVariantsPlotProps) => React.JSX.Element;
export default ClinvarAllVariantsPlot;
