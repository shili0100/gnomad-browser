import React from 'react';
type ClinvarVariantDetailsContainerProps = {
    referenceGenome: 'GRCh37' | 'GRCh38';
    variantId: string;
};
declare const ClinvarVariantDetailsContainer: ({ referenceGenome, variantId, }: ClinvarVariantDetailsContainerProps) => React.JSX.Element;
export default ClinvarVariantDetailsContainer;
