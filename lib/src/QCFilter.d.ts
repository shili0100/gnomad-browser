import React from 'react';
export type Filter = 'AC0' | 'AS_VQSR' | 'InbreedingCoeff' | 'RF' | 'discrepant_frequencies' | 'not_called_in_exomes' | 'not_called_in_genomes';
type Props = {
    filter: Filter;
    data?: any;
};
declare const QCFilter: ({ filter, data }: Props) => React.JSX.Element;
export default QCFilter;
