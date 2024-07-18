"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const GnomadPageHeading_1 = __importDefault(require("../GnomadPageHeading"));
const Link_1 = __importDefault(require("../Link"));
const Query_1 = __importDefault(require("../Query"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const TableWrapper_1 = __importDefault(require("../TableWrapper"));
const ShortTandemRepeatsPage = ({ shortTandemRepeats }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("p", null,
            "For more information about Tandem Repeats in gnomAD, read our",
            ' ',
            react_1.default.createElement("a", { href: "https://gnomad.broadinstitute.org/news/2022-01-the-addition-of-short-tandem-repeat-calls-to-gnomad/" }, "blog post"),
            "."),
        react_1.default.createElement(TableWrapper_1.default, null,
            react_1.default.createElement(ui_1.BaseTable, { style: { minWidth: '100%' } },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", { scope: "col" }, "ID"),
                        react_1.default.createElement("th", { scope: "col" }, "Reference repeat unit"),
                        react_1.default.createElement("th", { scope: "col" }, "Region"),
                        react_1.default.createElement("th", { scope: "col" }, "Inheritance mode"),
                        react_1.default.createElement("th", { scope: "col" }, "Associated disease(s)"))),
                react_1.default.createElement("tbody", null, shortTandemRepeats.map((shortTandemRepeat) => {
                    return (react_1.default.createElement("tr", { key: shortTandemRepeat.id },
                        react_1.default.createElement("th", { scope: "row", style: { whiteSpace: 'nowrap' } },
                            react_1.default.createElement(Link_1.default, { to: `/short-tandem-repeat/${shortTandemRepeat.id}` }, shortTandemRepeat.id)),
                        react_1.default.createElement("td", { style: { minWidth: '18ch' } }, shortTandemRepeat.reference_repeat_unit),
                        react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, shortTandemRepeat.gene.region),
                        react_1.default.createElement("td", { style: { whiteSpace: 'nowrap' } }, Array.from(new Set(shortTandemRepeat.associated_diseases.map((disease) => disease.inheritance_mode))).join(', ')),
                        react_1.default.createElement("td", { style: { minWidth: '30ch' } }, shortTandemRepeat.associated_diseases
                            .map((disease) => {
                            return (react_1.default.createElement(react_1.default.Fragment, { key: disease.name }, disease.omim_id ? (
                            // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
                            react_1.default.createElement(ui_1.ExternalLink, { href: `https://omim.org/entry/${disease.omim_id}` }, disease.name)) : (disease.name)));
                        })
                            .flatMap((el) => [', ', el])
                            .slice(1))));
                }))))));
};
const operationName = 'ShortTandemRepeats';
const query = `
query ${operationName}($datasetId: DatasetId!) {
  short_tandem_repeats(dataset: $datasetId) {
    id
    gene {
      ensembl_id
      symbol
      region
    }
    reference_repeat_unit
    associated_diseases {
      name
      symbol
      omim_id
      inheritance_mode
    }
  }
}
`;
const ShortTandemRepeatsPageContainer = ({ datasetId }) => {
    return (
    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.Page, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: `Tandem Repeats | ${(0, metadata_1.labelForDataset)(datasetId)}` }),
        react_1.default.createElement(GnomadPageHeading_1.default, { datasetOptions: {
                includeShortVariants: true,
                includeStructuralVariants: false,
                includeExac: false,
                includeGnomad2: false,
                includeGnomad3: true,
                includeGnomad3Subsets: false,
            }, selectedDataset: datasetId }, "Tandem Repeats"),
        (0, metadata_1.hasShortTandemRepeats)(datasetId) ? (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: { datasetId }, loadingMessage: "Loading tandem repeats", errorMessage: "Unable to load tandem repeats", success: (data) => data.short_tandem_repeats }, ({ data }) => {
            return (react_1.default.createElement(ShortTandemRepeatsPage
            // @ts-expect-error TS(2322) FIXME: Type '{ datasetId: string; shortTandemRepeats: any... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ datasetId: string; shortTandemRepeats: any... Remove this comment to see the full error message
                datasetId: datasetId, shortTandemRepeats: data.short_tandem_repeats }));
        })) : (react_1.default.createElement(StatusMessage_1.default, null,
            "Tandem repeats are not available in ",
            (0, metadata_1.labelForDataset)(datasetId),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Link_1.default, { to: "/short-tandem-repeats?dataset=gnomad_r3", preserveSelectedDataset: false }, "View tandem repeats in gnomAD v3.1")))));
};
exports.default = ShortTandemRepeatsPageContainer;
//# sourceMappingURL=ShortTandemRepeatsPage.js.map