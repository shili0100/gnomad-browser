import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Variant } from './VariantPage';
type GnomadAgeDistributionProps = {
    datasetId: DatasetId;
    variant: Variant;
};
declare const GnomadAgeDistribution: ({ datasetId, variant }: GnomadAgeDistributionProps) => React.JSX.Element;
export default GnomadAgeDistribution;
