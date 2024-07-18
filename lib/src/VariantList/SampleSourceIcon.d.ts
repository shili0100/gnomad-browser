import React from 'react';
type Props = {
    source: 'exome' | 'genome';
    filters: string[];
};
declare const SampleSourceIcon: ({ source, filters }: Props) => React.JSX.Element;
export default SampleSourceIcon;
