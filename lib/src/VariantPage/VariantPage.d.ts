import React from 'react';
import { DatasetId, ReferenceGenome } from '../../dataset-metadata/metadata';
import { PopulationIdAndChromosome } from '../../dataset-metadata/gnomadPopulations';
import { Filter } from '../QCFilter';
export type NonCodingConstraint = {
    chrom: string;
    start: number;
    stop: number;
    element_id: string;
    possible: number;
    observed: number;
    expected: number;
    oe: number;
    z: number;
    coding_prop: number;
};
export type ClinvarSubmission = {
    clinical_significance: string;
    conditions: {
        medgen_id?: string;
        name: string;
    }[];
    last_evaluated: string;
    review_status: string;
    submitter_name: string;
};
export type ClinvarVariant = {
    clinical_significance: string;
    clinvar_variation_id: string;
    gold_stars: number;
    last_evaluated: string | null;
    release_date: string;
    review_status: string;
    submissions: ClinvarSubmission[];
    gnomad: null | {
        exome: null | {
            ac: number;
            an: number;
            filters: string[];
        };
        genome: null | {
            ac: number;
            an: number;
            filters: string[];
        };
    };
    hgvsc: null | string;
    hgvsp: null | string;
    in_gnomad: boolean;
    major_consequence: null | string;
    pos: number;
    transcript_id: string;
    variant_id: string;
};
export type StructuralVariant = {
    id: string;
    ac: number;
    an: number;
    homozygote_count: number | null;
    hemizygote_count: number | null;
    ac_hemi: number | null;
    ac_hom: number | null;
};
export type CopyNumberVariant = {
    id: string;
    sc: number;
    sn: number;
};
export type Histogram = {
    bin_edges: number[];
    bin_freq: number[];
    n_smaller: number;
    n_larger: number;
};
export type Population = {
    id: PopulationIdAndChromosome;
    ac: number;
    an: number;
    ac_hemi: number | null;
    ac_hom: number;
    hemizygote_count?: number | null;
    homozygote_count?: number;
};
export type LocalAncestryPopulation = {
    id: string;
    ac: number;
    an: number;
};
export type AgeDistribution = {
    het: Histogram;
    hom: Histogram;
};
export type SiteQualityMetric = {
    metric: string;
    value: number | null;
};
export type VariantQualityMetrics = {
    allele_balance: {
        alt: Histogram;
    };
    genotype_depth: {
        all: Histogram;
        alt: Histogram;
    };
    genotype_quality: {
        all: Histogram;
        alt: Histogram;
    };
    site_quality_metrics: SiteQualityMetric[];
};
export type Faf95 = {
    popmax: number | null;
    popmax_population: string | null;
};
type BaseSequencingType = {
    ac: number;
    an: number;
    homozygote_count: number;
    hemizygote_count: number;
    faf95: Faf95;
    filters: Filter[];
    populations: Population[];
    age_distribution: AgeDistribution | null;
};
export type SequencingType = BaseSequencingType & {
    quality_metrics: VariantQualityMetrics;
    local_ancestry_populations: LocalAncestryPopulation[];
    ac_hom: number;
    ac_hemi: number;
    af?: number;
};
export type JointSequencingType = BaseSequencingType & {
    freq_comparison_stats: {
        contingency_table_test: {
            p_value: number;
            odds_ratio: number;
        }[];
        cochran_mantel_haenszel_test: {
            chisq: number;
            p_value: number;
        };
        stat_union: {
            p_value: number;
            stat_test_name: string;
            gen_ancs: string[];
        };
    };
};
export type LofCuration = {
    gene_id: string;
    gene_version: string;
    gene_symbol: string | null;
    verdict: string;
    flags: string[] | null;
    project: string;
};
export type InSilicoPredictor = {
    id: string;
    value: string;
    flags: string[];
};
export type TranscriptConsequence = {
    consequence_terms: string[];
    domains: string[];
    gene_id: string;
    gene_version: string | null;
    gene_symbol: string | null;
    hgvs: string | null;
    hgvsc: string | null;
    hgvsp: string | null;
    is_canonical: boolean | null;
    is_mane_select: boolean | null;
    is_mane_select_version: boolean | null;
    lof: string | null;
    lof_flags: string | null;
    lof_filter: string | null;
    major_consequence: string | null;
    polyphen_prediction: string | null;
    refseq_id: string | null;
    refseq_version: string | null;
    sift_prediction: string | null;
    transcript_id: string;
    transcript_version: string;
    canonical: boolean | null;
};
export type Coverage = {
    pos: number;
    mean: number | null;
    median: number | null;
    over_1: number | null;
    over_5: number | null;
    over_10: number | null;
    over_15: number | null;
    over_20: number | null;
    over_25: number | null;
    over_30: number | null;
    over_50: number | null;
    over_100: number | null;
};
type Liftover = {
    liftover: {
        variant_id: string;
    };
    datasets: string[];
};
type LiftoverSource = {
    source: {
        variant_id: string;
    };
    datasets: string[];
};
export type Variant = {
    variant_id: string;
    reference_genome: ReferenceGenome;
    colocated_variants: string[] | null;
    faf95_joint: Faf95;
    chrom: string;
    pos: number;
    ref: string;
    alt: string;
    flags: string[] | null;
    clinvar: ClinvarVariant | null;
    exome: SequencingType | null;
    genome: SequencingType | null;
    joint: JointSequencingType | null;
    lof_curations: LofCuration[] | null;
    in_silico_predictors: InSilicoPredictor[] | null;
    transcript_consequences: TranscriptConsequence[] | null;
    liftover: Liftover[] | null;
    liftover_sources: LiftoverSource[] | null;
    multi_nucleotide_variants?: any[];
    caid: string | null;
    rsids: string[] | null;
    coverage: {
        exome: Coverage | null;
        genome: Coverage | null;
    };
    non_coding_constraint: NonCodingConstraint | null;
};
type VariantPageContentProps = {
    datasetId: DatasetId;
    variant: Variant;
};
export declare const VariantPageContent: ({ datasetId, variant }: VariantPageContentProps) => React.JSX.Element;
type VariantPageProps = {
    datasetId: DatasetId;
    variantId: string;
};
declare const VariantPage: ({ datasetId, variantId }: VariantPageProps) => React.JSX.Element;
export default VariantPage;
