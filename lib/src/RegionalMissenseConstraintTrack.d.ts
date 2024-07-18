import React from 'react';
import { Gene } from './GenePage/GenePage';
type RegionalMissenseConstraintRegion = {
    chrom: string;
    start: number;
    stop: number;
    region_start: number;
    region_stop: number;
    aa_start: string | null;
    aa_stop: string | null;
    obs_mis: number | undefined;
    exp_mis: number;
    obs_exp: number;
    chisq_diff_null: number | undefined;
    p_value: number;
    z_score: number | undefined;
};
export declare const regionIntersections: (regionArrays: {
    start: number;
    stop: number;
}[][]) => RegionalMissenseConstraintRegion[];
export type RegionalMissenseConstraint = {
    has_no_rmc_evidence: boolean;
    passed_qc: boolean;
    regions: RegionalMissenseConstraintRegion[];
};
type Props = {
    regionalMissenseConstraint?: RegionalMissenseConstraint;
    gene: Gene;
};
declare const RegionalMissenseConstraintTrack: {
    ({ regionalMissenseConstraint, gene }: Props): React.JSX.Element;
    defaultProps: {
        height: number;
    };
};
export default RegionalMissenseConstraintTrack;
