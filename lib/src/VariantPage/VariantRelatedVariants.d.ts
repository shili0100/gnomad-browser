import React from 'react';
import { Variant } from './VariantPage';
type VariantRelatedVariantsProps = {
    datasetId: string;
    variant: Variant;
};
declare const VariantRelatedVariants: ({ datasetId, variant }: VariantRelatedVariantsProps) => React.JSX.Element;
export default VariantRelatedVariants;
