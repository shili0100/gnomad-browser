import React from 'react';
type MNVConstituentSNVFrequencyTableProps = {
    snvs: {
        variant_id: string;
        exome?: {
            ac: number;
            an: number;
            filters: string[];
        };
        genome?: {
            ac: number;
            an: number;
            filters: string[];
        };
    }[];
};
declare const MNVConstituentSNVFrequencyTable: ({ snvs }: MNVConstituentSNVFrequencyTableProps) => React.JSX.Element;
export default MNVConstituentSNVFrequencyTable;
