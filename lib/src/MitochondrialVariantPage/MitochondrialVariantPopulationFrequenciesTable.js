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
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const CountCell = styled_components_1.default.span `
  display: inline-block;
  width: 7ch;
  margin: auto;
  text-align: right;
`;
const Table = (0, styled_components_1.default)(ui_1.BaseTable) `
  width: 100%;
  margin-bottom: 1em;

  tr.border {
    td,
    th {
      border-top: 2px solid #aaa;
    }
  }

  tfoot ${CountCell} {
    /* Adjust alignment to make up for bold text in footer */
    padding-right: 0.5ch;
  }
`;
const useSort = (defaultSortKey) => {
    const [key, setKey] = (0, react_1.useState)(defaultSortKey);
    const [ascending, setAscending] = (0, react_1.useState)(false);
    const setSortKey = (0, react_1.useCallback)((newKey) => {
        setKey(newKey);
        setAscending(newKey === key ? !ascending : false);
    }, [key, ascending]);
    return [{ key, ascending }, setSortKey];
};
const MitochondrialVariantPopulationFrequenciesTable = ({ variant, }) => {
    const [{ key: sortBy, ascending: sortAscending }, setSortBy] = useSort('af_hom');
    const renderColumnHeader = (key, label, tooltip) => {
        let ariaSortAttr = 'none';
        if (sortBy === key) {
            ariaSortAttr = sortAscending ? 'ascending' : 'descending';
        }
        return tooltip ? (react_1.default.createElement("th", { "aria-sort": ariaSortAttr, scope: "col" },
            react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: tooltip },
                react_1.default.createElement("button", { type: "button", onClick: () => setSortBy(key) },
                    react_1.default.createElement(ui_1.TooltipHint, null, label))))) : (react_1.default.createElement("th", { "aria-sort": ariaSortAttr, scope: "col" },
            react_1.default.createElement("button", { type: "button", onClick: () => setSortBy(key) }, label)));
    };
    const renderedPopulations = variant.populations
        .map((population) => (Object.assign(Object.assign({}, population), { af_hom: population.an !== 0 ? population.ac_hom / population.an : 0, af_het: population.an !== 0 ? population.ac_het / population.an : 0 })))
        .sort((a, b) => {
        const [population1, population2] = sortAscending ? [a, b] : [b, a];
        return sortBy === 'id'
            ? population1.id.localeCompare(population2.id)
            : population1[sortBy] - population2[sortBy];
    });
    const totalAlleleNumber = renderedPopulations
        .map((population) => population.an)
        .reduce((acc, n) => acc + n, 0);
    const totalHomoplasmicAlleleCount = renderedPopulations
        .map((population) => population.ac_hom)
        .reduce((acc, n) => acc + n, 0);
    const totalHomoplasmicAlleleFrequency = totalAlleleNumber !== 0 ? totalHomoplasmicAlleleCount / totalAlleleNumber : 0;
    const totalHeteroplasmicAlleleCount = renderedPopulations
        .map((population) => population.ac_het)
        .reduce((acc, n) => acc + n, 0);
    const totalHeteroplasmicAlleleFrequency = totalAlleleNumber !== 0 ? totalHeteroplasmicAlleleCount / totalAlleleNumber : 0;
    return (react_1.default.createElement(Table, null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                renderColumnHeader('id', 'Genetic Ancestry Group', null),
                renderColumnHeader('an', 'Allele Number', 'Total number of individuals in this population with high quality sequence at this position.'),
                renderColumnHeader('ac_hom', 'Homoplasmic AC', 'Number of individuals in this population with homoplasmic or near-homoplasmic variant (heteroplasmy level ≥ 0.95).'),
                renderColumnHeader('af_hom', 'Homoplasmic AF', 'Proportion of individuals in this population with homoplasmic or near-homoplasmic variant (heteroplasmy level ≥ 0.95).'),
                renderColumnHeader('ac_het', 'Heteroplasmic AC', 'Number of individuals in this population with a variant at heteroplasmy level 0.10 - 0.95.'),
                renderColumnHeader('af_het', 'Heteroplasmic AF', 'Proportion of individuals in this population with a variant at heteroplasmy level 0.10 - 0.95.'))),
        react_1.default.createElement("tbody", null, renderedPopulations.map((population) => (react_1.default.createElement("tr", { key: population.id },
            react_1.default.createElement("th", { scope: "row" }, gnomadPopulations_1.GNOMAD_POPULATION_NAMES[population.id]),
            react_1.default.createElement("td", null,
                react_1.default.createElement(CountCell, null, population.an)),
            react_1.default.createElement("td", null,
                react_1.default.createElement(CountCell, null, population.ac_hom)),
            react_1.default.createElement("td", null, population.af_hom.toPrecision(4)),
            react_1.default.createElement("td", null,
                react_1.default.createElement(CountCell, null, population.ac_het)),
            react_1.default.createElement("td", null, population.af_het.toPrecision(4)))))),
        react_1.default.createElement("tfoot", null,
            react_1.default.createElement("tr", { className: "border" },
                react_1.default.createElement("th", { scope: "row" }, "Total"),
                react_1.default.createElement("td", null,
                    react_1.default.createElement(CountCell, null, totalAlleleNumber)),
                react_1.default.createElement("td", null,
                    react_1.default.createElement(CountCell, null, totalHomoplasmicAlleleCount)),
                react_1.default.createElement("td", null, totalHomoplasmicAlleleFrequency.toPrecision(4)),
                react_1.default.createElement("td", null,
                    react_1.default.createElement(CountCell, null, totalHeteroplasmicAlleleCount)),
                react_1.default.createElement("td", null, totalHeteroplasmicAlleleFrequency.toPrecision(4))))));
};
exports.default = MitochondrialVariantPopulationFrequenciesTable;
//# sourceMappingURL=MitochondrialVariantPopulationFrequenciesTable.js.map