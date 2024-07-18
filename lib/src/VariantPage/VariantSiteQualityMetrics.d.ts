import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Variant } from './VariantPage';
type VariantSiteQualityMetricsProps = {
    datasetId: DatasetId;
    variant: Variant;
};
declare const VariantSiteQualityMetrics: ({ datasetId, variant }: VariantSiteQualityMetricsProps) => React.JSX.Element;
export default VariantSiteQualityMetrics;
