import React from 'react';
import { StructuralVariant } from '../StructuralVariantPage/StructuralVariantPage';
export interface Context {
    chrom: string;
}
type StructuralVariantsProps = {
    context: Context;
    exportFileName: string;
    variants: StructuralVariant[];
};
declare const StructuralVariants: ({ context, exportFileName, variants }: StructuralVariantsProps) => React.JSX.Element;
export default StructuralVariants;
