import React from 'react';
import { ShortTandemRepeat } from './ShortTandemRepeatPage';
type ShortTandemRepeatReadsContainerProps = {
    datasetId: string;
    shortTandemRepeat: ShortTandemRepeat;
    filter: {
        population?: string;
        sex?: string;
        alleles?: {
            repeat_unit?: string;
            min_repeats?: number;
            max_repeats?: number;
        }[];
    };
};
declare const ShortTandemRepeatReadsContainer: ({ datasetId, shortTandemRepeat, filter: baseFilter, }: ShortTandemRepeatReadsContainerProps) => React.JSX.Element;
export default ShortTandemRepeatReadsContainer;
