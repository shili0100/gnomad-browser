"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
// JSON containing information for all members with bios and headshots
const TeamMembers_json_1 = __importDefault(require("./TeamMembers.json"));
// use Webpack Context to dynamically import all headshots
const headshotLoader_1 = __importDefault(require("./headshotLoader"));
// Members of the "Contributors" section
// @ts-expect-error
const data_generation_md_1 = __importDefault(require("../../about/contributors/data-generation.md"));
// @ts-expect-error
const production_and_analysis_md_1 = __importDefault(require("../../about/contributors/production-and-analysis.md"));
// @ts-expect-error
const structural_variation_md_1 = __importDefault(require("../../about/contributors/structural-variation.md"));
// @ts-expect-error
const mitochondrial_variation_md_1 = __importDefault(require("../../about/contributors/mitochondrial-variation.md"));
// @ts-expect-error
const broad_genomics_platform_md_1 = __importDefault(require("../../about/contributors/broad-genomics-platform.md"));
// @ts-expect-error
const ethics_md_1 = __importDefault(require("../../about/contributors/ethics.md"));
// Members of the 'Alumni' Section
// @ts-expect-error
const alumni_md_1 = __importDefault(require("../../about/contributors/alumni.md"));
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const InfoPage_1 = __importDefault(require("../InfoPage"));
const Team = styled_components_1.default.div `
  padding-bottom: 1rem;
`;
const TeamSection = styled_components_1.default.div `
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;
const TeamSectionList = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 1rem;
  margin: 1rem auto;
`;
const ColumnList = styled_components_1.default.div `
  content: '';
  display: table;
  width: 100%;
  clear: both;
`;
const ResponsiveColumn = styled_components_1.default.div `
  float: left;
  width: 33.33%;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
const renderTeamMembers = (members) => {
    return (react_1.default.createElement(TeamSectionList, null, members.map((member) => {
        return (react_1.default.createElement(TeamCard, { key: member.name, title: member.name, description: member.bio, headshotSource: member.headshotSource, alsoOnCommitteeHuh: member.alsoOnCommittee }));
    })));
};
// Component to be used for a TeamCard, only used on this page
// @ts-expect-error
const TeamCard = ({ title, description, headshotSource, alsoOnCommitteeHuh }) => {
    return (react_1.default.createElement(TeamHeadshotAndDescription, null,
        react_1.default.createElement(Row, null,
            react_1.default.createElement(ImageColumn, null, headshotSource && (react_1.default.createElement(Headshot, { alt: `Headshot of ${title}`, src: 
                // @ts-expect-error
                headshotLoader_1.default[headshotSource] }))),
            react_1.default.createElement(TextColumn, null,
                react_1.default.createElement(TextTitle, null, title),
                alsoOnCommitteeHuh && (react_1.default.createElement(TextBlurb, null,
                    ", in addition to being a member of the ",
                    react_1.default.createElement(ui_1.Link, { href: "#steering-committee" }, " gnomAD Steering Committee"),
                    ', ')),
                react_1.default.createElement(TextBlurb, null,
                    " ",
                    description)))));
};
TeamCard.propTypes = {
    title: prop_types_1.default.string.isRequired,
    description: prop_types_1.default.string.isRequired,
    headshotSource: prop_types_1.default.string,
    alsoOnCommitteeHuh: prop_types_1.default.bool,
};
TeamCard.defaultProps = {
    headshotSource: 'blank_profile.jpg',
    alsoOnCommitteeHuh: false,
};
const TeamHeadshotAndDescription = styled_components_1.default.div `
  width: 100%;
  padding-bottom: 2rem;
`;
const Row = styled_components_1.default.div `
  display: flex;

  @media screen and (max-width: 992px) {
    display: block;
    margin-bottom: 2em;
  }
`;
const ImageColumn = styled_components_1.default.div `
  padding-right: 0.5rem;

  @media screen and (max-width: 992px) {
    margin-bottom: 1em;
  }
`;
const Headshot = styled_components_1.default.img `
  width: 12rem;
`;
const TextColumn = styled_components_1.default.div `
  padding-left: 2rem;
  line-height: 1.5;
  text-align: start;

  @media screen and (max-width: 992px) {
    padding-left: 0;
  }
`;
const TextTitle = styled_components_1.default.span `
  font-weight: bold;
`;
const TextBlurb = styled_components_1.default.span `
  margin-top: 1rem;
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
const TeamPage = () => {
    return (react_1.default.createElement(InfoPage_1.default, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: "The gnomAD Team" }),
        react_1.default.createElement(ui_1.PageHeading
        // @ts-expect-error
        , { 
            // @ts-expect-error
            id: "the-gnomad-team" }, "The gnomAD Team"),
        react_1.default.createElement(Team, null,
            react_1.default.createElement(TeamSection, null,
                react_1.default.createElement("h2", { id: "gnomad-committee" }, "gnomAD Steering Committee"),
                react_1.default.createElement("p", null, "The gnomAD Steering Committee (SC) consists of investigators with expertise in genomic sequencing, computational analysis, and rare disease genomics as well as key staff who are deeply involved with building and maintaining gnomAD."),
                react_1.default.createElement("br", null),
                react_1.default.createElement("h3", { id: "co-directors" }, "gnomAD Co-Directors"),
                renderTeamMembers(TeamMembers_json_1.default.gnomadCoDirectors),
                react_1.default.createElement("h3", { id: "steering-committee" }, "gnomAD Steering Committee"),
                renderTeamMembers(TeamMembers_json_1.default.gnomadCommittee)),
            react_1.default.createElement(TeamSection, null,
                react_1.default.createElement("h2", { id: "scientific-advisory-board" }, "gnomAD's Scientific Advisory Board"),
                react_1.default.createElement("p", null, "Our Scientific Advisory Board, consists of a geographically and ethnically diverse set of individuals with backgrounds spanning genomics research, clinical service and ELSI work. The role of the gnomAD SAB is to provide guidance on the development of our resource and how we can best and most equitably serve the scientific and clinical communities."),
                renderTeamMembers(TeamMembers_json_1.default.scientificAdvisoryBoard)),
            react_1.default.createElement("br", null),
            react_1.default.createElement(TeamSection, null,
                react_1.default.createElement("h2", { id: "gnomad-staff" }, "Staff"),
                react_1.default.createElement("p", null, "Our staff includes individuals with a variety of backgrounds and skills including software development, computational biology, project management, and clinical genetics. The team works to create the gnomAD datasets, develop and support the browser, answer all gnomAD emails, and handle all the regulatory requirements, amongst many other roles."),
                react_1.default.createElement("br", null),
                react_1.default.createElement("h3", { id: "website-staff" }, "Website"),
                renderTeamMembers(TeamMembers_json_1.default.browser),
                react_1.default.createElement("br", null),
                react_1.default.createElement("h3", { id: "production-staff" }, "Production"),
                renderTeamMembers(TeamMembers_json_1.default.production),
                react_1.default.createElement("br", null),
                react_1.default.createElement("h3", { id: "operations-staff" }, "Operations"),
                renderTeamMembers(TeamMembers_json_1.default.operations)),
            react_1.default.createElement(TeamSection, null,
                react_1.default.createElement("h2", { id: "gnomad-contributors" }, "Contributors"),
                react_1.default.createElement(TeamSectionList, null,
                    react_1.default.createElement(ColumnList, null,
                        react_1.default.createElement(ResponsiveColumn, null,
                            react_1.default.createElement("h3", { id: "data-generation-contributors" }, "Data Generation"),
                            react_1.default.createElement(Contributors, { "aria-labelledby": "data-generation-contributors", dangerouslySetInnerHTML: { __html: data_generation_md_1.default.html } }),
                            react_1.default.createElement("br", null),
                            react_1.default.createElement("h3", { id: "broad-genomics-platform" }, "Broad Genomics Platform"),
                            react_1.default.createElement(Contributors, { "aria-labelledby": "broad-genomics-platform", dangerouslySetInnerHTML: { __html: broad_genomics_platform_md_1.default.html } })),
                        react_1.default.createElement(ResponsiveColumn, null,
                            react_1.default.createElement("h3", { id: "structural-variation-contributors" }, "Structural Variants"),
                            react_1.default.createElement(Contributors, { "aria-labelledby": "structural-variation-contributors", dangerouslySetInnerHTML: { __html: structural_variation_md_1.default.html } }),
                            react_1.default.createElement("br", null),
                            react_1.default.createElement("h3", { id: "mitochondrial-variants-contributors" }, "Mitochondrial Variants"),
                            react_1.default.createElement(Contributors, { "aria-labelledby": "mitochondrial-variants-contributors", dangerouslySetInnerHTML: { __html: mitochondrial_variation_md_1.default.html } })),
                        react_1.default.createElement(ResponsiveColumn, null,
                            react_1.default.createElement("h3", { id: "ethics-contributors" }, "Production and Analysis"),
                            react_1.default.createElement(Contributors, { "aria-labelledby": "production-and-analysis-contributors", dangerouslySetInnerHTML: { __html: production_and_analysis_md_1.default.html } }),
                            react_1.default.createElement("br", null),
                            react_1.default.createElement("h3", { id: "ethics-contributors" }, "Ethics"),
                            react_1.default.createElement(Contributors, { "aria-labelledby": "ethics-contributors", dangerouslySetInnerHTML: { __html: ethics_md_1.default.html } }))))),
            react_1.default.createElement(TeamSection, null,
                react_1.default.createElement("h2", { id: "gnomad-alumni" }, "Alumni"),
                react_1.default.createElement(TeamSectionList, null,
                    react_1.default.createElement(ColumnList, null,
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(Contributors, { "aria-labelledby": "alumni", dangerouslySetInnerHTML: { __html: alumni_md_1.default.html } }))))))));
};
exports.default = TeamPage;
//# sourceMappingURL=TeamPage.js.map