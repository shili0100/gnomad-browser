import React from 'react';
import { DatasetOptions } from './DatasetSelector';
import { DatasetId } from '../dataset-metadata/metadata';
type Props = {
    children: React.ReactNode;
    extra?: React.ReactNode;
    datasetOptions: DatasetOptions;
    selectedDataset: DatasetId;
};
declare const GnomadPageHeading: {
    ({ children, extra, datasetOptions, selectedDataset }: Props): React.JSX.Element;
    defaultProps: {
        extra: undefined;
    };
};
export default GnomadPageHeading;
