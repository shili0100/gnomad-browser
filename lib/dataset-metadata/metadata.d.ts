export type ReferenceGenome = 'GRCh37' | 'GRCh38';
export declare const datasetLabels: {
    readonly exac: "ExAC";
    readonly gnomad_r2_1: "gnomAD v2.1.1";
    readonly gnomad_r2_1_controls: "gnomAD v2.1.1 (controls)";
    readonly gnomad_r2_1_non_cancer: "gnomAD v2.1.1 (non-cancer)";
    readonly gnomad_r2_1_non_neuro: "gnomAD v2.1.1 (non-neuro)";
    readonly gnomad_r2_1_non_topmed: "gnomAD v2.1.1 (non-TOPMed)";
    readonly gnomad_r3: "gnomAD v3.1.2";
    readonly gnomad_r3_controls_and_biobanks: "gnomAD v3.1.2 (controls/biobanks)";
    readonly gnomad_r3_non_cancer: "gnomAD v3.1.2 (non-cancer)";
    readonly gnomad_r3_non_neuro: "gnomAD v3.1.2 (non-neuro)";
    readonly gnomad_r3_non_topmed: "gnomAD v3.1.2 (non-TOPMed)";
    readonly gnomad_r3_non_v2: "gnomAD v3.1.2 (non-v2)";
    readonly gnomad_sv_r2_1: "gnomAD SVs v2.1";
    readonly gnomad_sv_r2_1_controls: "gnomAD SVs v2.1 (controls)";
    readonly gnomad_sv_r2_1_non_neuro: "gnomAD SVs v2.1 (non-neuro)";
    readonly gnomad_sv_r4: "gnomAD SVs v4.1.0";
    readonly gnomad_cnv_r4: "gnomAD CNVs v4.1.0";
    readonly gnomad_r4: "gnomAD v4.1.0";
    readonly gnomad_r4_non_ukb: "gnomAD v4.1.0 (non-UKB)";
};
export type DatasetId = keyof typeof datasetLabels;
export declare const allDatasetIds: DatasetId[];
export type DatasetMetadata = {
    referenceGenome: ReferenceGenome;
    isSubset: boolean;
    hasShortVariants: boolean;
    hasStructuralVariants: boolean;
    hasCopyNumberVariants: boolean;
    hasCopyNumberVariantCoverage: boolean;
    hasConstraints: boolean;
    hasVariantCoocurrence: boolean;
    hasNonCodingConstraints: boolean;
    hasExome: boolean;
    genesHaveExomeCoverage: boolean;
    genesHaveGenomeCoverage: boolean;
    transcriptsHaveExomeCoverage: boolean;
    regionsHaveExomeCoverage: boolean;
    regionsHaveGenomeCoverage: boolean;
    hasLocalAncestryPopulations: boolean;
    isLiftoverSource: boolean;
    isLiftoverTarget: boolean;
    isV3Subset: boolean;
    usesGrch37: boolean;
    usesGrch38: boolean;
    isV2: boolean;
    isV3: boolean;
    isV4: boolean;
    isExac: boolean;
    isSVs: boolean;
    isV4SVs: boolean;
    isV4CNVs: boolean;
    hasV2Genome: boolean;
    metricsIncludeLowQualityGenotypes: boolean;
    has1000GenomesPopulationFrequencies: boolean;
    hasAlleleBalance: boolean;
    hasRelatedVariants: boolean;
    showAllIndividualsInAgeDistributionByDefault: boolean;
    hasExons: boolean;
    hasShortTandemRepeats: boolean;
    hasMitochondrialGenomeCoverage: boolean;
    hasMitochondrialVariants: boolean;
    hasNonCodingReadData: boolean;
    readsDatasetId: string;
    readsIncludeLowQualityGenotypes: boolean;
    coverageDatasetId: DatasetId;
    variantFeedbackDescription: string | null;
    shortVariantDatasetId: DatasetId;
    structuralVariantDatasetId: DatasetId;
    copyNumberVariantDatasetId: DatasetId;
    hasJointFrequencyData: boolean;
    hasVRSData: boolean;
};
export declare const isSubset: (datasetId: DatasetId) => boolean;
export declare const labelForDataset: (datasetId: DatasetId) => "ExAC" | "gnomAD v2.1.1" | "gnomAD v2.1.1 (controls)" | "gnomAD v2.1.1 (non-cancer)" | "gnomAD v2.1.1 (non-neuro)" | "gnomAD v2.1.1 (non-TOPMed)" | "gnomAD v3.1.2" | "gnomAD v3.1.2 (controls/biobanks)" | "gnomAD v3.1.2 (non-cancer)" | "gnomAD v3.1.2 (non-neuro)" | "gnomAD v3.1.2 (non-TOPMed)" | "gnomAD v3.1.2 (non-v2)" | "gnomAD SVs v2.1" | "gnomAD SVs v2.1 (controls)" | "gnomAD SVs v2.1 (non-neuro)" | "gnomAD SVs v4.1.0" | "gnomAD CNVs v4.1.0" | "gnomAD v4.1.0" | "gnomAD v4.1.0 (non-UKB)";
export declare const hasConstraints: (datsetId: DatasetId) => boolean;
export declare const hasVariantCoocurrence: (datasetId: DatasetId) => boolean;
export declare const hasNonCodingConstraints: (datasetId: DatasetId) => boolean;
export declare const hasExome: (datsetId: DatasetId) => boolean;
export declare const genesHaveExomeCoverage: (datsetId: DatasetId) => boolean;
export declare const genesHaveGenomeCoverage: (datsetId: DatasetId) => boolean;
export declare const transcriptsHaveExomeCoverage: (datsetId: DatasetId) => boolean;
export declare const regionsHaveExomeCoverage: (datsetId: DatasetId) => boolean;
export declare const regionsHaveGenomeCoverage: (datsetId: DatasetId) => boolean;
export declare const hasShortVariants: (datasetId: DatasetId) => boolean;
export declare const hasStructuralVariants: (datasetId: DatasetId) => boolean;
export declare const hasCopyNumberVariants: (datasetId: DatasetId) => boolean;
export declare const hasLocalAncestryPopulations: (datasetId: DatasetId) => boolean;
export declare const isLiftoverSource: (datasetId: DatasetId) => boolean;
export declare const isLiftoverTarget: (datasetId: DatasetId) => boolean;
export declare const referenceGenome: (datasetId: DatasetId) => ReferenceGenome;
export declare const usesGrch37: (datasetId: DatasetId) => boolean;
export declare const usesGrch38: (datasetId: DatasetId) => boolean;
export declare const isV3Subset: (datasetId: DatasetId) => boolean;
export declare const isV2: (datasetId: DatasetId) => boolean;
export declare const isV3: (datasetId: DatasetId) => boolean;
export declare const isV4: (datasetId: DatasetId) => boolean;
export declare const isExac: (datasetId: DatasetId) => boolean;
export declare const isSVs: (datasetId: DatasetId) => boolean;
export declare const hasV2Genome: (datasetId: DatasetId) => boolean;
export declare const metricsIncludeLowQualityGenotypes: (datasetId: DatasetId) => boolean;
export declare const has1000GenomesPopulationFrequencies: (datasetId: DatasetId) => boolean;
export declare const hasAlleleBalance: (datasetId: DatasetId) => boolean;
export declare const hasRelatedVariants: (datasetId: DatasetId) => boolean;
export declare const showAllIndividualsInAgeDistributionByDefault: (datasetId: DatasetId) => boolean;
export declare const hasExons: (datasetId: DatasetId) => boolean;
export declare const hasShortTandemRepeats: (datasetId: DatasetId) => boolean;
export declare const hasMitochondrialGenomeCoverage: (datasetId: DatasetId) => boolean;
export declare const hasMitochondrialVariants: (datasetId: DatasetId) => boolean;
export declare const hasNonCodingReadData: (datasetId: DatasetId) => boolean;
export declare const readsDatasetId: (datasetId: DatasetId) => string;
export declare const readsIncludeLowQualityGenotypes: (datasetId: DatasetId) => boolean;
export declare const coverageDatasetId: (datasetId: DatasetId) => "exac" | "gnomad_r2_1" | "gnomad_r2_1_controls" | "gnomad_r2_1_non_cancer" | "gnomad_r2_1_non_neuro" | "gnomad_r2_1_non_topmed" | "gnomad_r3" | "gnomad_r3_controls_and_biobanks" | "gnomad_r3_non_cancer" | "gnomad_r3_non_neuro" | "gnomad_r3_non_topmed" | "gnomad_r3_non_v2" | "gnomad_sv_r2_1" | "gnomad_sv_r2_1_controls" | "gnomad_sv_r2_1_non_neuro" | "gnomad_sv_r4" | "gnomad_cnv_r4" | "gnomad_r4" | "gnomad_r4_non_ukb";
export declare const variantFeedbackDescription: (datasetId: DatasetId) => string | null;
export declare const isV4SVs: (datasetId: DatasetId) => boolean;
export declare const shortVariantDatasetId: (datasetId: DatasetId) => "exac" | "gnomad_r2_1" | "gnomad_r2_1_controls" | "gnomad_r2_1_non_cancer" | "gnomad_r2_1_non_neuro" | "gnomad_r2_1_non_topmed" | "gnomad_r3" | "gnomad_r3_controls_and_biobanks" | "gnomad_r3_non_cancer" | "gnomad_r3_non_neuro" | "gnomad_r3_non_topmed" | "gnomad_r3_non_v2" | "gnomad_sv_r2_1" | "gnomad_sv_r2_1_controls" | "gnomad_sv_r2_1_non_neuro" | "gnomad_sv_r4" | "gnomad_cnv_r4" | "gnomad_r4" | "gnomad_r4_non_ukb";
export declare const structuralVariantDatasetId: (datasetId: DatasetId) => "exac" | "gnomad_r2_1" | "gnomad_r2_1_controls" | "gnomad_r2_1_non_cancer" | "gnomad_r2_1_non_neuro" | "gnomad_r2_1_non_topmed" | "gnomad_r3" | "gnomad_r3_controls_and_biobanks" | "gnomad_r3_non_cancer" | "gnomad_r3_non_neuro" | "gnomad_r3_non_topmed" | "gnomad_r3_non_v2" | "gnomad_sv_r2_1" | "gnomad_sv_r2_1_controls" | "gnomad_sv_r2_1_non_neuro" | "gnomad_sv_r4" | "gnomad_cnv_r4" | "gnomad_r4" | "gnomad_r4_non_ukb";
export declare const isV4CNVs: (datasetId: DatasetId) => boolean;
export declare const copyNumberVariantDatasetId: (datasetId: DatasetId) => "exac" | "gnomad_r2_1" | "gnomad_r2_1_controls" | "gnomad_r2_1_non_cancer" | "gnomad_r2_1_non_neuro" | "gnomad_r2_1_non_topmed" | "gnomad_r3" | "gnomad_r3_controls_and_biobanks" | "gnomad_r3_non_cancer" | "gnomad_r3_non_neuro" | "gnomad_r3_non_topmed" | "gnomad_r3_non_v2" | "gnomad_sv_r2_1" | "gnomad_sv_r2_1_controls" | "gnomad_sv_r2_1_non_neuro" | "gnomad_sv_r4" | "gnomad_cnv_r4" | "gnomad_r4" | "gnomad_r4_non_ukb";
export declare const hasCopyNumberVariantCoverage: (datasetId: DatasetId) => boolean;
export declare const baseDatasetForReferenceGenome: (genome: ReferenceGenome) => DatasetId;
export declare const hasJointFrequencyData: (datasetId: DatasetId) => boolean;
export declare const getTopLevelDataset: (datasetId: DatasetId) => "ExAC" | "v4" | "v3" | "v2" | "default";
export declare const hasVRSData: (datasetId: DatasetId) => boolean;
