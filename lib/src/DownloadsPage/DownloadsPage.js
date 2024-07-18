"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const InfoPage_1 = __importDefault(require("../InfoPage"));
const downloadsPageStyles_1 = require("./downloadsPageStyles");
const TableOfContents_1 = __importDefault(require("./TableOfContents"));
// @ts-expect-error
const DownloadsPage_module_css_1 = __importDefault(require("./DownloadsPage.module.css"));
const GnomadV4Downloads_1 = __importDefault(require("./GnomadV4Downloads"));
const GnomadV3Downloads_1 = __importDefault(require("./GnomadV3Downloads"));
const GnomadV2Downloads_1 = __importDefault(require("./GnomadV2Downloads"));
const GnomadV2LiftoverDownloads_1 = __importDefault(require("./GnomadV2LiftoverDownloads"));
const ExacDownloads_1 = __importDefault(require("./ExacDownloads"));
const CodeBlock = styled_components_1.default.code `
  display: inline-block;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0.5em 1em;
  border-radius: 0.25em;
  background: #333;
  color: #fafafa;
  font-family: monospace;
  line-height: 1.6;
  white-space: nowrap;

  &::before {
    content: '$ ';
  }
`;
const TextSection = styled_components_1.default.div `
  width: 70%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const TableOfContentsSection = styled_components_1.default.div `
  /* stylelint-disable-next-line value-no-vendor-prefix */
  position: -webkit-sticky;
  position: sticky;
  top: 1rem;
  width: 25%;
  float: right;
  padding-bottom: 1rem;
  border-left: 1px solid lightgrey;

  @media (max-width: 900px) {
    display: none;
  }
`;
const BottomSpacer = styled_components_1.default.div `
  margin-bottom: 40rem;
`;
const DownloadsPage = () => {
    // Load stylesheet to make smooth scroll behavior active
    const _style = DownloadsPage_module_css_1.default.html;
    return (react_1.default.createElement(InfoPage_1.default, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: "Downloads" }),
        react_1.default.createElement(ui_1.PageHeading, null, "Downloads"),
        react_1.default.createElement(TableOfContentsSection, null,
            react_1.default.createElement(TableOfContents_1.default, null)),
        react_1.default.createElement(TextSection, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(downloadsPageStyles_1.SectionTitle, { id: "summary", theme: { type: 'datasets' } }, "Summary"),
                react_1.default.createElement("p", null,
                    "gnomAD data is available for download through",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://cloud.google.com/public-datasets" }, "Google Cloud Public Datasets"),
                    ", the",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://registry.opendata.aws/" }, "Registry of Open Data on AWS"),
                    ", and",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://azure.microsoft.com/en-us/services/open-datasets/" }, "Azure Open Datasets"),
                    "."),
                react_1.default.createElement("p", null,
                    "We recommend using ",
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://hail.is/" }, "Hail"),
                    " and our",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://github.com/broadinstitute/gnomad_methods" }, "Hail utilities for gnomAD"),
                    ' ',
                    "to work with the data."),
                react_1.default.createElement(downloadsPageStyles_1.StyledParagraph, null,
                    "In addition to the files listed below,",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://terra.bio" }, "Terra"),
                    " has",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://terra.bio/a-demo-workspace-for-working-with-gnomad-data-in-terra/" }, "a demo workspace for working with gnomAD data"),
                    "."),
                react_1.default.createElement("h3", null, "Google Cloud Public Datasets"),
                react_1.default.createElement("p", null,
                    "Files can be browsed and downloaded using",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://cloud.google.com/storage/docs/gsutil" }, "gsutil"),
                    "."),
                react_1.default.createElement("p", null,
                    react_1.default.createElement(CodeBlock, null, "gsutil ls gs://gcp-public-data--gnomad/release/")),
                react_1.default.createElement("p", null,
                    "gnomAD variants are also available as a",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://console.cloud.google.com/marketplace/product/broad-institute/gnomad" }, "BigQuery dataset"),
                    "."),
                react_1.default.createElement(downloadsPageStyles_1.StyledParagraph, null,
                    react_1.default.createElement("em", null, "Please note, this BigQuery dataset is maintained entirely by Google. The gnomAD team has no ability to provide a consistent experience in BigQuery.")),
                react_1.default.createElement("h3", null, "Registry of Open Data on AWS"),
                react_1.default.createElement("p", null,
                    "Files can be browsed and downloaded using the",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://docs.aws.amazon.com/cli/" }, "AWS Command Line Interface"),
                    "."),
                react_1.default.createElement(downloadsPageStyles_1.StyledParagraph, null,
                    react_1.default.createElement(CodeBlock, null, "aws s3 ls s3://gnomad-public-us-east-1/release/")),
                react_1.default.createElement("h3", null, "Azure Open Datasets"),
                react_1.default.createElement("p", null,
                    "Files can be browsed and downloaded using",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10" }, "AzCopy"),
                    ' ',
                    "or",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://azure.microsoft.com/en-us/features/storage-explorer/" }, "Azure Storage Explorer"),
                    "."),
                react_1.default.createElement("p", null,
                    react_1.default.createElement(CodeBlock, null, "azcopy ls https://datasetgnomad.blob.core.windows.net/dataset/")),
                react_1.default.createElement(downloadsPageStyles_1.StyledParagraph, null,
                    "gnomAD variants are also available in Parquet format.",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://docs.microsoft.com/en-us/azure/open-datasets/dataset-gnomad" }, "Find more information on the Azure website"),
                    "."),
                react_1.default.createElement("h3", null, "Downloads"),
                react_1.default.createElement(downloadsPageStyles_1.StyledParagraph, null,
                    "See",
                    ' ',
                    react_1.default.createElement(Link_1.default, { to: "/help/whats-the-difference-between-the-different-versions-of-gnomad" }, "\u201CWhat's the difference between different versions of gnomad?\u201D"),
                    ' ',
                    "to decide which version is right for you."),
                react_1.default.createElement("h3", null, "Core Dataset vs Secondary Analyses"),
                react_1.default.createElement(downloadsPageStyles_1.StyledParagraph, null,
                    "Within a versioned release, datasets available for download fall under two categories. The Core Dataset is the gnomAD database and analyses created and maintained by the",
                    ' ',
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://gnomad.broadinstitute.org/team#production-staff" }, "gnomAD production team"),
                    ". Secondary Analyses are additional analyses developed in collaboration with laboratories of the ",
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://gnomad.broadinstitute.org/team#steering-committee" }, "gnomAD steering committee"),
                    ".")),
            react_1.default.createElement("hr", null),
            react_1.default.createElement(GnomadV4Downloads_1.default, null),
            react_1.default.createElement(GnomadV3Downloads_1.default, null),
            react_1.default.createElement(GnomadV2LiftoverDownloads_1.default, null),
            react_1.default.createElement(GnomadV2Downloads_1.default, null),
            react_1.default.createElement(ExacDownloads_1.default, null),
            react_1.default.createElement(BottomSpacer, null))));
};
exports.default = DownloadsPage;
//# sourceMappingURL=DownloadsPage.js.map