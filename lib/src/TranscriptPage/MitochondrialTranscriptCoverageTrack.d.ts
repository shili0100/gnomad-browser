import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type Props = {
    datasetId: DatasetId;
    transcriptId: string;
};
declare const MitochondrialTranscriptCoverageTrack: ({ datasetId, transcriptId }: Props) => React.JSX.Element;
export default MitochondrialTranscriptCoverageTrack;
