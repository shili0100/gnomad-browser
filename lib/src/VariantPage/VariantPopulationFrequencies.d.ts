import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Variant } from './VariantPage';
type Props = {
    datasetId: DatasetId;
    variant: Variant;
};
declare const VariantPopulationFrequencies: ({ datasetId, variant }: Props) => React.JSX.Element;
export default VariantPopulationFrequencies;
