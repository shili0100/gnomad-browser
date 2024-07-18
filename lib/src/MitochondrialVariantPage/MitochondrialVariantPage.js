"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const GnomadPageHeading_1 = __importDefault(require("../GnomadPageHeading"));
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const Link_1 = __importDefault(require("../Link"));
const Query_1 = __importDefault(require("../Query"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const TableWrapper_1 = __importDefault(require("../TableWrapper"));
const variantFeedback_1 = require("../variantFeedback");
const VariantClinvarInfo_1 = __importDefault(require("../VariantPage/VariantClinvarInfo"));
const MitochondrialVariantAgeDistribution_1 = __importDefault(require("./MitochondrialVariantAgeDistribution"));
const MitochondrialVariantAttributeList_1 = __importDefault(require("./MitochondrialVariantAttributeList"));
const MitochondrialVariantGenotypeQualityMetrics_1 = __importDefault(require("./MitochondrialVariantGenotypeQualityMetrics"));
const MitochondrialVariantHaplogroupFrequenciesTable_1 = __importDefault(require("./MitochondrialVariantHaplogroupFrequenciesTable"));
const MitochondrialVariantHeteroplasmyDistribution_1 = __importDefault(require("./MitochondrialVariantHeteroplasmyDistribution"));
const MitochondrialVariantPopulationFrequenciesTable_1 = __importDefault(require("./MitochondrialVariantPopulationFrequenciesTable"));
const MitochondrialVariantReferenceList_1 = __importDefault(require("./MitochondrialVariantReferenceList"));
const MitochondrialVariantSiteQualityMetrics_1 = __importDefault(require("./MitochondrialVariantSiteQualityMetrics"));
const MitochondrialVariantTranscriptConsequenceList_1 = __importDefault(require("./MitochondrialVariantTranscriptConsequenceList"));
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 1em;
`;
const Section = styled_components_1.default.section `
  width: 100%;
  margin-bottom: 1em;
`;
const ResponsiveSection = styled_components_1.default.section `
  width: calc(50% - 15px);

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const variantType = (variantId) => {
    const [_chrom, _pos, ref, alt] = variantId.split('-');
    if (!ref || !alt) {
        return 'Variant';
    }
    if (ref.length === 1 && alt.length === 1) {
        return 'Single nucleotide variant';
    }
    if (ref.length < alt.length) {
        return 'Insertion';
    }
    if (ref.length > alt.length) {
        return 'Deletion';
    }
    return 'Variant';
};
const VariantId = styled_components_1.default.span `
  white-space: nowrap;
`;
const MitochondrialVariantPage = ({ datasetId, variant }) => (
// @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
react_1.default.createElement(ui_1.Page, null,
    react_1.default.createElement(DocumentTitle_1.default, { title: variant.variant_id }),
    react_1.default.createElement(GnomadPageHeading_1.default, { selectedDataset: datasetId, datasetOptions: {
            includeShortVariants: true,
            includeStructuralVariants: false,
            includeExac: false,
            includeGnomad2: false,
            includeGnomad3: true,
            includeGnomad3Subsets: false,
        } },
        variantType(variant.variant_id),
        ": ",
        react_1.default.createElement(VariantId, null,
            variant.variant_id,
            " (GRCh38)")),
    react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement(MitochondrialVariantAttributeList_1.default, { variant: variant }),
            variant.ac_hom_mnv > 0 && (react_1.default.createElement("p", null,
                react_1.default.createElement(ui_1.Badge, { level: "warning" }, "Warning"),
                " In",
                ' ',
                variant.ac_hom_mnv === variant.ac_hom ? ('all') : (react_1.default.createElement(react_1.default.Fragment, null,
                    variant.ac_hom_mnv,
                    " of ",
                    variant.ac_hom)),
                ' ',
                "individuals where this variant is homoplasmic or near-homoplasmic (heteroplasmy level \u2265 0.95), this variant occurs in phase with another variant, potentially altering the amino acid sequence.")),
            variant.flags && variant.flags.includes('common_low_heteroplasmy') && (react_1.default.createElement("p", null,
                react_1.default.createElement(ui_1.Badge, { level: "warning" }, "Warning"),
                " Common low heteroplasmy: this variant is present at an overall frequency of .001 across all samples with a heteroplasmy level > 0 and < 0.50."))),
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "External Resources"),
            react_1.default.createElement(MitochondrialVariantReferenceList_1.default, { variant: variant }),
            react_1.default.createElement("h2", null, "Feedback"),
            react_1.default.createElement(ui_1.ExternalLink, { href: (0, variantFeedback_1.variantFeedbackUrl)(variant, datasetId) }, "Report an issue with this variant"))),
    react_1.default.createElement(Section, null,
        react_1.default.createElement("h2", null, "Genetic Ancestry Group Frequencies"),
        react_1.default.createElement(MitochondrialVariantPopulationFrequenciesTable_1.default, { variant: variant })),
    react_1.default.createElement(Section, null,
        react_1.default.createElement("h2", null,
            "Haplogroup Frequencies ",
            react_1.default.createElement(InfoButton_1.default, { topic: "mt-haplogroup-frequencies" })),
        react_1.default.createElement(TableWrapper_1.default, null,
            react_1.default.createElement(MitochondrialVariantHaplogroupFrequenciesTable_1.default, { variant: variant }))),
    react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "Heteroplasmy Distribution"),
            react_1.default.createElement(MitochondrialVariantHeteroplasmyDistribution_1.default, { variant: variant })),
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null,
                "Age Distribution ",
                react_1.default.createElement(InfoButton_1.default, { topic: "age" })),
            react_1.default.createElement(MitochondrialVariantAgeDistribution_1.default, { variant: variant }))),
    react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "Annotations"),
            react_1.default.createElement(MitochondrialVariantTranscriptConsequenceList_1.default, { variant: variant })),
        variant.clinvar && (react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "ClinVar"),
            react_1.default.createElement(VariantClinvarInfo_1.default, { clinvar: variant.clinvar })))),
    react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "Genotype Quality Metrics"),
            react_1.default.createElement(MitochondrialVariantGenotypeQualityMetrics_1.default, { variant: variant })),
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "Site Quality Metrics"),
            react_1.default.createElement(MitochondrialVariantSiteQualityMetrics_1.default, { variant: variant }))),
    react_1.default.createElement(Section, null,
        react_1.default.createElement("h2", null, "Read Data"),
        react_1.default.createElement("p", null, "Read data is not yet available for mitochondrial variants."))));
const operationName = 'MitochondrialVariant';
const variantQuery = `
query ${operationName}($variantId: String!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!) {
  meta {
    clinvar_release_date
  }
  clinvar_variant(variant_id: $variantId, reference_genome: $referenceGenome) {
    clinical_significance
    clinvar_variation_id
    gold_stars
    last_evaluated
    review_status
    submissions {
      clinical_significance
      conditions {
        name
        medgen_id
      }
      last_evaluated
      review_status
      submitter_name
    }
  }
  mitochondrial_variant(variant_id: $variantId, dataset: $datasetId) {
    ac_het
    ac_hom
    ac_hom_mnv
    age_distribution {
      het {
        bin_freq
        bin_edges
        n_smaller
        n_larger
      }
      hom {
        bin_freq
        bin_edges
        n_smaller
        n_larger
      }
    }
    alt
    an
    excluded_ac
    filters
    flags
    genotype_quality_metrics {
      name
      all {
        bin_freq
        bin_edges
        n_smaller
        n_larger
      }
      alt {
        bin_freq
        bin_edges
        n_smaller
        n_larger
      }
    }
    genotype_quality_filters {
      name
      filtered {
        bin_freq
        bin_edges
      }
    }
    haplogroup_defining
    haplogroups {
      id
      an
      ac_het
      ac_hom
      faf
      faf_hom
    }
    heteroplasmy_distribution {
      bin_freq
      bin_edges
      n_smaller
      n_larger
    }
    max_heteroplasmy
    mitotip_score
    mitotip_trna_prediction
    pon_ml_probability_of_pathogenicity
    pon_mt_trna_prediction
    populations {
      id
      ac_het
      ac_hom
      an
    }
    pos
    ref
    reference_genome
    rsids
    site_quality_metrics {
      name
      value
    }
    transcript_consequences {
      canonical
      gene_id
      gene_version
      gene_symbol
      hgvs
      hgvsc
      hgvsp
      lof
      lof_flags
      lof_filter
      major_consequence
      polyphen_prediction
      sift_prediction
      transcript_id
      transcript_version
    }
    variant_id
  }
}
`;
const ConnectedMitochondrialVariantPage = ({ datasetId, variantId, }) => {
    if (!(0, metadata_1.hasMitochondrialVariants)(datasetId)) {
        return (react_1.default.createElement(StatusMessage_1.default, null,
            "Mitochondrial variants are not available in ",
            (0, metadata_1.labelForDataset)(datasetId),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Link_1.default, { to: `/variant/${variantId}?dataset=gnomad_r3`, preserveSelectedDataset: false }, "Search for this variant in gnomAD v3")));
    }
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: variantQuery, variables: { datasetId, variantId, referenceGenome: (0, metadata_1.referenceGenome)(datasetId) }, loadingMessage: "Loading variant", errorMessage: "Unable to load variant", success: (data) => data.mitochondrial_variant }, ({ data }) => {
        const variant = Object.assign(Object.assign({}, data.mitochondrial_variant), { clinvar: data.clinvar_variant });
        if (variant.clinvar) {
            variant.clinvar.release_date = data.meta.clinvar_release_date;
        }
        return react_1.default.createElement(MitochondrialVariantPage, { datasetId: datasetId, variant: variant });
    }));
};
exports.default = ConnectedMitochondrialVariantPage;
//# sourceMappingURL=MitochondrialVariantPage.js.map