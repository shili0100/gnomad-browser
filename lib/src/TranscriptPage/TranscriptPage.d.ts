import React from 'react';
import { DatasetId, ReferenceGenome } from '../../dataset-metadata/metadata';
import { GeneMetadata, Strand } from '../GenePage/GenePage';
import { GnomadConstraint } from '../ConstraintTable/GnomadConstraintTable';
import { ExacConstraint } from '../ConstraintTable/ExacConstraintTable';
import { GtexTissueExpression } from '../GenePage/TranscriptsTissueExpression';
import { Variant, ClinvarVariant } from '../VariantPage/VariantPage';
import { MitochondrialVariant } from '../MitochondrialVariantPage/MitochondrialVariantPage';
export type Exon = {
    feature_type: string;
    start: number;
    stop: number;
};
export type Transcript = {
    transcript_id: string;
    transcript_version: string;
    reference_genome: ReferenceGenome;
    chrom: string;
    strand: Strand;
    start: number;
    stop: number;
    exons: Exon[];
    gnomad_constraint: GnomadConstraint | null;
    exac_constraint: ExacConstraint | null;
    gene: GeneMetadata;
    gtex_tissue_expression: GtexTissueExpression | null;
    variants: Variant[];
    mitochondrial_variants: MitochondrialVariant[];
    clinvar_variants: ClinvarVariant[];
};
type Props = {
    datasetId: DatasetId;
    transcript: Transcript;
};
declare const TranscriptPage: ({ datasetId, transcript }: Props) => React.JSX.Element;
export default TranscriptPage;
