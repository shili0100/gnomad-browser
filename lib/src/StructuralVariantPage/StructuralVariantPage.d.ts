import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { Histogram } from '../VariantPage/VariantPage';
export type StructuralVariant = {
    age_distribution: {
        het: Histogram;
        hom: Histogram;
    } | null;
    algorithms: string[] | null;
    alts: string[] | null;
    ac: number;
    an: number;
    af: number;
    homozygote_count: number | null;
    hemizygote_count: number | null;
    chrom: string;
    chrom2: string | null;
    major_consequence: string | null;
    consequences: {
        consequence: string;
        genes: string[] | null;
    }[] | null;
    copy_numbers: {
        copy_number: number;
        ac: number;
    }[] | null;
    cpx_intervals: string[] | null;
    cpx_type: string | null;
    end: number;
    end2: number | null;
    evidence: string[] | null;
    filters: string[] | null;
    genes: string[] | null;
    genotype_quality: {
        all: Histogram | null;
        alt: Histogram | null;
    } | null;
    length: number | null;
    populations: {
        id: string;
        ac: number;
        an: number;
        homozygote_count: number | null;
        hemizygote_count: number | null;
        ac_hemi: number | null;
        ac_hom: number | null;
    }[] | null;
    pos: number;
    pos2: number | null;
    qual: number | null;
    type: string | null;
    variant_id: string;
    consequence: string | null;
    ac_hom: number | null;
    ac_hemi: number | null;
};
type ConnectedStructuralVariantPageProps = {
    datasetId: DatasetId;
    variantId: string;
};
declare const ConnectedStructuralVariantPage: ({ datasetId, variantId, }: ConnectedStructuralVariantPageProps) => React.JSX.Element;
export default ConnectedStructuralVariantPage;
