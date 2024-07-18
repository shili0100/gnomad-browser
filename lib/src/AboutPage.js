"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
// @ts-expect-error
const about_md_1 = __importDefault(require("../about/about.md"));
// @ts-expect-error
const contributing_projects_md_1 = __importDefault(require("../about/contributors/contributing-projects.md"));
// @ts-expect-error
const funding_md_1 = __importDefault(require("../about/contributors/funding.md"));
// @ts-expect-error
const data_contributors_md_1 = __importDefault(require("../about/contributors/data-contributors.md"));
// @ts-expect-error
const gcbr_md_1 = __importDefault(require("../about/contributors/gcbr/gcbr.md"));
const DocumentTitle_1 = __importDefault(require("./DocumentTitle"));
const InfoPage_1 = __importDefault(require("./InfoPage"));
const MarkdownContent_1 = __importDefault(require("./MarkdownContent"));
const Credits = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 992px) {
    flex-direction: column;
    font-size: 16px;
  }
`;
const SectionHeader = styled_components_1.default.h2 `
  padding-top: 2rem;
  margin-top: 2rem;
`;
const CreditsSection = styled_components_1.default.div `
  width: calc(
    ${(props) => 
// @ts-expect-error
props.width} - 15px
  );

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const Contributors = styled_components_1.default.div `
  line-height: 1.5;

  ul {
    padding-left: 0;
    margin: 0;
    list-style-type: none;
  }

  ul ul {
    padding-left: 20px;
    margin: 0.5em 0;
  }
`;
const PrincipalInvestigators = (0, styled_components_1.default)(Contributors) `
  columns: 2;

  @media (max-width: 992px) {
    columns: 1;
  }
`;
const FundingSources = (0, styled_components_1.default)(Contributors) `
  li {
    margin-bottom: 1rem;
  }
`;
exports.default = () => (react_1.default.createElement(InfoPage_1.default, null,
    react_1.default.createElement(DocumentTitle_1.default, { title: "About gnomAD" }),
    react_1.default.createElement(ui_1.PageHeading
    // @ts-expect-error
    , { 
        // @ts-expect-error
        id: "about-gnomad" }, "About gnomAD"),
    react_1.default.createElement(MarkdownContent_1.default, { dangerouslySetInnerHTML: { __html: about_md_1.default.html } }),
    react_1.default.createElement(SectionHeader, null, "Funding"),
    react_1.default.createElement(Credits, null,
        react_1.default.createElement(CreditsSection
        // @ts-expect-error
        , { 
            // @ts-expect-error
            width: "45%" },
            react_1.default.createElement(FundingSources, { "aria-labelledby": "funding", dangerouslySetInnerHTML: { __html: funding_md_1.default.html } }),
            react_1.default.createElement("p", null, "The vast majority of the data storage, computing resources, and human effort used to generate this call set were donated by the Broad Institute")),
        react_1.default.createElement(CreditsSection
        // @ts-expect-error
        , { 
            // @ts-expect-error
            width: "45%" },
            react_1.default.createElement(FundingSources, { "aria-labelledby": "gcbr", dangerouslySetInnerHTML: { __html: gcbr_md_1.default.html } }))),
    react_1.default.createElement(SectionHeader, null, "Data Contributors"),
    react_1.default.createElement(Credits, null,
        react_1.default.createElement(CreditsSection
        // @ts-expect-error
        , { 
            // @ts-expect-error
            width: "45%" },
            react_1.default.createElement("h3", { id: "principal-investigators" }, "Data Contributors"),
            react_1.default.createElement(PrincipalInvestigators, { "aria-labelledby": "principal-investigators", dangerouslySetInnerHTML: { __html: data_contributors_md_1.default.html } })),
        react_1.default.createElement(CreditsSection
        // @ts-expect-error
        , { 
            // @ts-expect-error
            width: "45%" },
            react_1.default.createElement("h3", { id: "contributing-projects" }, "Contributing projects"),
            react_1.default.createElement(Contributors, { "aria-labelledby": "contributing-projects", dangerouslySetInnerHTML: { __html: contributing_projects_md_1.default.html } })))));
//# sourceMappingURL=AboutPage.js.map