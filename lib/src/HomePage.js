"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_string_1 = __importDefault(require("query-string"));
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const DocumentTitle_1 = __importDefault(require("./DocumentTitle"));
const InfoPage_1 = __importDefault(require("./InfoPage"));
const Link_1 = __importDefault(require("./Link"));
const Searchbox_1 = __importDefault(require("./Searchbox"));
const GnomadLogo_1 = __importDefault(require("./GnomadLogo"));
const HomePage = (0, styled_components_1.default)(InfoPage_1.default) `
  max-width: 740px;
  margin-top: 90px;
`;
const HeadingContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
`;
const Heading = styled_components_1.default.h1 `
  padding-top: 0;
  padding-bottom: 0;
  font-size: 1.2em;
  font-weight: normal;
  letter-spacing: 2px;
  text-align: center;
`;
exports.default = () => (react_1.default.createElement(HomePage, null,
    react_1.default.createElement(DocumentTitle_1.default, null),
    react_1.default.createElement(HeadingContainer, null,
        react_1.default.createElement(GnomadLogo_1.default, { width: "60%" }),
        react_1.default.createElement(Heading, null, "Genome Aggregation Database")),
    react_1.default.createElement(Searchbox_1.default, { width: "100%" }),
    react_1.default.createElement("div", { style: {
            height: '1em',
            borderBottom: '1px solid #666',
            margin: '1em 0 2em',
            textAlign: 'center',
        } },
        react_1.default.createElement("span", { style: {
                position: 'relative',
                top: '0.5em',
                padding: '0 0.5em',
                background: '#fafafa',
            } }, "Or")),
    react_1.default.createElement(ui_1.List, { style: { marginBottom: '2em' } },
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(Link_1.default, { to: "/downloads" }, "Download gnomAD data")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(Link_1.default, { to: "/publications" }, "Read gnomAD publications")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(Link_1.default, { to: "/variant-cooccurrence" }, "Find co-occurrence of two variants")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                    pathname: '/short-tandem-repeats',
                    search: query_string_1.default.stringify({ dataset: 'gnomad_r4' }),
                } }, "Browse tandem repeats in gnomAD")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(Link_1.default, { to: "/help/what-features-are-not-yet-in-v4-and-where-can-i-find-them" }, "Locate features not yet in gnomAD v4"))),
    react_1.default.createElement("p", null,
        "Please note that the gnomAD v3 genomes are now part of gnomAD v4. For more information, see",
        ' ',
        react_1.default.createElement(Link_1.default, { to: "/help/should-i-switch-to-the-latest-version-of-gnomad" }, "\"Should I switch to the latest version of gnomAD?\"")),
    react_1.default.createElement("h2", { style: { fontSize: '1em' } }, "Examples"),
    react_1.default.createElement(ui_1.List, null,
        react_1.default.createElement(ui_1.ListItem, null,
            "Gene:",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: "/gene/ENSG00000169174" }, "PCSK9")),
        react_1.default.createElement(ui_1.ListItem, null,
            "Transcript:",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: "/transcript/ENST00000302118" }, "ENST00000302118")),
        react_1.default.createElement(ui_1.ListItem, null,
            "Variant:",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                    pathname: '/variant/1-55051215-G-GA',
                    search: query_string_1.default.stringify({ dataset: 'gnomad_r4' }),
                } }, "1-55051215-G-GA")),
        react_1.default.createElement(ui_1.ListItem, null,
            "Structural variant region:",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                    pathname: '/region/19-11078371-11144910',
                    search: query_string_1.default.stringify({ dataset: 'gnomad_sv_r4' }),
                } }, "19-11078371-11144910")),
        react_1.default.createElement(ui_1.ListItem, null,
            "Copy number variant region:",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                    pathname: '/region/1-55039447-55064852',
                    search: query_string_1.default.stringify({ dataset: 'gnomad_cnv_r4' }),
                } }, "1-55039447-55064852")),
        react_1.default.createElement(ui_1.ListItem, null,
            "Mitochondrial variant:",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                    pathname: '/variant/M-8602-T-C',
                    search: query_string_1.default.stringify({ dataset: 'gnomad_r4' }),
                } }, "M-8602-T-C")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                    pathname: '/short-tandem-repeats',
                    search: query_string_1.default.stringify({ dataset: 'gnomad_r4' }),
                } },
                "Short tandem repeat",
                ' '),
            "locus:",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                    pathname: 'short-tandem-repeat/ATXN1',
                    search: query_string_1.default.stringify({ dataset: 'gnomad_r4' }),
                } }, "ATXN1")),
        react_1.default.createElement(ui_1.ListItem, null,
            "Regional missense constraint (gnomAD v2, GRCh37):",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                    pathname: '/gene/ENSG00000183454',
                    search: query_string_1.default.stringify({
                        dataset: 'gnomad_r2_1',
                        variant: ['1-55505647-G-T', '1-55523855-G-A'],
                    }),
                } }, "GRIN2A")),
        react_1.default.createElement(ui_1.ListItem, null,
            "Variant co-occurrence (gnomAD v2, GRCh37):",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                    pathname: '/variant-cooccurrence',
                    search: query_string_1.default.stringify({
                        dataset: 'gnomad_r2_1',
                        variant: ['1-55505647-G-T', '1-55523855-G-A'],
                    }),
                } }, "1-55505647-G-T and 1-55523855-G-A"))),
    react_1.default.createElement("h2", null, "New to gnomAD?"),
    react_1.default.createElement("p", null, "Check out these resources to learn about gnomAD and how to use it for variant interpretation."),
    react_1.default.createElement(ui_1.List, null,
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: "https://onlinelibrary.wiley.com/doi/10.1002/humu.24309" },
                react_1.default.createElement("em", null, "Gudmundsson et al. Variant interpretation using population databases: Lessons from gnomAD."),
                ' ',
                "Hum Mutat. 2022 Aug;43(8):1012-1030.")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.broadinstitute.org/videos/mpg-primer-using-gnomad-tips-and-tricks" }, "Using gnomAD - tips and tricks (video)")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.broadinstitute.org/videos/gnomad-using-large-genomic-data-sets-interpret-human-genetic-variation" }, "gnomAD: Using large genomic data sets to interpret human genetic variation (video)")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: "https://rarediseasegenomics.org/blog/six-lessons-for-variant-interpretation" }, "Six lessons for variant interpretation"))),
    react_1.default.createElement("h2", null, "About gnomAD"),
    react_1.default.createElement("p", null,
        "The",
        ' ',
        react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: "/about" }, "Genome Aggregation Database"),
        ' ',
        "(gnomAD) is a resource developed by an international coalition of investigators, with the goal of aggregating and harmonizing both exome and genome sequencing data from a wide variety of large-scale sequencing projects, and making summary data available for the wider scientific community."),
    react_1.default.createElement("p", null,
        "The v4 data set (GRCh38) provided on this website spans 730,947 exome sequences and 76,215 whole-genome sequences from unrelated individuals, of",
        ' ',
        react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: "/stats#diversity" }, "diverse ancestries"),
        ", sequenced as part of various disease-specific and population genetic studies. The gnomAD Principal Investigators and team can be found ",
        react_1.default.createElement(Link_1.default, { to: "/team" }, "here"),
        ", and the groups that have contributed data to the current release are listed",
        ' ',
        react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: "/about" }, "here"),
        "."),
    react_1.default.createElement("p", null,
        "All data here are released for the benefit of the wider biomedical community, without restriction on use - see the",
        ' ',
        react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: "/policies" }, "terms of use"),
        ". Sign up for our",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "https://groups.google.com/forum/#!forum/exac_data_announcements" }, "mailing list"),
        ' ',
        "for future release announcements.")));
//# sourceMappingURL=HomePage.js.map