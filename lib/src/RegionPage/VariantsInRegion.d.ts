import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type ConnectedVariantsInRegionProps = {
    datasetId: DatasetId;
    region: {
        chrom: string;
        start: number;
        stop: number;
    };
};
declare const ConnectedVariantsInRegion: ({ datasetId, region }: ConnectedVariantsInRegionProps) => React.JSX.Element;
export default ConnectedVariantsInRegion;
