import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Variant } from './VariantPage';
type GnomadVariantOccurrenceTableProps = {
    datasetId: DatasetId;
    showExomes?: boolean;
    showGenomes?: boolean;
    variant: Variant;
};
export declare const GnomadVariantOccurrenceTable: {
    ({ datasetId, showExomes, showGenomes, variant, }: GnomadVariantOccurrenceTableProps): React.JSX.Element;
    defaultProps: {
        showExomes: boolean;
        showGenomes: boolean;
    };
};
export {};
