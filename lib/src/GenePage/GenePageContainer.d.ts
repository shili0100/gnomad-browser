import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type Props = {
    datasetId: DatasetId;
    geneIdOrSymbol: string;
};
declare const GenePageContainer: ({ datasetId, geneIdOrSymbol }: Props) => React.JSX.Element;
export default GenePageContainer;
