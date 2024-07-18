import React, { Component } from 'react';
import { MitochondrialVariant } from './MitochondrialVariantPage';
type Props = {
    variant: MitochondrialVariant;
};
type HaplogroupWithAf = MitochondrialVariant['haplogroups'][number] & {
    af_hom: number;
    af_het: number;
};
type State = {
    showAC0Haplogroups: boolean;
    sortBy: keyof HaplogroupWithAf;
    sortAscending: boolean;
};
declare class MitochondrialVariantHaplogroupFrequenciesTable extends Component<Props, State> {
    state: State;
    setSortBy(sortBy: any): void;
    renderColumnHeader(key: any, label: any, tooltip: any): React.JSX.Element;
    render(): React.JSX.Element;
}
export default MitochondrialVariantHaplogroupFrequenciesTable;
