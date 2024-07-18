import React from 'react';
export type ExacConstraint = {
    exp_syn: number;
    obs_syn: number;
    syn_z: number;
    exp_mis: number;
    obs_mis: number;
    mis_z: number;
    exp_lof: number;
    obs_lof: number;
    pLI: number;
};
type Props = {
    constraint: ExacConstraint;
};
declare const ExacConstraintTable: ({ constraint }: Props) => React.JSX.Element;
export default ExacConstraintTable;
