import React from 'react';
export declare const renderRoundedNumber: (num: number | null, { precision, tooltipPrecision, highlightColor, formatTooltip, }?: {
    precision?: number | undefined;
    tooltipPrecision?: number | undefined;
    highlightColor?: string | null | undefined;
    formatTooltip?: ((n: number) => string) | undefined;
}) => React.JSX.Element | "—";
