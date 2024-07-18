import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type Props = {
    datasetId: DatasetId;
    geneId: string;
};
declare const MitochondrialGeneCoverageTrack: ({ datasetId, geneId }: Props) => React.JSX.Element;
export default MitochondrialGeneCoverageTrack;
