import React, { Component } from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Population } from './VariantPage';
type OwnGnomadPopulationsTableProps = {
    datasetId: DatasetId;
    exomePopulations: Population[];
    genomePopulations: Population[];
    jointPopulations: Population[] | null;
    showHemizygotes?: boolean;
    showHomozygotes?: boolean;
};
type GnomadPopulationsTableState = any;
type GnomadPopulationsTableProps = OwnGnomadPopulationsTableProps & typeof GnomadPopulationsTable.defaultProps;
export declare class GnomadPopulationsTable extends Component<GnomadPopulationsTableProps, GnomadPopulationsTableState> {
    static defaultProps: {
        showHemizygotes: boolean;
        showHomozygotes: boolean;
    };
    constructor(props: GnomadPopulationsTableProps);
    render(): React.JSX.Element;
}
export {};
