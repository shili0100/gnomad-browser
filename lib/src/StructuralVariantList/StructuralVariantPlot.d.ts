import React from 'react';
type Props = {
    color: string;
    isHighlighted: boolean;
    isPositionDefined: (...args: any[]) => any;
    scalePosition: (...args: any[]) => any;
    variant: {
        pos: number;
        end: number;
        type: string | null;
    };
    width: number;
};
declare const StructuralVariantPlot: ({ color, isHighlighted, isPositionDefined, scalePosition, variant, width, }: Props) => React.JSX.Element;
export default StructuralVariantPlot;
