import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Region } from './RegionPage';
type Props = {
    datasetId: DatasetId;
    region: Region;
    zoomRegion?: {
        start: number;
        stop: number;
    } | null;
};
declare const MitochondrialVariantsInRegion: ({ datasetId, region, zoomRegion, ...rest }: Props) => React.JSX.Element;
export default MitochondrialVariantsInRegion;
