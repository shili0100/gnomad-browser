import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
export declare const heterozygousVariantCooccurrenceSeverities: readonly ["lof_lof", "lof_strong_revel_missense_or_worse", "lof_moderate_revel_missense_or_worse", "lof_supporting_revel_missense_or_worse", "strong_revel_missense_or_worse_strong_revel_missense_or_worse", "strong_revel_missense_or_worse_moderate_revel_missense_or_worse", "strong_revel_missense_or_worse_supporting_revel_missense_or_worse", "moderate_revel_missense_or_worse_moderate_revel_missense_or_worse", "missense_or_worse_missense_or_worse", "synonymous_or_worse_synonymous_or_worse", "supporting_revel_missense_or_worse_supporting_revel_missense_or_worse"];
export declare const homozygousVariantCooccurrenceSeverities: readonly ["lof", "strong_revel_missense_or_worse", "moderate_revel_missense_or_worse", "supporting_revel_missense_or_worse", "missense_or_worse", "synonymous_or_worse"];
export declare const heterozygousVariantCooccurrenceAfCutoffs: readonly ["af_cutoff_0_05", "af_cutoff_0_02", "af_cutoff_0_015", "af_cutoff_0_01", "af_cutoff_0_005"];
export declare const homozygousVariantCooccurrenceAfCutoffs: readonly ["af_cutoff_0_05", "af_cutoff_0_01", "af_cutoff_0_005"];
export type VariantCooccurrenceCountsPerSeverityAndAf<Severities extends VariantCooccurrenceSeverity, AfCutoffs extends VariantCooccurrenceAfCutoff, CountCellSchema> = Partial<Record<Severities, Partial<Record<AfCutoffs, CountCellSchema>>>>;
export type HeterozygousVariantCooccurrenceAfCutoff = (typeof heterozygousVariantCooccurrenceAfCutoffs)[number];
export type HeterozygousVariantCooccurrenceSeverity = (typeof heterozygousVariantCooccurrenceSeverities)[number];
export type HeterozygousCountCellSchema = {
    in_cis: number;
    in_trans: number;
    unphased: number;
    two_het_total: number;
};
export type HeterozygousVariantCooccurrenceCountsPerSeverityAndAf = VariantCooccurrenceCountsPerSeverityAndAf<HeterozygousVariantCooccurrenceSeverity, HeterozygousVariantCooccurrenceAfCutoff, HeterozygousCountCellSchema>;
export type HomozygousVariantCooccurrenceAfCutoff = (typeof homozygousVariantCooccurrenceAfCutoffs)[number];
export type HomozygousVariantCooccurrenceSeverity = (typeof homozygousVariantCooccurrenceSeverities)[number];
export type HomozygousCountCellSchema = {
    hom_total: number;
};
export type HomozygousVariantCooccurrenceCountsPerSeverityAndAf = VariantCooccurrenceCountsPerSeverityAndAf<HomozygousVariantCooccurrenceSeverity, HomozygousVariantCooccurrenceAfCutoff, HomozygousCountCellSchema>;
export type VariantCooccurrenceSeverity = HeterozygousVariantCooccurrenceSeverity | HomozygousVariantCooccurrenceSeverity;
export type VariantCooccurrenceAfCutoff = HeterozygousVariantCooccurrenceAfCutoff | HomozygousVariantCooccurrenceAfCutoff;
declare const VariantCooccurrenceCountsTable: ({ datasetId, heterozygous_variant_cooccurrence_counts, homozygous_variant_cooccurrence_counts, }: {
    datasetId: DatasetId;
    heterozygous_variant_cooccurrence_counts: HeterozygousVariantCooccurrenceCountsPerSeverityAndAf;
    homozygous_variant_cooccurrence_counts: HomozygousVariantCooccurrenceCountsPerSeverityAndAf;
}) => React.JSX.Element;
export default VariantCooccurrenceCountsTable;
