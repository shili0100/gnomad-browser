import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type ConnectedVariantsInTranscriptProps = {
    datasetId: DatasetId;
    transcript: {
        transcript_id: string;
    };
};
declare const ConnectedVariantsInTranscript: ({ datasetId, transcript, ...otherProps }: ConnectedVariantsInTranscriptProps) => React.JSX.Element;
export default ConnectedVariantsInTranscript;
