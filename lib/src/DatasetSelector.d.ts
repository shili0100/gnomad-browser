import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { DatasetId } from '../dataset-metadata/metadata';
export type URLBuilder = (currentLocation: Location, targetDatasetId: DatasetId) => Location;
export type DatasetOptions = {
    includeShortVariants?: boolean;
    includeStructuralVariants?: boolean;
    includeExac?: boolean;
    includeGnomad2?: boolean;
    includeGnomad2Subsets?: boolean;
    includeGnomad3?: boolean;
    includeGnomad3Subsets?: boolean;
    includeGnomad4?: boolean;
    includeGnomad4Subsets?: boolean;
    includeCopyNumberVariants?: boolean;
    urlBuilder?: URLBuilder;
};
type DatasetSelectorProps = {
    datasetOptions: DatasetOptions;
    selectedDataset: DatasetId;
    history: History;
};
declare const DatasetSelector: React.ComponentClass<Pick<RouteComponentProps<{}, import("react-router").StaticContext, unknown> & DatasetSelectorProps, "datasetOptions" | "selectedDataset">, any> & import("react-router").WithRouterStatics<(props: DatasetSelectorProps) => React.JSX.Element>;
export default DatasetSelector;
