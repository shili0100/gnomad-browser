import React from 'react';
import { GenotypeCounts } from './VariantCooccurrencePage';
type VariantCooccurrenceDetailsTableProps = {
    variantIds: string[];
    genotypeCounts: GenotypeCounts;
};
declare const VariantCooccurrenceDetailsTable: ({ variantIds, genotypeCounts, }: VariantCooccurrenceDetailsTableProps) => React.JSX.Element;
export default VariantCooccurrenceDetailsTable;
