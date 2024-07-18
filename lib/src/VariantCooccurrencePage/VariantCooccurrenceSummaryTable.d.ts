import React from 'react';
import { CooccurrenceData } from './VariantCooccurrencePage';
type VariantCooccurrenceSummaryTableProps = {
    cooccurrenceData: CooccurrenceData;
    selectedPopulation: string;
    onSelectPopulation: (...args: any[]) => any;
};
declare const VariantCooccurrenceSummaryTable: ({ cooccurrenceData, selectedPopulation, onSelectPopulation, }: VariantCooccurrenceSummaryTableProps) => React.JSX.Element;
export default VariantCooccurrenceSummaryTable;
