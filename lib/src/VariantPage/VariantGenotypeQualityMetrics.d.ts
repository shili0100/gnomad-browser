import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Variant } from './VariantPage';
type VariantGenotypeQualityMetricsProps = {
    datasetId: DatasetId;
    variant: Variant;
};
declare const VariantGenotypeQualityMetrics: ({ datasetId, variant, }: VariantGenotypeQualityMetricsProps) => React.JSX.Element;
export default VariantGenotypeQualityMetrics;
