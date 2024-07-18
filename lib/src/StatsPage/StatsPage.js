"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ageDistribution_json_1 = __importDefault(require("../../dataset-metadata/datasets/gnomad-v4/ageDistribution.json"));
const ui_1 = require("@gnomad/ui");
// @ts-ignore - TS2307 Cannot fine module ... or its corresponding type declarations.
const browser_pageviews_png_1 = __importDefault(require("../../about/stats/browser_pageviews.png"));
// @ts-ignore - TS2307 Cannot fine module ... or its corresponding type declarations.
const browser_world_png_1 = __importDefault(require("../../about/stats/browser_world.png"));
// @ts-ignore - TS2307 Cannot fine module ... or its corresponding type declarations.
const diversity_badge_png_1 = __importDefault(require("../../about/stats/diversity_badge.png"));
// @ts-ignore - TS2307 Cannot fine module ... or its corresponding type declarations.
const snvs_per_bp_avg_png_1 = __importDefault(require("../../about/stats/snvs_per_bp_avg.png"));
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const Histogram_1 = __importDefault(require("../Histogram"));
const HelpPage_1 = require("../help/HelpPage");
const InfoPage_1 = __importDefault(require("../InfoPage"));
const Link_1 = __importDefault(require("../Link"));
const gnomADExomeGenomeCountsByVersion_json_1 = __importDefault(require("./BarGraphData/gnomADExomeGenomeCountsByVersion.json"));
const gnomadV4GeneticAncestryCounts_json_1 = __importDefault(require("./BarGraphData/gnomadV4GeneticAncestryCounts.json"));
const gnomadV4GeneticDiversityCounts_json_1 = __importDefault(require("./BarGraphData/gnomadV4GeneticDiversityCounts.json"));
const NumberOfVariantsInGnomadList_1 = __importStar(require("./NumberOfVariantsInGnomadList"));
const StackedBarGraph_1 = __importDefault(require("./StackedBarGraph"));
const GeneticAncestryGroupsByVersionTable_1 = __importDefault(require("./StatsPageTables/GeneticAncestryGroupsByVersionTable"));
const V4GeneticAncestryTable_1 = __importDefault(require("./StatsPageTables/V4GeneticAncestryTable"));
const StudyDiseasesInGnomadTable_1 = __importDefault(require("./StatsPageTables/StudyDiseasesInGnomadTable"));
const InferredSexPerGeneticAncestryTables_1 = require("./StatsPageTables/InferredSexPerGeneticAncestryTables");
const TwoColumnLayout = styled_components_1.default.div `
  display: flex;
  justify-content: space-around;

  @media (max-width: 992px) {
    display: block;
  }
`;
const ResponsiveHalfWidthColumn = styled_components_1.default.div `
  width: 50%;

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const ResponsiveGnomadSamplesContainer = styled_components_1.default.div `
  width: 70%;

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const DiversityBarGraphContainer = styled_components_1.default.div `
  display: flex;
  justify-content: space-around;

  @media (max-width: 992px) {
    display: block;
    width: 100%;
  }
`;
const DiversityBarGraph = styled_components_1.default.div `
  width: 70%;

  @media (max-width: 992px) {
    display: block;
    width: 100%;
  }
`;
const SexDistributionList = styled_components_1.default.div `
  width: 30%;

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const CenteredContainer = styled_components_1.default.div `
  display: flex;
  justify-content: space-around;
`;
const ResponsiveTable = styled_components_1.default.div `
  display: flex;
  justify-content: space-around;

  @media (max-width: 992px) {
    display: block;
  }
`;
const StatsSection = styled_components_1.default.div `
  margin-bottom: 5em;
`;
const StatsHighlightColorBlock = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin: 1em 0 2em 0;
  background-color: ${(props) => props.theme.color};
  color: white;
  border-radius: 1.5em;
  text-align: center;
`;
const StatsHighlightTitle = styled_components_1.default.h1 `
  margin: 0;
  font-size: 3.75em;
`;
const StatsHighlightText = styled_components_1.default.p `
  margin: 0;
  font-size: 1.25em;
`;
const CountriesColoredText = styled_components_1.default.span `
  color: #508a14;
  font-weight: bold;
`;
const DiversityBarGraphTooltip = (row) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("b", null, row.label),
        react_1.default.createElement("div", null,
            row['European'].toLocaleString(),
            " European"),
        react_1.default.createElement("div", null,
            row['Remaining'].toLocaleString(),
            " Remaining"),
        react_1.default.createElement("div", null,
            row['Ashkenazi Jewish'].toLocaleString(),
            " Ashkenazi Jewish"),
        react_1.default.createElement("div", null,
            row['Admixed American'].toLocaleString(),
            " Admixed American"),
        react_1.default.createElement("div", null,
            row['African'].toLocaleString(),
            " African"),
        react_1.default.createElement("div", null,
            row['Middle Eastern'].toLocaleString(),
            " Middle Eastern"),
        react_1.default.createElement("div", null,
            row['South Asian'].toLocaleString(),
            " South Asian"),
        react_1.default.createElement("div", null,
            row['East Asian'].toLocaleString(),
            " East Asian")));
};
const StatsHighlightBlock = ({ title, text, color, }) => {
    return (react_1.default.createElement(StatsHighlightColorBlock, { theme: { color } },
        react_1.default.createElement("div", null,
            react_1.default.createElement(StatsHighlightTitle, null, title),
            react_1.default.createElement(StatsHighlightText, null, text))));
};
const gnomadBlue = '#0E6FBF';
const gnomadGreen = '#508A14';
const barGraphTooltip = (row) => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement("b", null, row.label),
    react_1.default.createElement("div", null,
        row.Exomes.toLocaleString(),
        " exomes"),
    react_1.default.createElement("div", null,
        row.Genomes.toLocaleString(),
        " genomes")));
const StatsPage = () => {
    return (react_1.default.createElement(InfoPage_1.default, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: "Stats" }),
        react_1.default.createElement(ui_1.PageHeading, { id: "gnomad-stats" }, "What's in gnomAD"),
        react_1.default.createElement("div", null,
            react_1.default.createElement(StatsSection, { style: { marginTop: '2em' } },
                react_1.default.createElement(TwoColumnLayout, null,
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", null, "gnomAD v4 includes 807,162 individuals"),
                        react_1.default.createElement(NumberOfVariantsInGnomadList_1.SectionList, null,
                            react_1.default.createElement("li", null,
                                "730,947 ",
                                react_1.default.createElement("span", { style: { color: gnomadBlue } }, "exomes"),
                                react_1.default.createElement(NumberOfVariantsInGnomadList_1.SectionList, null,
                                    react_1.default.createElement("li", null, "314,392 in the non-UKB subset"))),
                            react_1.default.createElement("li", null,
                                "76,215 ",
                                react_1.default.createElement("span", { style: { color: gnomadGreen } }, "genomes"))),
                        react_1.default.createElement("h2", null, "v4 variants"),
                        react_1.default.createElement(NumberOfVariantsInGnomadList_1.default, null)),
                    react_1.default.createElement(ResponsiveHalfWidthColumn, null,
                        react_1.default.createElement("div", { style: { marginTop: '4em', marginBottom: '7em', minWidth: '550px' } },
                            react_1.default.createElement(StackedBarGraph_1.default, { title: "Sample size across major ExAC/gnomAD releases", barColors: gnomADExomeGenomeCountsByVersion_json_1.default.colors, barValues: gnomADExomeGenomeCountsByVersion_json_1.default.data, height: 400, formatTooltip: barGraphTooltip, xLabel: "", yLabel: "Number of samples", displayNumbers: true })),
                        react_1.default.createElement(CenteredContainer, null,
                            react_1.default.createElement("img", { alt: "2.9x increase in non-European individuals", src: snvs_per_bp_avg_png_1.default, width: "250px", height: "250px" }))))),
            react_1.default.createElement(StatsSection, null,
                react_1.default.createElement(HelpPage_1.SectionHeading, { id: "age-and-sex-distribution" }, "What is the age and sex distribution in gnomAD?"),
                react_1.default.createElement(TwoColumnLayout, null,
                    react_1.default.createElement(ResponsiveGnomadSamplesContainer, null,
                        react_1.default.createElement("h3", null, "Age"),
                        react_1.default.createElement(TwoColumnLayout, null,
                            react_1.default.createElement(ResponsiveHalfWidthColumn, null,
                                react_1.default.createElement("p", null, "Exomes"),
                                react_1.default.createElement(Histogram_1.default
                                // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                                , { 
                                    // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                                    binEdges: ageDistribution_json_1.default.exome.bin_edges, binValues: ageDistribution_json_1.default.exome.bin_freq, nSmaller: ageDistribution_json_1.default.exome.n_smaller, nLarger: ageDistribution_json_1.default.exome.n_larger, barColor: gnomadBlue, xLabel: "Age", yLabel: "Individuals", formatTooltip: (bin) => `${bin.label}: ${bin.value.toLocaleString()} individuals` })),
                            react_1.default.createElement(ResponsiveHalfWidthColumn, null,
                                react_1.default.createElement("p", null, "Genomes"),
                                react_1.default.createElement(Histogram_1.default
                                // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                                , { 
                                    // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                                    binEdges: ageDistribution_json_1.default.genome.bin_edges, binValues: ageDistribution_json_1.default.genome.bin_freq, nSmaller: ageDistribution_json_1.default.genome.n_smaller, nLarger: ageDistribution_json_1.default.genome.n_larger, barColor: gnomadGreen, xLabel: "Age", yLabel: "Individuals", formatTooltip: (bin) => `${bin.label}: ${bin.value.toLocaleString()} individuals` })))),
                    react_1.default.createElement(SexDistributionList, null,
                        react_1.default.createElement("h3", null, "Sex"),
                        react_1.default.createElement("ul", null,
                            react_1.default.createElement("li", null, "406,265 XX individuals"),
                            react_1.default.createElement("li", null, "400,897 XY individuals")))),
                react_1.default.createElement("p", { style: { marginTop: '5em' } },
                    "To learn more about how we calculate the sex and age distribution please see our",
                    ' ',
                    react_1.default.createElement(Link_1.default, { to: "/help" }, "FAQs"))),
            react_1.default.createElement(StatsSection, null,
                react_1.default.createElement(HelpPage_1.SectionHeading, { id: "samples" }, "Where do gnomAD samples come from?"),
                react_1.default.createElement("div", { style: { width: '100%' } },
                    react_1.default.createElement(TwoColumnLayout, null,
                        react_1.default.createElement(StatsHighlightBlock, { color: gnomadBlue, title: "308", text: "Data Contributors" }),
                        react_1.default.createElement(StatsHighlightBlock, { color: gnomadGreen, title: ">100", text: "Studies from around the world" }))),
                react_1.default.createElement("p", null,
                    "The gnomAD project brings in samples recruited for various studies based around the world. We are not always provided information about where samples are obtained, but we are often provided the country of the study's institutional review board (IRB).",
                    ' '),
                react_1.default.createElement("p", null,
                    "Version 4 of gnomAD contains samples with IRBs based in at least 25 different countries, including:",
                    ' ',
                    react_1.default.createElement(CountriesColoredText, null, "Australia, Bangladesh, Belgium, Canada, China, England, Finland, France, Germany, Israel, Italy, Japan, Kenya, Korea, Lithuania, Mexico, Netherlands, Pakistan, Scotland, Singapore, Spain, Sweden, United Arab Emirates, United States, Wales.")),
                react_1.default.createElement("p", null,
                    "To see a list of studies included in gnomAD and data contributors please visit our",
                    ' ',
                    react_1.default.createElement(Link_1.default, { to: "/about" }, "about page"),
                    ".")),
            react_1.default.createElement(StatsSection, null,
                react_1.default.createElement(HelpPage_1.SectionHeading, { id: "diversity" }, "Diversity in gnomAD"),
                react_1.default.createElement("h3", { style: { marginBottom: '2em' } }, "Genetic ancestry groups in gnomAD by version"),
                react_1.default.createElement(TwoColumnLayout, { style: { marginBottom: '5em' } },
                    react_1.default.createElement("img", { alt: "2.9x increase in non-European individuals", src: diversity_badge_png_1.default, width: "275px" }),
                    react_1.default.createElement(ResponsiveHalfWidthColumn, null,
                        react_1.default.createElement("p", null, "We continue to improve the diversity of the genetic ancestry groups within gnomAD. While v4 does have some improvements we continue to strive to increase representation of historically underrepresented populations."),
                        react_1.default.createElement("p", null,
                            "To learn more about how we determine genetic ancestry groups please see our",
                            ' ',
                            react_1.default.createElement(Link_1.default, { to: "help/ancestry" }, "help page"),
                            " and",
                            ' ',
                            react_1.default.createElement(ui_1.ExternalLink, { href: "https://gnomad.broadinstitute.org/news/2023-11-genetic-ancestry" }, "blog post"),
                            ' ',
                            "on genetic ancestry."))),
                react_1.default.createElement(ResponsiveTable, { style: { marginBottom: '3em' } },
                    react_1.default.createElement(GeneticAncestryGroupsByVersionTable_1.default, null)),
                react_1.default.createElement(DiversityBarGraphContainer, { style: { marginBottom: '0.5em', width: '100%' } },
                    react_1.default.createElement(DiversityBarGraph, { style: { marginTop: '1em', marginBottom: '1em' } },
                        react_1.default.createElement(StackedBarGraph_1.default, { title: "Per genetic ancestry group count of samples in gnomAD releases", barColors: gnomadV4GeneticAncestryCounts_json_1.default.colors, barValues: gnomadV4GeneticAncestryCounts_json_1.default.data, height: 400, formatTooltip: DiversityBarGraphTooltip, xLabel: "", yLabel: "Number of samples", displayNumbers: false }))),
                react_1.default.createElement(DiversityBarGraphContainer, { style: { marginBottom: '6em' } },
                    react_1.default.createElement(DiversityBarGraph, { style: { marginTop: '1em', marginBottom: '0' } },
                        react_1.default.createElement(StackedBarGraph_1.default, { title: "Per genetic ancestry group count of non-synonymous coding variants in canonical transcripts with a overall gnomAD (within version) AF >0.1", barColors: gnomadV4GeneticDiversityCounts_json_1.default.colors, barValues: gnomadV4GeneticDiversityCounts_json_1.default.data, height: 400, formatTooltip: DiversityBarGraphTooltip, xLabel: "", yLabel: "Number of samples", displayNumbers: false }))),
                react_1.default.createElement("h3", { style: { marginBottom: '2em' } }, "Inferred sex in gnomAD v4 per genetic ancestry group"),
                react_1.default.createElement("h4", { style: { marginBottom: '2em' } }, "gnomAD v4"),
                react_1.default.createElement(ResponsiveTable, { style: { marginBottom: '6em' } },
                    react_1.default.createElement(InferredSexPerGeneticAncestryTables_1.InferredSexAllV4Table, null)),
                react_1.default.createElement("h4", { style: { marginBottom: '2em' } }, "gnomAD v4 non-UKB"),
                react_1.default.createElement(ResponsiveTable, { style: { marginBottom: '3em' } },
                    react_1.default.createElement(InferredSexPerGeneticAncestryTables_1.InferredSexNonUKBV4Table, null))),
            react_1.default.createElement(StatsSection, null,
                react_1.default.createElement(HelpPage_1.SectionHeading, { id: "study-provided-labels" }, "Study-provided labels and genetic ancestry groups"),
                react_1.default.createElement("p", null,
                    "The following table is provided in order to present how our inferred genetic ancestry groups correspond to descriptors provided by each contributing",
                    react_1.default.createElement(Link_1.default, { to: "/about" }, " study"),
                    ". The table below lists the total number of individuals in each genetic ancestry group and the percentage of samples per group with each study-provided descriptor.",
                    ' '),
                react_1.default.createElement("p", null, "It is of note that imputed ancestry groups are genetically derived, while the study-provided labels are either self-reported or researcher assigned. As such, these values have no equivalency."),
                react_1.default.createElement(ResponsiveTable, null,
                    react_1.default.createElement(V4GeneticAncestryTable_1.default, null))),
            react_1.default.createElement(StatsSection, null,
                react_1.default.createElement(HelpPage_1.SectionHeading, { id: "study-diseases" }, "Study Diseases in gnomAD"),
                react_1.default.createElement("p", { style: { marginBottom: '2em' } },
                    "During the sample aggregation phase of v4 we began collecting study-disease of interest and case/control status at the individual level. This enabled us to provide a better sense of the phenotype breakdown in gnomAD (see table below). While we are provided high level study phenotype and case/control status for some exome samples,",
                    ' ',
                    react_1.default.createElement("b", null, "we do not have comprehensive phenotype metadata for gnomAD samples"),
                    " and many samples are now derived from large biobanks which can include individuals with disease.",
                    ' '),
                react_1.default.createElement(ResponsiveTable, { style: { marginBottom: '3em' } },
                    react_1.default.createElement(StudyDiseasesInGnomadTable_1.default, null))),
            react_1.default.createElement(StatsSection, null,
                react_1.default.createElement(HelpPage_1.SectionHeading, { id: "browser" }, "gnomAD Browser Stats"),
                react_1.default.createElement("p", null, `The gnomAD browser averages ~200,000 page views per week and had >377,000 unique users in the last year`),
                react_1.default.createElement(TwoColumnLayout, null,
                    react_1.default.createElement(ResponsiveHalfWidthColumn, null,
                        react_1.default.createElement("img", { alt: "Browser weekly pageviews", src: browser_pageviews_png_1.default, width: "100%" })),
                    react_1.default.createElement(ResponsiveHalfWidthColumn, null,
                        react_1.default.createElement("img", { alt: "Browser users location", src: browser_world_png_1.default, width: "100%" })))))));
};
exports.default = StatsPage;
//# sourceMappingURL=StatsPage.js.map