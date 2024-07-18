import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type Props = {
    datasetId: DatasetId;
    geneIdOrSymbol: string;
};
declare const GeneNotFound: ({ datasetId, geneIdOrSymbol }: Props) => React.JSX.Element;
export default GeneNotFound;
