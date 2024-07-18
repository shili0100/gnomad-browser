import React from 'react';
export type SeriesLegendProps = {
    color?: string;
    label: string;
    swatch?: React.ReactNode;
};
type LegendProps = {
    series: SeriesLegendProps[];
};
declare const Legend: ({ series }: LegendProps) => React.JSX.Element;
export default Legend;
type StripedSwatchProps = {
    id: string;
    color: string;
};
export declare const StripedSwatch: ({ id, color }: StripedSwatchProps) => React.JSX.Element;
