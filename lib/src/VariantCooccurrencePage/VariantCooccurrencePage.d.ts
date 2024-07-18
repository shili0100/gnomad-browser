import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
export type GenotypeCounts = {
    ref_ref: number;
    ref_het: number;
    ref_hom: number;
    het_ref: number;
    het_het: number;
    het_hom: number;
    hom_ref: number;
    hom_het: number;
    hom_hom: number;
};
export type HaplotypeCounts = {
    ref_ref: number;
    hom_ref: number;
    ref_hom: number;
    hom_hom: number;
};
export type CooccurrenceData = {
    variant_ids: string[];
    genotype_counts: GenotypeCounts;
    haplotype_counts: HaplotypeCounts;
    p_compound_heterozygous: number | null;
    populations: {
        id: string;
        genotype_counts: GenotypeCounts;
        haplotype_counts: HaplotypeCounts;
        p_compound_heterozygous: number | null;
    }[];
};
export interface CooccurrenceForPopulation {
    genotype_counts: GenotypeCounts;
    haplotype_counts: HaplotypeCounts;
    p_compound_heterozygous: number | null;
}
export declare const cisThreshold = 0.02;
export declare const transThreshold = 0.55;
export declare const noPredictionPossible: ({ genotype_counts, p_compound_heterozygous, }: CooccurrenceForPopulation) => boolean;
type VariantCoocurrencePageProps = {
    datasetId: DatasetId;
};
declare const VariantCoocurrencePage: ({ datasetId }: VariantCoocurrencePageProps) => React.JSX.Element;
export default VariantCoocurrencePage;
