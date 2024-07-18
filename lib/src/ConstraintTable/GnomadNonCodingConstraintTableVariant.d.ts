import React from 'react';
import { NonCodingConstraint } from '../VariantPage/VariantPage';
type Props = {
    variantId: string;
    chrom: string;
    nonCodingConstraint: NonCodingConstraint | null;
};
declare const GnomadNonCodingConstraintTableVariant: ({ variantId, chrom, nonCodingConstraint, }: Props) => React.JSX.Element;
export default GnomadNonCodingConstraintTableVariant;
