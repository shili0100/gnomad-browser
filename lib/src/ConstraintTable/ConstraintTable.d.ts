import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Gene } from '../GenePage/GenePage';
import { Transcript } from '../TranscriptPage/TranscriptPage';
type Props = {
    datasetId: DatasetId;
    geneOrTranscript: Gene | Transcript;
};
declare const ConstraintTable: ({ datasetId, geneOrTranscript }: Props) => React.JSX.Element;
export default ConstraintTable;
