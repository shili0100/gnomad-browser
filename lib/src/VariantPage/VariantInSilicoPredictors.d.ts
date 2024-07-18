import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Variant } from './VariantPage';
type Props = {
    variant: Variant;
    datasetId: DatasetId;
};
declare const VariantInSilicoPredictors: ({ variant, datasetId }: Props) => React.JSX.Element;
export default VariantInSilicoPredictors;
