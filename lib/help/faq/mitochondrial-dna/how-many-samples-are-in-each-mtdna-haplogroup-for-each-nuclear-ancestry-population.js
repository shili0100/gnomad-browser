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
exports.renderAnswer = exports.question = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const mtdnaHaplogroupPerNuclearAncestryPopulationData_1 = __importStar(require("./mtdnaHaplogroupPerNuclearAncestryPopulationData"));
const HaplogroupAndAncestryBaseTable = (0, styled_components_1.default)(ui_1.BaseTable) `
  margin-top: 1em;
  margin-bottom: 1em;

  td {
    text-align: right;
  }
`;
const HaplogroupOrAncestrySelector = (0, styled_components_1.default)(ui_1.Select) `
  margin: 1em 1em 0 0;
`;
const HaplogroupAndAncestryFilterTable = () => {
    const [haplogroupSelected, setHaplogroupSelected] = (0, react_1.useState)('All');
    const [ancestrySelected, setAncestrySelected] = (0, react_1.useState)('All');
    const [filteredData, setFilteredData] = (0, react_1.useState)([]);
    const ancestryOptions = [
        'African/African American',
        'Amish',
        'Latino/Admixed American',
        'Ashkenazi Jewish',
        'East Asian',
        'European (Finnish)',
        'Middle Eastern',
        'European (non-Finnish)',
        'South Asian',
        'Other',
    ];
    (0, react_1.useEffect)(() => {
        const newFilteredData = mtdnaHaplogroupPerNuclearAncestryPopulationData_1.default.filter((row) => {
            return ((row.haplogroup === haplogroupSelected || haplogroupSelected === 'All') &&
                (mtdnaHaplogroupPerNuclearAncestryPopulationData_1.codeToAncestryName[row.ancestry] === ancestrySelected || ancestrySelected === 'All'));
        });
        setFilteredData(newFilteredData);
    }, [haplogroupSelected, ancestrySelected]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(HaplogroupOrAncestrySelector, { id: "haplogroup-selected", value: haplogroupSelected, onChange: (e) => {
                setHaplogroupSelected(e.target.value);
            } },
            react_1.default.createElement("optgroup", { label: "Haplogroup" },
                react_1.default.createElement("option", { value: "All", key: "All" }, "All Haplogroups"),
                mtdnaHaplogroupPerNuclearAncestryPopulationData_1.haplogroups.map((haplogroup) => (react_1.default.createElement("option", { value: haplogroup, key: haplogroup }, haplogroup))))),
        react_1.default.createElement(HaplogroupOrAncestrySelector, { id: "ancestry-selected", value: ancestrySelected, onChange: (e) => {
                setAncestrySelected(e.target.value);
            } },
            react_1.default.createElement("optgroup", { label: "Ancestry" },
                react_1.default.createElement("option", { value: "All", key: "All" }, "All Ancestries"),
                ancestryOptions.map((ancestry) => (react_1.default.createElement("option", { value: ancestry, key: ancestry }, ancestry))))),
        react_1.default.createElement(HaplogroupAndAncestryBaseTable, null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "col" }, "Haplogroup"),
                    react_1.default.createElement("th", { scope: "col" }, "Population"),
                    react_1.default.createElement("th", { scope: "col" }, "Number of Samples"))),
            react_1.default.createElement("tbody", null, filteredData.map((row) => {
                return (react_1.default.createElement("tr", { key: row.haplogroup + row.ancestry },
                    react_1.default.createElement("th", { scope: "row" }, row.haplogroup),
                    react_1.default.createElement("th", null, mtdnaHaplogroupPerNuclearAncestryPopulationData_1.codeToAncestryName[row.ancestry]),
                    react_1.default.createElement("td", null, row.n)));
            })),
            react_1.default.createElement("tfoot", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        "Haplogroup: ",
                        haplogroupSelected),
                    react_1.default.createElement("th", null,
                        "Ancestry: ",
                        ancestrySelected),
                    react_1.default.createElement("td", null,
                        "Samples:",
                        ' ',
                        filteredData.reduce((acc, row) => {
                            return acc + row.n;
                        }, 0)))))));
};
exports.question = 'How many samples are in each mtDNA haplogroup, for each nuclear ancestry population?';
const renderAnswer = () => react_1.default.createElement(HaplogroupAndAncestryFilterTable, null);
exports.renderAnswer = renderAnswer;
//# sourceMappingURL=how-many-samples-are-in-each-mtdna-haplogroup-for-each-nuclear-ancestry-population.js.map