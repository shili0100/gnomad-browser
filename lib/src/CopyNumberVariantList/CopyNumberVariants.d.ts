import React from 'react';
import CopyNumberVariantPropType from './CopyNumberVariantPropType';
export interface Context {
    chrom: string;
}
type CopyNumberVariantsProps = {
    context: Context;
    exportFileName: string;
    variants: CopyNumberVariantPropType[];
};
declare const CopyNumberVariants: ({ context, exportFileName, variants }: CopyNumberVariantsProps) => React.JSX.Element;
export default CopyNumberVariants;
