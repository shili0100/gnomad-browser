import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { VariantFilterState } from './filterVariants';
import { Variant } from '../VariantPage/VariantPage';
import { Gene } from '../GenePage/GenePage';
type OwnVariantsProps = {
    children?: any;
    clinvarReleaseDate: string;
    context: Gene;
    datasetId: DatasetId;
    exportFileName?: string;
    variants: Variant[];
};
declare const variantsDefaultProps: {
    children: null;
    exportFileName: string;
};
type VariantsProps = OwnVariantsProps & typeof variantsDefaultProps;
export declare function getFirstIndexFromSearchText(searchFilter: VariantFilterState, variantSearched: Variant[], variantsTableColumns: any, variantWindow: number[]): number;
declare const Variants: {
    ({ children, clinvarReleaseDate, context, datasetId, exportFileName, variants, }: VariantsProps): React.JSX.Element;
    defaultProps: {
        children: null;
        exportFileName: string;
    };
};
export default Variants;
