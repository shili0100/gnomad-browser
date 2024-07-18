import React from 'react';
import { ShortTandemRepeat, ShortTandemRepeatAdjacentRepeat } from './ShortTandemRepeatPage';
type Props = {
    shortTandemRepeatOrAdjacentRepeat: ShortTandemRepeat | ShortTandemRepeatAdjacentRepeat;
    selectedPopulationId: string;
    selectedRepeatUnits: string;
    bin: {
        label: string;
        xRange: number[];
        yRange: number[];
    };
};
declare const ShortTandemRepeatGenotypeDistributionBinDetails: ({ shortTandemRepeatOrAdjacentRepeat, selectedPopulationId, selectedRepeatUnits, bin, }: Props) => React.JSX.Element;
export default ShortTandemRepeatGenotypeDistributionBinDetails;
