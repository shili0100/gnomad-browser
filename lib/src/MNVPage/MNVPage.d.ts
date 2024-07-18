import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type Props = {
    datasetId: DatasetId;
    variantId: string;
};
declare const MNVPage: ({ datasetId, variantId }: Props) => React.JSX.Element;
export default MNVPage;
