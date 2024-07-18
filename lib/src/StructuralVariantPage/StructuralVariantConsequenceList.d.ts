import React, { Component } from 'react';
import { StructuralVariant } from './StructuralVariantPage';
type Props = {
    variant: StructuralVariant;
};
type State = any;
declare class StructuralVariantConsequenceList extends Component<Props, State> {
    state: {
        expandedConsequence: null;
    };
    render(): React.JSX.Element;
}
export default StructuralVariantConsequenceList;
