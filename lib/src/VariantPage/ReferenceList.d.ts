import React from 'react';
type Props = {
    variant: {
        variant_id: string;
        reference_genome: 'GRCh37' | 'GRCh38';
        chrom: string;
        pos: number;
        ref: string;
        caid?: string;
        rsids?: string[];
        clinvar?: {
            clinvar_variation_id: string;
        };
    };
};
export declare const NcbiReference: (variantRsids: string[]) => React.JSX.Element;
export declare const ClinvarReference: (variantClinvarVariationId: string) => React.JSX.Element;
export declare const ReferenceList: ({ variant }: Props) => React.JSX.Element;
export {};
