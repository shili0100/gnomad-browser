import React from 'react';
type MitochondrialVariantsProps = {
    clinvarReleaseDate: string;
    context: any;
    exportFileName: string;
    variants: StructrualVariantPropType[];
};
declare const MitochondrialVariants: ({ clinvarReleaseDate, context, exportFileName, variants, }: MitochondrialVariantsProps) => React.JSX.Element;
export default MitochondrialVariants;
