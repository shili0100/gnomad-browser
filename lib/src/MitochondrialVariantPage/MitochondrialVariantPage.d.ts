import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
import { PopulationId } from '../../dataset-metadata/gnomadPopulations';
import { ClinvarVariant, Histogram, TranscriptConsequence } from '../VariantPage/VariantPage';
import { MitotipTrnaPrediction, PonMtTrnaPrediction } from './MitochondrialVariantTranscriptConsequence';
export type GenotypeQualityFilter = {
    name: string;
    filtered: Histogram | null;
};
export type MitochondrialVariant = {
    alt: string;
    an: number;
    ac_hom: number;
    ac_hom_mnv: number;
    age_distribution: {
        het: Histogram;
        hom: Histogram;
    };
    ac_het: number;
    excluded_ac: number | null;
    flags: string[] | null;
    haplogroup_defining: boolean | null;
    haplogroups: {
        id: string;
        an: number;
        ac_hom: number;
        ac_het: number;
    }[];
    max_heteroplasmy: number | null;
    populations: {
        id: PopulationId;
        an: number;
        ac_het: number;
        ac_hom: number;
    }[];
    pos: number;
    ref: string;
    reference_genome: string;
    variant_id: string;
    rsids: string[] | null;
    clinvar: ClinvarVariant | null;
    site_quality_metrics: {
        name: string;
        value: number | null;
    }[];
    genotype_quality_filters: GenotypeQualityFilter[];
    genotype_quality_metrics: {
        name: string;
        all: Histogram | null;
        alt: Histogram | null;
    }[];
    transcript_consequences: TranscriptConsequence[];
    heteroplasmy_distribution: Histogram;
    filters: string[] | null;
    mitotip_trna_prediction: MitotipTrnaPrediction | null;
    pon_mt_trna_prediction: PonMtTrnaPrediction | null;
    mitotip_score: number | null;
    pon_ml_probability_of_pathogenicity: number | null;
};
type ConnectedMitochondrialVariantPageProps = {
    datasetId: DatasetId;
    variantId: string;
};
declare const ConnectedMitochondrialVariantPage: ({ datasetId, variantId, }: ConnectedMitochondrialVariantPageProps) => React.JSX.Element;
export default ConnectedMitochondrialVariantPage;
