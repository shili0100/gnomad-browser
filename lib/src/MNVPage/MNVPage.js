"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const Delayed_1 = __importDefault(require("../Delayed"));
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const GnomadPageHeading_1 = __importDefault(require("../GnomadPageHeading"));
const ReadData_1 = __importDefault(require("../ReadData/ReadData"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const variantFeedback_1 = require("../variantFeedback");
const VariantNotFound_1 = __importDefault(require("../VariantPage/VariantNotFound"));
const MNVConsequenceList_1 = __importDefault(require("./MNVConsequenceList"));
const MNVConstituentSNVFrequencyTable_1 = __importDefault(require("./MNVConstituentSNVFrequencyTable"));
const MNVDetailsQuery_1 = __importDefault(require("./MNVDetailsQuery"));
const MNVFrequencyTable_1 = __importDefault(require("./MNVFrequencyTable"));
const MNVSummaryList_1 = __importDefault(require("./MNVSummaryList"));
const Section = styled_components_1.default.section `
  width: 100%;
  margin-bottom: 2em;
`;
const ColumnWrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`;
const Column = styled_components_1.default.div `
  width: calc(50% - 15px);

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const MNVPage = ({ datasetId, variantId }) => (
// @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
react_1.default.createElement(ui_1.Page, null,
    react_1.default.createElement(DocumentTitle_1.default, { title: `${variantId} | ${(0, metadata_1.labelForDataset)(datasetId)}` }),
    react_1.default.createElement(GnomadPageHeading_1.default, { datasetOptions: {
            includeExac: false,
            includeGnomad3: false,
            includeGnomad2Subsets: false,
            includeStructuralVariants: false,
        }, selectedDataset: datasetId },
        "Multi-nucleotide variant: ",
        variantId),
    react_1.default.createElement(MNVDetailsQuery_1.default, { datasetId: datasetId, variantId: variantId }, ({ data, error, loading }) => {
        if (loading) {
            return (react_1.default.createElement(Delayed_1.default, null,
                react_1.default.createElement(StatusMessage_1.default, null, "Loading variant...")));
        }
        if (error) {
            return react_1.default.createElement(StatusMessage_1.default, null, "Unable to load variant");
        }
        if (!data.multiNucleotideVariant) {
            // @ts-expect-error TS(2322) FIXME: Type '{ datasetId: string; variantId: string; }' i... Remove this comment to see the full error message
            return react_1.default.createElement(VariantNotFound_1.default, { datasetId: datasetId, variantId: variantId });
        }
        const variant = data.multiNucleotideVariant;
        const numGenes = new Set(variant.consequences.map((csq) => csq.gene_id)).size;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Section, null,
                react_1.default.createElement(ColumnWrapper, null,
                    react_1.default.createElement(Column, null,
                        react_1.default.createElement(MNVFrequencyTable_1.default, { variant: variant }),
                        variant.related_mnvs.length > 0 && (react_1.default.createElement("div", null,
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "This variant's consequence may be affected by other variants:")),
                            react_1.default.createElement(MNVSummaryList_1.default, { multiNucleotideVariants: variant.related_mnvs })))),
                    react_1.default.createElement(Column, null,
                        react_1.default.createElement("h2", null, "References"),
                        react_1.default.createElement(ui_1.List, null,
                            react_1.default.createElement(ui_1.ListItem, null,
                                react_1.default.createElement(ui_1.ExternalLink, { href: `https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&highlight=hg19.chr${variant.chrom}%3A${variant.pos}-${variant.pos}&position=chr${variant.chrom}%3A${variant.pos - 25}-${variant.pos + 25}` }, "UCSC"))),
                        react_1.default.createElement("h2", null, "Feedback"),
                        react_1.default.createElement(ui_1.ExternalLink, { href: (0, variantFeedback_1.variantFeedbackUrl)(variant, datasetId) }, "Report an issue with this variant")))),
            react_1.default.createElement(Section, null,
                react_1.default.createElement("h2", null, "Annotations"),
                react_1.default.createElement("p", null,
                    "This variant falls in the canonical transcript of ",
                    numGenes,
                    " gene",
                    numGenes !== 1 && 's',
                    "."),
                react_1.default.createElement(MNVConsequenceList_1.default, { variant: variant })),
            react_1.default.createElement(Section, null,
                react_1.default.createElement("h2", null, "Constituent SNVs"),
                react_1.default.createElement("div", { style: { width: '100%', overflowX: 'auto' } },
                    react_1.default.createElement(MNVConstituentSNVFrequencyTable_1.default, { snvs: variant.constituent_snvs }))),
            react_1.default.createElement(Section, null,
                react_1.default.createElement("h2", null, "Read Data"),
                react_1.default.createElement("p", null, "These reads were generated based on the constituent SNVs, therefore:"),
                react_1.default.createElement(ui_1.List, null,
                    react_1.default.createElement(ui_1.ListItem, null, "A read may not be from an individual carrying the MNV."),
                    react_1.default.createElement(ui_1.ListItem, null, "Reads from individuals carrying the MNV may be shown more than once.")),
                react_1.default.createElement(ReadData_1.default, { datasetId: datasetId, variantIds: variant.constituent_snvs.map((snv) => snv.variant_id) }))));
    })));
exports.default = MNVPage;
//# sourceMappingURL=MNVPage.js.map