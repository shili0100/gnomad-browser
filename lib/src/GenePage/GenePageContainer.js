"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const metadata_1 = require("../../dataset-metadata/metadata");
const Delayed_1 = __importDefault(require("../Delayed"));
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const Query_1 = require("../Query");
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const GeneNotFound_1 = __importDefault(require("./GeneNotFound"));
const GenePage_1 = __importDefault(require("./GenePage"));
const operationName = 'Gene';
const query = `
query ${operationName}($geneId: String, $geneSymbol: String, $referenceGenome: ReferenceGenomeId!, $shortTandemRepeatDatasetId: DatasetId!, $includeShortTandemRepeats: Boolean!) {
  gene(gene_id: $geneId, gene_symbol: $geneSymbol, reference_genome: $referenceGenome) {
    reference_genome
    gene_id
    gene_version
    symbol
    gencode_symbol
    name
    canonical_transcript_id
    mane_select_transcript {
      ensembl_id
      ensembl_version
      refseq_id
      refseq_version
    }
    hgnc_id
    ncbi_id
    omim_id
    chrom
    start
    stop
    strand
    exons {
      feature_type
      start
      stop
    }
    flags
    gnomad_constraint {
      exp_lof
      exp_mis
      exp_syn
      obs_lof
      obs_mis
      obs_syn
      oe_lof
      oe_lof_lower
      oe_lof_upper
      oe_mis
      oe_mis_lower
      oe_mis_upper
      oe_syn
      oe_syn_lower
      oe_syn_upper
      lof_z
      mis_z
      syn_z
      pLI
      flags
    }
    exac_constraint {
      exp_syn
      obs_syn
      syn_z
      exp_mis
      obs_mis
      mis_z
      exp_lof
      obs_lof
      lof_z
      pLI
    }
    transcripts {
      transcript_id
      transcript_version
      strand
      exons {
        feature_type
        start
        stop
      }
      gtex_tissue_expression {
        adipose_subcutaneous
        adipose_visceral_omentum
        adrenal_gland
        artery_aorta
        artery_coronary
        artery_tibial
        bladder
        brain_amygdala
        brain_anterior_cingulate_cortex_ba24
        brain_caudate_basal_ganglia
        brain_cerebellar_hemisphere
        brain_cerebellum
        brain_cortex
        brain_frontal_cortex_ba9
        brain_hippocampus
        brain_hypothalamus
        brain_nucleus_accumbens_basal_ganglia
        brain_putamen_basal_ganglia
        brain_spinal_cord_cervical_c_1
        brain_substantia_nigra
        breast_mammary_tissue
        cells_ebv_transformed_lymphocytes
        cells_transformed_fibroblasts
        cervix_ectocervix
        cervix_endocervix
        colon_sigmoid
        colon_transverse
        esophagus_gastroesophageal_junction
        esophagus_mucosa
        esophagus_muscularis
        fallopian_tube
        heart_atrial_appendage
        heart_left_ventricle
        kidney_cortex
        liver
        lung
        minor_salivary_gland
        muscle_skeletal
        nerve_tibial
        ovary
        pancreas
        pituitary
        prostate
        skin_not_sun_exposed_suprapubic
        skin_sun_exposed_lower_leg
        small_intestine_terminal_ileum
        spleen
        stomach
        testis
        thyroid
        uterus
        vagina
        whole_blood
      }
    }
    pext {
      regions {
        start
        stop
        mean
        tissues {
          adipose_subcutaneous
          adipose_visceral_omentum
          adrenal_gland
          artery_aorta
          artery_coronary
          artery_tibial
          bladder
          brain_amygdala
          brain_anterior_cingulate_cortex_ba24
          brain_caudate_basal_ganglia
          brain_cerebellar_hemisphere
          brain_cerebellum
          brain_cortex
          brain_frontal_cortex_ba9
          brain_hippocampus
          brain_hypothalamus
          brain_nucleus_accumbens_basal_ganglia
          brain_putamen_basal_ganglia
          brain_spinal_cord_cervical_c_1
          brain_substantia_nigra
          breast_mammary_tissue
          cells_ebv_transformed_lymphocytes
          cells_transformed_fibroblasts
          cervix_ectocervix
          cervix_endocervix
          colon_sigmoid
          colon_transverse
          esophagus_gastroesophageal_junction
          esophagus_mucosa
          esophagus_muscularis
          fallopian_tube
          heart_atrial_appendage
          heart_left_ventricle
          kidney_cortex
          liver
          lung
          minor_salivary_gland
          muscle_skeletal
          nerve_tibial
          ovary
          pancreas
          pituitary
          prostate
          skin_not_sun_exposed_suprapubic
          skin_sun_exposed_lower_leg
          small_intestine_terminal_ileum
          spleen
          stomach
          testis
          thyroid
          uterus
          vagina
          whole_blood
        }
      }
      flags
    }
    exac_regional_missense_constraint_regions {
      start
      stop
      obs_mis
      exp_mis
      obs_exp
      chisq_diff_null
    }
    gnomad_v2_regional_missense_constraint {
      passed_qc
      has_no_rmc_evidence
      regions {
        chrom
        start
        stop
        aa_start
        aa_stop
        obs_mis
        exp_mis
        obs_exp
        chisq_diff_null
        p_value
      }
    }
    short_tandem_repeats(dataset: $shortTandemRepeatDatasetId) @include(if: $includeShortTandemRepeats) {
      id
    }
    heterozygous_variant_cooccurrence_counts {
      csq
      af_cutoff
      data {
        two_het_total
	in_cis
	in_trans
	unphased
      }
    }
    homozygous_variant_cooccurrence_counts {
      csq
      af_cutoff
      data {
	hom_total
      }
    }
  }
}
`;
const rollUpVariantCooccurrenceCounts = (unrolledGene) => {
    const heterozygous_variant_cooccurrence_counts = {};
    const homozygous_variant_cooccurrence_counts = {};
    unrolledGene.heterozygous_variant_cooccurrence_counts.forEach((unrolledGeneCount) => {
        const severity = unrolledGeneCount.csq;
        const afCutoff = unrolledGeneCount.af_cutoff;
        const data = unrolledGeneCount.data;
        heterozygous_variant_cooccurrence_counts[severity] =
            heterozygous_variant_cooccurrence_counts[severity] || {};
        heterozygous_variant_cooccurrence_counts[severity][afCutoff] = data;
    });
    unrolledGene.homozygous_variant_cooccurrence_counts.forEach((unrolledGeneCount) => {
        const severity = unrolledGeneCount.csq;
        const afCutoff = unrolledGeneCount.af_cutoff;
        const data = unrolledGeneCount.data;
        homozygous_variant_cooccurrence_counts[severity] =
            homozygous_variant_cooccurrence_counts[severity] || {};
        homozygous_variant_cooccurrence_counts[severity][afCutoff] = data;
    });
    return { heterozygous_variant_cooccurrence_counts, homozygous_variant_cooccurrence_counts };
};
const GenePageContainer = ({ datasetId, geneIdOrSymbol }) => {
    const variables = {
        [geneIdOrSymbol.startsWith('ENSG') ? 'geneId' : 'geneSymbol']: geneIdOrSymbol,
        referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
        shortTandemRepeatDatasetId: 'gnomad_r3',
        includeShortTandemRepeats: (0, metadata_1.hasShortTandemRepeats)(datasetId),
    };
    return (react_1.default.createElement(Query_1.BaseQuery, { operationName: operationName, query: query, variables: variables }, ({ data, error, graphQLErrors, loading }) => {
        if (loading) {
            return (react_1.default.createElement(Delayed_1.default, null,
                react_1.default.createElement(StatusMessage_1.default, null, "Loading gene")));
        }
        if (error) {
            return react_1.default.createElement(StatusMessage_1.default, null, "Unable to load gene");
        }
        if (!data || !data.gene) {
            if (graphQLErrors && graphQLErrors.some((e) => e.message === 'Gene not found')) {
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(DocumentTitle_1.default, { title: "Not found" }),
                    react_1.default.createElement(GeneNotFound_1.default, { geneIdOrSymbol: geneIdOrSymbol, datasetId: datasetId })));
            }
            return (react_1.default.createElement(StatusMessage_1.default, null, graphQLErrors && graphQLErrors.length
                ? Array.from(new Set(graphQLErrors.map((e) => e.message))).join(', ')
                : 'Unable to load gene'));
        }
        const rolledUpCounts = rollUpVariantCooccurrenceCounts(data.gene);
        const gene = Object.assign(Object.assign({}, data.gene), rolledUpCounts);
        return react_1.default.createElement(GenePage_1.default, { datasetId: datasetId, gene: gene, geneId: data.gene.gene_id });
    }));
};
exports.default = GenePageContainer;
//# sourceMappingURL=GenePageContainer.js.map