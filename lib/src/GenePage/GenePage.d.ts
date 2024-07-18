import React from 'react';
import { DatasetId, ReferenceGenome } from '../../dataset-metadata/metadata';
import { HeterozygousVariantCooccurrenceCountsPerSeverityAndAf, HomozygousVariantCooccurrenceCountsPerSeverityAndAf } from './VariantCooccurrenceCountsTable';
import { RegionalMissenseConstraint } from '../RegionalMissenseConstraintTrack';
import { GnomadConstraint } from '../ConstraintTable/GnomadConstraintTable';
import { ExacConstraint } from '../ConstraintTable/ExacConstraintTable';
import { Variant, ClinvarVariant, StructuralVariant, CopyNumberVariant } from '../VariantPage/VariantPage';
export type Strand = '+' | '-';
export type GeneMetadata = {
    gene_id: string;
    gene_version: string;
    symbol: string;
    mane_select_transcript?: {
        ensembl_id: string;
        ensembl_version: string;
        refseq_id: string;
        refseq_version: string;
    };
    canonical_transcript_id: string | null;
    flags: string[];
};
export type Gene = GeneMetadata & {
    reference_genome: ReferenceGenome;
    name?: string;
    chrom: string;
    strand: Strand;
    start: number;
    stop: number;
    exons: {
        feature_type: string;
        start: number;
        stop: number;
    }[];
    transcripts: {
        transcript_id: string;
        transcript_version: string;
        exons: {
            feature_type: string;
            start: number;
            stop: number;
        }[];
    }[];
    flags: string[];
    gnomad_constraint?: GnomadConstraint;
    exac_constraint?: ExacConstraint;
    pext?: {
        regions: {
            start: number;
            stop: number;
            mean: number;
            tissues: {
                [key: string]: number;
            };
        }[];
        flags: string[];
    };
    short_tandem_repeats?: {
        id: string;
    }[];
    exac_regional_missense_constraint_regions?: any;
    gnomad_v2_regional_missense_constraint?: RegionalMissenseConstraint;
    variants: Variant[];
    structural_variants: StructuralVariant[];
    copy_number_variants: CopyNumberVariant[];
    clinvar_variants: ClinvarVariant[];
    homozygous_variant_cooccurrence_counts: HomozygousVariantCooccurrenceCountsPerSeverityAndAf;
    heterozygous_variant_cooccurrence_counts: HeterozygousVariantCooccurrenceCountsPerSeverityAndAf;
};
type Props = {
    datasetId: DatasetId;
    gene: Gene;
    geneId: string;
};
declare const GenePage: ({ datasetId, gene, geneId }: Props) => React.JSX.Element;
export default GenePage;
