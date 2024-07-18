import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
export type CopyNumberVariant = {
    alts: string[] | null;
    sc: number;
    sn: number;
    sf: number;
    chrom: string;
    end: number;
    filters: string[];
    genes: string[];
    length: number;
    populations: {
        id: string;
        sc: number;
        sn: number;
        sf: number;
    }[];
    pos: number;
    qual: number;
    type: string;
    posmin: number;
    posmax: number;
    endmin: number;
    endmax: number;
    variant_id: string;
};
type ConnectedCopyNumberVariantPageProps = {
    datasetId: DatasetId;
    variantId: string;
};
declare const ConnectedCopyNumberVariantPage: ({ datasetId, variantId, }: ConnectedCopyNumberVariantPageProps) => React.JSX.Element;
export default ConnectedCopyNumberVariantPage;
