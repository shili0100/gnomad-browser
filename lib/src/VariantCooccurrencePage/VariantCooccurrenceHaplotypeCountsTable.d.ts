import React from 'react';
import { HaplotypeCounts } from './VariantCooccurrencePage';
type VariantCooccurrenceHaplotypeCountsTableProps = {
    variantIds: string[];
    haplotypeCounts: HaplotypeCounts;
};
declare const VariantCooccurrenceHaplotypeCountsTable: ({ variantIds, haplotypeCounts, }: VariantCooccurrenceHaplotypeCountsTableProps) => React.JSX.Element;
export default VariantCooccurrenceHaplotypeCountsTable;
