import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type Props = {
    datasetId: DatasetId;
    start: number;
    stop: number;
};
declare const MitochondrialRegionCoverageTrack: ({ datasetId, start, stop }: Props) => React.JSX.Element;
export default MitochondrialRegionCoverageTrack;
