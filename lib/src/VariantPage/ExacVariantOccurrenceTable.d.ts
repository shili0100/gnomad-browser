import React from 'react';
type Props = {
    variant: {
        chrom: string;
        coverage: {
            exome?: {
                mean?: number;
            };
        };
        exome: {
            filters: string[];
            ac: number;
            an: number;
            ac_hom: number;
            ac_hemi?: number;
        };
    };
};
declare const ExacVariantOccurrenceTable: ({ variant }: Props) => React.JSX.Element;
export default ExacVariantOccurrenceTable;
