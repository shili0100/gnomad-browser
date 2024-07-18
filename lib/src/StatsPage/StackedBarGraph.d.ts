import React, { ReactNode } from 'react';
type DataRow = {
    label: string;
    [x: string]: number | string;
};
declare const StackedBarGraphWithLegend: ({ title, barColors, barValues, formatTooltip, height, xLabel, yLabel, displayNumbers, }: {
    title: string;
    barColors: {
        [x: string]: string;
    };
    barValues: DataRow[];
    formatTooltip: (row: DataRow) => string | ReactNode;
    height: number;
    xLabel: string;
    yLabel: string;
    displayNumbers: boolean;
}) => React.JSX.Element;
export default StackedBarGraphWithLegend;
