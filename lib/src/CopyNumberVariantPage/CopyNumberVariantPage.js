"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const metadata_1 = require("../../dataset-metadata/metadata");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const GnomadPageHeading_1 = __importDefault(require("../GnomadPageHeading"));
const Query_1 = __importDefault(require("../Query"));
const variantFeedback_1 = require("../variantFeedback");
const CopyNumberVariantAttributeList_1 = __importDefault(require("./CopyNumberVariantAttributeList"));
const CopyNumberVariantPopulationsTable_1 = __importDefault(require("./CopyNumberVariantPopulationsTable"));
const CNVReferenceList_1 = __importDefault(require("./CNVReferenceList"));
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
const CopyNumberVariantPage = ({ datasetId, variant }) => (
// @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
react_1.default.createElement(ui_1.Page, null,
    react_1.default.createElement(DocumentTitle_1.default, { title: `${variant.variant_id} | ${(0, metadata_1.labelForDataset)(datasetId)}` }),
    react_1.default.createElement(GnomadPageHeading_1.default, { datasetOptions: { includeShortVariants: false, includeStructuralVariants: false }, selectedDataset: datasetId },
        "Copy number variant: ",
        variant.variant_id),
    react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement(CopyNumberVariantAttributeList_1.default, { variant: variant })),
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "External Resources"),
            react_1.default.createElement(CNVReferenceList_1.default, { variant: variant }),
            react_1.default.createElement("h2", null, "Feedback"),
            react_1.default.createElement(ui_1.ExternalLink, { href: (0, variantFeedback_1.variantFeedbackUrl)(variant, datasetId) }, "Report an issue with this variant"))),
    react_1.default.createElement("section", null,
        react_1.default.createElement("h2", null, "Genetic Ancestry Group Frequencies"),
        react_1.default.createElement(CopyNumberVariantPopulationsTable_1.default, { variant: variant })),
    react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(ResponsiveSection, null,
            react_1.default.createElement("h2", null, "Consequences"),
            react_1.default.createElement("p", null,
                "This variant has consequences in ",
                variant.genes.length,
                " gene",
                variant.genes.length !== 1 && 's',
                "."),
            variant.genes.map((gene) => (
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            react_1.default.createElement(ui_1.ListItem, { key: gene },
                react_1.default.createElement(Link_1.default, { to: `/gene/${gene}` }, gene))))))));
const ConnectedCopyNumberVariantPage = ({ datasetId, variantId, }) => {
    const operationName = 'CopyNumberVariant';
    const query = `
    query ${operationName}($datasetId: CopyNumberVariantDatasetId!, $variantId: String!) {
      copy_number_variant(dataset: $datasetId, variantId: $variantId) {
        alts
        sc
        sn
        sf
        chrom
        end
        filters
        genes
        length
        populations {
            id
            sc
            sn
            sf
        }
        pos
        qual
        reference_genome
        type
        posmin
        posmax
        endmin
        endmax
        variant_id
      }
    }
  `;
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: { datasetId, variantId }, loadingMessage: "Loading variant", errorMessage: "Unable to load variant", success: (data) => data.copy_number_variant }, ({ data }) => {
        const variant = Object.assign(Object.assign({}, data.copy_number_variant), { variant_id: data.copy_number_variant.variant_id });
        return react_1.default.createElement(CopyNumberVariantPage, { datasetId: datasetId, variant: variant });
    }));
};
exports.default = ConnectedCopyNumberVariantPage;
//# sourceMappingURL=CopyNumberVariantPage.js.map