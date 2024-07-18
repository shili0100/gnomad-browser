import React from 'react';
import { Transcript } from './TranscriptPage';
import { DatasetId } from '../../dataset-metadata/metadata';
type Props = {
    datasetId: DatasetId;
    transcript: Transcript;
    zoomRegion?: {
        start: number;
        stop: number;
    } | null;
};
declare const MitochondrialVariantsInTranscript: {
    ({ datasetId, transcript, zoomRegion, ...rest }: Props): React.JSX.Element;
    defaultProps: Partial<Props>;
};
export default MitochondrialVariantsInTranscript;
