"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantPageContent = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const Delayed_1 = __importDefault(require("../Delayed"));
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const GnomadPageHeading_1 = __importDefault(require("../GnomadPageHeading"));
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const Query_1 = require("../Query");
const ReadData_1 = __importDefault(require("../ReadData/ReadData"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const TableWrapper_1 = __importDefault(require("../TableWrapper"));
const variantFeedback_1 = require("../variantFeedback");
const ExacVariantOccurrenceTable_1 = __importDefault(require("./ExacVariantOccurrenceTable"));
const ReferenceList_1 = require("./ReferenceList");
const GnomadAgeDistribution_1 = __importDefault(require("./GnomadAgeDistribution"));
const VariantClinvarInfo_1 = __importDefault(require("./VariantClinvarInfo"));
const VariantGenotypeQualityMetrics_1 = __importDefault(require("./VariantGenotypeQualityMetrics"));
const VariantNotFound_1 = __importDefault(require("./VariantNotFound"));
const VariantOccurrenceTable_1 = require("./VariantOccurrenceTable");
const VariantInSilicoPredictors_1 = __importDefault(require("./VariantInSilicoPredictors"));
const GnomadNonCodingConstraintTableVariant_1 = __importDefault(require("../ConstraintTable/GnomadNonCodingConstraintTableVariant"));
const VariantLoFCurationResults_1 = __importDefault(require("./VariantLoFCurationResults"));
const VariantPageTitle_1 = __importDefault(require("./VariantPageTitle"));
const VariantPopulationFrequencies_1 = __importDefault(require("./VariantPopulationFrequencies"));
const VariantRelatedVariants_1 = __importDefault(require("./VariantRelatedVariants"));
const VariantSiteQualityMetrics_1 = __importDefault(require("./VariantSiteQualityMetrics"));
const VariantTranscriptConsequences_1 = __importDefault(require("./VariantTranscriptConsequences"));
const Section = styled_components_1.default.section `
  width: 100%;
`;
const ResponsiveSection = (0, styled_components_1.default)(Section) `
  width: calc(50% - 15px);

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const FlexWrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`;
const VariantPageContent = ({ datasetId, variant }) => {
    return (react_1.default.createElement(FlexWrapper, null,
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement(TableWrapper_1.default, null, (0, metadata_1.isExac)(datasetId) ? (
            // @ts-expect-error TS(2741) FIXME: Property 'coverage' is missing in type '{ variant_... Remove this comment to see the full error message
            react_1.default.createElement(ExacVariantOccurrenceTable_1.default, { variant: variant })) : (react_1.default.createElement(VariantOccurrenceTable_1.GnomadVariantOccurrenceTable, { datasetId: datasetId, variant: variant, showExomes: (0, metadata_1.hasExome)(datasetId) }))),
            variant.flags && variant.flags.includes('par') && (react_1.default.createElement("p", null,
                react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                " This variant is found in a pseudoautosomal region.")),
            variant.flags && variant.flags.includes('lcr') && (react_1.default.createElement("p", null,
                react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                " This variant is found in a low complexity region."))),
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "External Resources"),
            react_1.default.createElement(ReferenceList_1.ReferenceList, { variant: variant }),
            react_1.default.createElement("h2", null, "Feedback"),
            react_1.default.createElement(ui_1.ExternalLink, { href: (0, variantFeedback_1.variantFeedbackUrl)(variant, datasetId) }, "Report an issue with this variant")),
        react_1.default.createElement(Section, null,
            react_1.default.createElement("h2", null,
                "Genetic Ancestry Group Frequencies ",
                react_1.default.createElement(InfoButton_1.default, { topic: "ancestry" })),
            (0, metadata_1.hasLocalAncestryPopulations)(datasetId) &&
                ((variant.genome && variant.genome.local_ancestry_populations) || []).length > 0 && (react_1.default.createElement("div", { style: {
                    padding: '0 1em',
                    border: '2px solid #1173bb',
                    background: '#1173bb0f',
                    borderRadius: '0.5em',
                    marginBottom: '1em',
                } },
                react_1.default.createElement("p", null,
                    react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                    " Local ancestry data is available for this variant by selecting the tab below. See our blog post on",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://gnomad.broadinstitute.org/news/2021-12-local-ancestry-inference-for-latino-admixed-american-samples-in-gnomad/" }, "local ancestry inference for Admixed American samples in gnomAD"),
                    ' ',
                    "for more information."))),
            react_1.default.createElement(VariantPopulationFrequencies_1.default, { datasetId: datasetId, variant: variant })),
        react_1.default.createElement(Section, null,
            react_1.default.createElement("h2", null, "Related Variants"),
            react_1.default.createElement(VariantRelatedVariants_1.default, { datasetId: datasetId, variant: variant })),
        react_1.default.createElement(Section, null,
            react_1.default.createElement("h2", null, "Variant Effect Predictor"),
            react_1.default.createElement(VariantTranscriptConsequences_1.default, { variant: variant })),
        variant.lof_curations && (react_1.default.createElement(Section, null,
            react_1.default.createElement("h2", null,
                "LoF Curation ",
                react_1.default.createElement(InfoButton_1.default, { topic: "lof-curation" })),
            react_1.default.createElement(VariantLoFCurationResults_1.default, { variant: variant }))),
        react_1.default.createElement(FlexWrapper, null,
            variant.in_silico_predictors && variant.in_silico_predictors.length && (react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement("h2", null, "In Silico Predictors"),
                react_1.default.createElement(VariantInSilicoPredictors_1.default, { variant: variant, datasetId: datasetId }))),
            (0, metadata_1.hasNonCodingConstraints)(datasetId) && (react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement("h2", null, "Genomic Constraint of Surrounding 1kb Region"),
                react_1.default.createElement(GnomadNonCodingConstraintTableVariant_1.default, { variantId: variant.variant_id, chrom: variant.chrom, nonCodingConstraint: variant.non_coding_constraint })))),
        variant.clinvar && (react_1.default.createElement(Section, null,
            react_1.default.createElement("h2", null, "ClinVar"),
            react_1.default.createElement(VariantClinvarInfo_1.default, { clinvar: variant.clinvar }))),
        react_1.default.createElement(FlexWrapper, null,
            react_1.default.createElement(ResponsiveSection, null, ((variant.exome || {}).age_distribution || (variant.genome || {}).age_distribution) && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h2", null,
                    "Age Distribution ",
                    react_1.default.createElement(InfoButton_1.default, { topic: "age" })),
                (0, metadata_1.isV3Subset)(datasetId) && (react_1.default.createElement("p", null, "Age distribution is based on the full gnomAD dataset, not the selected subset.")),
                react_1.default.createElement(GnomadAgeDistribution_1.default, { datasetId: datasetId, variant: variant }))))),
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "Genotype Quality Metrics"),
            react_1.default.createElement(VariantGenotypeQualityMetrics_1.default, { datasetId: datasetId, variant: variant })),
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "Site Quality Metrics"),
            react_1.default.createElement(VariantSiteQualityMetrics_1.default, { datasetId: datasetId, variant: variant })),
        react_1.default.createElement(Section, null,
            react_1.default.createElement("h2", null, "Read Data"),
            react_1.default.createElement(ReadData_1.default, { datasetId: datasetId, variantIds: [variant.variant_id] }))));
};
exports.VariantPageContent = VariantPageContent;
const operationName = 'GnomadVariant';
const variantQuery = `
query ${operationName}($variantId: String!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!, $includeLocalAncestry: Boolean!, $includeLiftoverAsSource: Boolean!, $includeLiftoverAsTarget: Boolean!) {
  variant(variantId: $variantId, dataset: $datasetId) {
    variant_id
    reference_genome
    chrom
    pos
    ref
    alt
    caid
    colocated_variants
    coverage {
      exome {
        mean
        over_20
      }
      genome {
        mean
        over_20
      }
    }
    multi_nucleotide_variants {
      combined_variant_id
      changes_amino_acids
      n_individuals
      other_constituent_snvs
    }
    exome {
      ac
      an
      ac_hemi
      ac_hom
      faf95 {
        popmax
        popmax_population
      }
      filters
      populations {
        id
        ac
        an
        ac_hemi
        ac_hom
      }
      local_ancestry_populations @include(if: $includeLocalAncestry) {
        id
        ac
        an
      }
      age_distribution {
        het {
          bin_edges
          bin_freq
          n_smaller
          n_larger
        }
        hom {
          bin_edges
          bin_freq
          n_smaller
          n_larger
        }
      }
      quality_metrics {
        allele_balance {
          alt {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
        }
        genotype_depth {
          all {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
          alt {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
        }
        genotype_quality {
          all {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
          alt {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
        }
        site_quality_metrics {
          metric
          value
        }
      }
    }
    genome {
      ac
      an
      ac_hemi
      ac_hom
      faf95 {
        popmax
        popmax_population
      }
      filters
      populations {
        id
        ac
        an
        ac_hemi
        ac_hom
      }
      local_ancestry_populations @include(if: $includeLocalAncestry) {
        id
        ac
        an
      }
      age_distribution {
        het {
          bin_edges
          bin_freq
          n_smaller
          n_larger
        }
        hom {
          bin_edges
          bin_freq
          n_smaller
          n_larger
        }
      }
      quality_metrics {
        allele_balance {
          alt {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
        }
        genotype_depth {
          all {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
          alt {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
        }
        genotype_quality {
          all {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
          alt {
            bin_edges
            bin_freq
            n_smaller
            n_larger
          }
        }
        site_quality_metrics {
          metric
          value
        }
      }
    }
    joint {
      ac
      an
      homozygote_count
      hemizygote_count
      faf95 {
        popmax
        popmax_population
      }
      filters
      populations {
        id
        ac
        an
        homozygote_count
        hemizygote_count
      }
      age_distribution {
        het {
          bin_edges
          bin_freq
          n_smaller
          n_larger
        }
        hom {
          bin_edges
          bin_freq
          n_smaller
          n_larger
        }
      }
      freq_comparison_stats {
        contingency_table_test {
          p_value
          odds_ratio
        }
        cochran_mantel_haenszel_test {
          p_value
          chisq
        }
        stat_union {
          p_value
          stat_test_name
          gen_ancs
        }
      }
    }
    flags
    lof_curations {
      gene_id
      gene_symbol
      verdict
      flags
      project
    }
    rsids
    transcript_consequences {
      domains
      gene_id
      gene_version
      gene_symbol
      hgvs
      hgvsc
      hgvsp
      is_canonical
      is_mane_select
      is_mane_select_version
      lof
      lof_flags
      lof_filter
      major_consequence
      polyphen_prediction
      sift_prediction
      transcript_id
      transcript_version
    }
    in_silico_predictors {
      id
      value
      flags
    }
    non_coding_constraint {
      start
      stop
      possible
      observed
      expected
      oe
      z
    }
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

  liftover(source_variant_id: $variantId, reference_genome: $referenceGenome) @include(if: $includeLiftoverAsSource) {
    liftover {
      variant_id
      reference_genome
    }
    datasets
  }

  liftover_sources: liftover(liftover_variant_id: $variantId, reference_genome: $referenceGenome) @include(if: $includeLiftoverAsTarget) {
    source {
      variant_id
      reference_genome
    }
    datasets
  }

  meta {
    clinvar_release_date
  }
}
`;
// Returns the gene_id to be linked to in the Variant page header
// The vast majority of cases have a single gene associated, the logic for those that don't is:
//   If there is a mane select transcript, use that to determine which gene to link to
//   If there is no mane select transcript, check if there is a single canonical transcript
//     If there is a single canonical transcript, link to that gene
// As such, if a variant has multiple associated genes, multiple canonical transcripts, and
//   no MANE select transcript, the "Gene page" button will not appear as it is non-trivial,
//   and users should navigate further down the page to the VEP consequences section
const checkGeneLink = (transcript_consequences) => {
    if (!transcript_consequences) {
        return null;
    }
    const maneSelectTranscript = transcript_consequences.filter((transcript) => transcript.is_mane_select);
    if (maneSelectTranscript.length === 1) {
        return {
            ensembleId: maneSelectTranscript[0].gene_id,
        };
    }
    const canonicalTranscripts = transcript_consequences.filter((transcript) => transcript.is_canonical);
    if (canonicalTranscripts.length !== 1) {
        return null;
    }
    return {
        ensembleId: canonicalTranscripts[0].gene_id,
    };
};
const VariantPage = ({ datasetId, variantId }) => {
    const gene = { ensembleId: '' };
    return (
    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.Page, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: `${variantId} | ${(0, metadata_1.labelForDataset)(datasetId)}` }),
        react_1.default.createElement(Query_1.BaseQuery, { key: datasetId, operationName: operationName, query: variantQuery, variables: {
                datasetId,
                includeLocalAncestry: ((0, metadata_1.isV3)(datasetId) && !(0, metadata_1.isV3Subset)(datasetId)) || (0, metadata_1.isV4)(datasetId),
                includeLiftoverAsSource: (0, metadata_1.isLiftoverSource)(datasetId),
                includeLiftoverAsTarget: (0, metadata_1.isLiftoverTarget)(datasetId),
                referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
                variantId,
            } }, ({ data, error, graphQLErrors, loading }) => {
            let pageContent = null;
            if (loading) {
                pageContent = (react_1.default.createElement(Delayed_1.default, null,
                    react_1.default.createElement(StatusMessage_1.default, null, "Loading variant...")));
            }
            else if (error) {
                pageContent = react_1.default.createElement(StatusMessage_1.default, null, "Unable to load variant");
            }
            else if (!(data || {}).variant) {
                if (graphQLErrors &&
                    graphQLErrors.some((err) => err.message === 'Variant not found')) {
                    // @ts-expect-error TS(2322) FIXME: Type '{ datasetId: string; variantId: string; }' i... Remove this comment to see the full error message
                    pageContent = react_1.default.createElement(VariantNotFound_1.default, { datasetId: datasetId, variantId: variantId });
                }
                else {
                    pageContent = (react_1.default.createElement(StatusMessage_1.default, null, graphQLErrors && graphQLErrors.length
                        ? Array.from(new Set(graphQLErrors
                            .filter((e) => !e.message.includes('ClinVar'))
                            .map((e) => e.message))).join(', ')
                        : 'Unable to load variant'));
                }
            }
            else {
                const variant = Object.assign(Object.assign({}, data.variant), { clinvar: data.clinvar_variant
                        ? Object.assign(Object.assign({}, data.clinvar_variant), { release_date: data.meta.clinvar_release_date }) : null, liftover: data.liftover, liftover_sources: data.liftover_sources });
                // In this branch, a variant was successfully loaded. Check the symbol
                //   and ensemble ID to create a 'Gene page' button with the correct link
                const geneData = checkGeneLink(variant.transcript_consequences);
                if (geneData) {
                    gene.ensembleId = geneData.ensembleId;
                }
                pageContent = react_1.default.createElement(exports.VariantPageContent, { datasetId: datasetId, variant: variant });
            }
            const datasetLinkWithLiftover = (currentLocation, toDatasetId) => {
                const needsLiftoverDisambiguation = ((0, metadata_1.isLiftoverSource)(datasetId) && (0, metadata_1.isLiftoverTarget)(toDatasetId)) ||
                    ((0, metadata_1.isLiftoverSource)(toDatasetId) && (0, metadata_1.isLiftoverTarget)(datasetId));
                return needsLiftoverDisambiguation
                    ? Object.assign(Object.assign({}, currentLocation), { pathname: `/variant/liftover/${variantId}/${datasetId}/${toDatasetId}`, search: '' }) : Object.assign(Object.assign({}, currentLocation), { pathname: `/variant/${variantId}`, search: `?dataset=${toDatasetId}` });
            };
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(GnomadPageHeading_1.default, { datasetOptions: {
                        // Include ExAC for GRCh37 datasets
                        includeExac: (0, metadata_1.usesGrch37)(datasetId),
                        // Include gnomAD versions based on the same reference genome as the current dataset
                        includeGnomad2: true,
                        includeGnomad3: true,
                        includeGnomad4Subsets: true,
                        // Variant ID not valid for SVs
                        includeStructuralVariants: false,
                        includeCopyNumberVariants: false,
                        urlBuilder: datasetLinkWithLiftover,
                    }, selectedDataset: datasetId, extra: react_1.default.createElement(react_1.default.Fragment, null,
                        navigator.clipboard && navigator.clipboard.writeText && (react_1.default.createElement(ui_1.Button, { onClick: () => {
                                navigator.clipboard.writeText(variantId);
                            }, style: { margin: '0 0 0 1em' } }, "Copy variant ID")),
                        gene.ensembleId && (react_1.default.createElement(ui_1.Button, { onClick: () => {
                                location.href = `/gene/${gene.ensembleId}?dataset=${datasetId}`;
                            }, style: { margin: '0 1em 0 1em' } }, "Gene page"))) },
                    react_1.default.createElement(VariantPageTitle_1.default, { variantId: variantId, datasetId: datasetId })),
                pageContent));
        })));
};
exports.default = VariantPage;
//# sourceMappingURL=VariantPage.js.map