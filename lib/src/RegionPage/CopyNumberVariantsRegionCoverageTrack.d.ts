import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type Props = {
    datasetId: DatasetId;
    chrom: number;
    start: number;
    stop: number;
};
declare const CopyNumberVariantsRegionCoverageTrack: ({ datasetId, chrom, start, stop }: Props) => React.JSX.Element;
export default CopyNumberVariantsRegionCoverageTrack;
