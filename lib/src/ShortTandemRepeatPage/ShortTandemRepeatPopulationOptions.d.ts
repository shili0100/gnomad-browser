import React from 'react';
type Props = {
    id: string;
    populationIds: string[];
    selectedPopulationId: string;
    onSelectPopulationId: (...args: any[]) => any;
};
declare const ShortTandemRepeatPopulationOptions: ({ id, populationIds, selectedPopulationId, onSelectPopulationId, }: Props) => React.JSX.Element;
export default ShortTandemRepeatPopulationOptions;
