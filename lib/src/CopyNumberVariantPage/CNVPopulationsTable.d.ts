import React, { Component } from 'react';
import { CopyNumberVariant } from './CopyNumberVariantPage';
type OwnPopulationsTableProps = {
    columnLabels?: {
        sc?: string;
        sn?: string;
        sf?: string;
    };
    populations: {
        id: string;
        name: string;
        sc: number;
        sn: number;
        subpopulations?: {
            id: string;
            name: string;
            sc: number;
            sn: number;
        }[];
    }[];
    initiallyExpandRows?: boolean;
    variant: CopyNumberVariant;
};
type CNVPopulationsTableState = any;
type CNVPopulationsTableProps = OwnPopulationsTableProps & typeof CNVPopulationsTable.defaultProps;
export declare class CNVPopulationsTable extends Component<CNVPopulationsTableProps & {
    variant: CopyNumberVariant;
}, CNVPopulationsTableState> {
    static defaultProps: {
        columnLabels: {};
        initiallyExpandRows: boolean;
        variant: {};
    };
    constructor(props: CNVPopulationsTableProps);
    setSortBy(sortBy: any): void;
    togglePopulationExpanded(populationName: string): void;
    renderColumnHeader({ key, label, tooltip, props }: any): React.JSX.Element;
    renderPopulationRowHeader(pop: any): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
