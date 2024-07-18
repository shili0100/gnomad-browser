import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type ReadDataContainerProps = {
    datasetId: DatasetId;
    variantIds: string[];
};
declare const ReadDataContainer: ({ datasetId, variantIds }: ReadDataContainerProps) => React.JSX.Element | null;
export default ReadDataContainer;
