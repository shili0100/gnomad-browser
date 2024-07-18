import React from 'react';
import { StructuralVariant } from './StructuralVariantPage';
import { DatasetId } from '../../dataset-metadata/metadata';
type SVReferenceListProps = {
    variant: StructuralVariant;
    datasetId: DatasetId;
};
export declare const SVReferenceList: ({ variant, datasetId }: SVReferenceListProps) => React.JSX.Element;
export default SVReferenceList;
