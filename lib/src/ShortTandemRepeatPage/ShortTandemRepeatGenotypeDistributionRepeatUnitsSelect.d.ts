import React from 'react';
type Props = {
    shortTandemRepeatOrAdjacentRepeat: {
        id: string;
        associated_diseases?: any[];
        reference_repeat_unit: string;
        genotype_distribution: {
            repeat_units: {
                repeat_units?: string[];
            }[];
        };
        repeat_units: any[];
    };
    value: string;
    onChange: (...args: any[]) => any;
};
declare const ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect: ({ shortTandemRepeatOrAdjacentRepeat, value, onChange, }: Props) => React.JSX.Element;
export default ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect;
