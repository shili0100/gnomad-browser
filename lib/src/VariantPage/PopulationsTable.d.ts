import React, { Component } from 'react';
type OwnPopulationsTableProps = {
    columnLabels?: {
        ac?: string;
        an?: string;
        af?: string;
    };
    populations: {
        name: string;
        ac: number;
        an: number;
        ac_hemi?: number;
        ac_hom?: number;
        subpopulations?: {
            name: string;
            ac: number;
            an: number;
            ac_hemi?: number;
            ac_hom?: number;
        }[];
    }[];
    showHemizygotes?: boolean;
    showHomozygotes?: boolean;
    initiallyExpandRows?: boolean;
};
type PopulationsTableState = any;
type PopulationsTableProps = OwnPopulationsTableProps & typeof PopulationsTable.defaultProps;
export declare class PopulationsTable extends Component<PopulationsTableProps, PopulationsTableState> {
    static defaultProps: {
        columnLabels: {};
        showHemizygotes: boolean;
        showHomozygotes: boolean;
        initiallyExpandRows: boolean;
    };
    constructor(props: PopulationsTableProps);
    setSortBy(sortBy: any): void;
    togglePopulationExpanded(populationName: any): void;
    renderColumnHeader({ key, label, tooltip, props }: any): React.JSX.Element;
    renderPopulationRowHeader(pop: any): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
