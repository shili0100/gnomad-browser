import React from 'react';
import { DatasetId } from '../dataset-metadata/metadata';
type VariantPageRouterProps = {
    datasetId: DatasetId;
    variantId: string;
};
declare const VariantPageRouter: ({ datasetId, variantId }: VariantPageRouterProps) => React.JSX.Element;
export default VariantPageRouter;
