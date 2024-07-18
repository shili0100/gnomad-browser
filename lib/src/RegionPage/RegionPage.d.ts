import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type NonCodingConstraint = {
    start: number;
    stop: number;
    oe: number;
    z: number;
};
export type Region = {
    reference_genome: 'GRCh37' | 'GRCh38';
    chrom: string;
    start: number;
    stop: number;
    genes: any[];
    short_tandem_repeats?: {
        id: string;
    }[];
    non_coding_constraints: NonCodingConstraint[] | null;
};
type RegionPageProps = {
    datasetId: DatasetId;
    region: Region;
};
declare const RegionPage: ({ datasetId, region }: RegionPageProps) => React.JSX.Element;
export default RegionPage;
