import React from 'react';
type Flag = {
    label: string;
    level: 'info' | 'warning' | 'error' | 'success' | undefined;
    formatTooltip: (input: any) => string;
};
export declare const FLAGS_CONFIG: Record<string, Flag>;
type Props = {
    type: string;
    variant: any;
};
declare const VariantFlag: ({ type, variant }: Props) => React.JSX.Element | null;
export default VariantFlag;
