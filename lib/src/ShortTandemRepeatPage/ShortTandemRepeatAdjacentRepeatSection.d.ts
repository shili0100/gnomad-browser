import React from 'react';
import { ShortTandemRepeatAdjacentRepeat } from './ShortTandemRepeatPage';
type Props = {
    adjacentRepeat: ShortTandemRepeatAdjacentRepeat;
    populationIds: string[];
    selectedPopulationId: string;
    onSelectPopulationId: (...args: any[]) => any;
    selectedScaleType: string;
    onSelectScaleType: (...args: any[]) => any;
};
declare const ShortTandemRepeatAdjacentRepeatSection: ({ adjacentRepeat, populationIds, selectedPopulationId, onSelectPopulationId, selectedScaleType, onSelectScaleType, }: Props) => React.JSX.Element;
export default ShortTandemRepeatAdjacentRepeatSection;
