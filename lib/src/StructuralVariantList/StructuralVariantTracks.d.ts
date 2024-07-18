import React from 'react';
import { StructuralVariant } from '../StructuralVariantPage/StructuralVariantPage';
type StructuralVariantTracksProps = {
    forwardedRef: React.ForwardedRef<any> | null;
    highlightedVariant: string | null;
    numTracksRendered: number;
    onHover: (...args: any[]) => any;
    onScroll: (...args: any[]) => any;
    trackColor: (...args: any[]) => any;
    trackHeight: number;
    variants: StructuralVariant[];
};
declare const _default: React.ForwardRefExoticComponent<Omit<StructuralVariantTracksProps, "forwardedRef"> & React.RefAttributes<unknown>>;
export default _default;
