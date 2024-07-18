import React from 'react';
import { MNVConsequencePropType } from './MNVConsequence';
type Props = {
    variant: {
        consequences: MNVConsequencePropType[];
    };
};
declare const MNVConsequenceList: ({ variant }: Props) => React.JSX.Element;
export default MNVConsequenceList;
