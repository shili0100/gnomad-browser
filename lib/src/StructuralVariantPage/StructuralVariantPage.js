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
const Query_1 = __importDefault(require("../Query"));
const variantFeedback_1 = require("../variantFeedback");
const MultiallelicCopyNumberVariantPlot_1 = __importDefault(require("./MultiallelicCopyNumberVariantPlot"));
const StructuralVariantAgeDistribution_1 = __importDefault(require("./StructuralVariantAgeDistribution"));
const StructuralVariantAttributeList_1 = __importDefault(require("./StructuralVariantAttributeList"));
const StructuralVariantConsequenceList_1 = __importDefault(require("./StructuralVariantConsequenceList"));
const StructuralVariantGenotypeQualityMetrics_1 = __importDefault(require("./StructuralVariantGenotypeQualityMetrics"));
const StructuralVariantPopulationsTable_1 = __importDefault(require("./StructuralVariantPopulationsTable"));
const SVReferenceList_1 = __importDefault(require("./SVReferenceList"));
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
const ResponsiveSection = styled_components_1.default.section `
  width: calc(50% - 15px);

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const StructuralVariantPage = ({ datasetId, variant }) => {
    const genes = variant.genes || [];
    return (
    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.Page, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: `${variant.variant_id} | ${(0, metadata_1.labelForDataset)(datasetId)}` }),
        react_1.default.createElement(GnomadPageHeading_1.default, { datasetOptions: { includeShortVariants: false }, selectedDataset: datasetId },
            "Structural variant: ",
            variant.variant_id),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement(StructuralVariantAttributeList_1.default, { variant: variant })),
            react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement("h2", null, "External Resources"),
                react_1.default.createElement(SVReferenceList_1.default, { variant: variant, datasetId: datasetId }),
                react_1.default.createElement("h2", null, "Feedback"),
                react_1.default.createElement(ui_1.ExternalLink, { href: (0, variantFeedback_1.variantFeedbackUrl)(variant, datasetId) }, "Report an issue with this variant"))),
        react_1.default.createElement("section", null,
            react_1.default.createElement("h2", null, "Genetic Ancestry Group Frequencies"),
            react_1.default.createElement(StructuralVariantPopulationsTable_1.default, { variant: variant })),
        variant.type === 'MCNV' && (react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement("h2", null, "Copy Number Distribution"),
                react_1.default.createElement(MultiallelicCopyNumberVariantPlot_1.default, { variant: variant })))),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement("h2", null, "Consequences"),
                react_1.default.createElement("p", null,
                    "This variant has consequences in ",
                    genes.length,
                    " gene",
                    genes.length !== 1 && 's',
                    "."),
                react_1.default.createElement(StructuralVariantConsequenceList_1.default, { variant: variant }))),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement("h2", null, "Genotype Quality"),
                variant.genotype_quality ? (react_1.default.createElement(StructuralVariantGenotypeQualityMetrics_1.default, { variant: variant })) : (react_1.default.createElement("p", null, "Genotype quality is unavailable for this variant."))),
            react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement("h2", null,
                    "Age Distribution ",
                    react_1.default.createElement(InfoButton_1.default, { topic: "age" })),
                variant.age_distribution ? (react_1.default.createElement(react_1.default.Fragment, null,
                    datasetId !== 'gnomad_sv_r2_1' && (react_1.default.createElement("p", null, "Age distribution is based on the full SV dataset, not the selected subset.")),
                    react_1.default.createElement(StructuralVariantAgeDistribution_1.default, { variant: variant }))) : (react_1.default.createElement("p", null, "Age data is not available for this variant."))))));
};
const ConnectedStructuralVariantPage = ({ datasetId, variantId, }) => {
    const operationName = 'StructuralVariant';
    const query = `
    query ${operationName}($datasetId: StructuralVariantDatasetId!, $variantId: String!) {
      structural_variant(dataset: $datasetId, variantId: $variantId) {
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
        algorithms
        alts
        ac
        an
        chrom
        chrom2
        consequences {
          consequence
          genes
        }
        copy_numbers {
          copy_number
          ac
        }
        cpx_intervals
        cpx_type
        end
        end2
        evidence
        filters
        genes
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
        length
        populations {
          id
          ac
          an
          ac_hemi
          ac_hom
        }
        pos
        pos2
        qual
        type
        variant_id
      }
    }
  `;
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: { datasetId, variantId }, loadingMessage: "Loading variant", errorMessage: "Unable to load variant", success: (data) => data.structural_variant }, ({ data }) => {
        const variant = Object.assign(Object.assign({}, data.structural_variant), { variant_id: data.structural_variant.variant_id.toUpperCase() });
        return react_1.default.createElement(StructuralVariantPage, { datasetId: datasetId, variant: variant });
    }));
};
exports.default = ConnectedStructuralVariantPage;
//# sourceMappingURL=StructuralVariantPage.js.map