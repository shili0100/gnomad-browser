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
class MitochondrialVariantHaplogroupFrequenciesTable extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            showAC0Haplogroups: false,
            sortBy: 'af_hom',
            sortAscending: false,
        };
    }
    setSortBy(sortBy) {
        this.setState((state) => ({
            sortBy,
            sortAscending: sortBy === state.sortBy ? !state.sortAscending : false,
        }));
    }
    renderColumnHeader(key, label, tooltip) {
        const { sortAscending, sortBy } = this.state;
        let ariaSortAttr = 'none';
        if (sortBy === key) {
            ariaSortAttr = sortAscending ? 'ascending' : 'descending';
        }
        return tooltip ? (react_1.default.createElement("th", { "aria-sort": ariaSortAttr, scope: "col" },
            react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: tooltip },
                react_1.default.createElement("button", { type: "button", onClick: () => this.setSortBy(key) },
                    react_1.default.createElement(ui_1.TooltipHint, null, label))))) : (react_1.default.createElement("th", { "aria-sort": ariaSortAttr, scope: "col" },
            react_1.default.createElement("button", { type: "button", onClick: () => this.setSortBy(key) }, label)));
    }
    render() {
        const { variant } = this.props;
        const { showAC0Haplogroups, sortAscending, sortBy } = this.state;
        const renderedHaplogroups = (showAC0Haplogroups
            ? variant.haplogroups
            : variant.haplogroups.filter((haplogroup) => haplogroup.ac_hom + haplogroup.ac_het > 0))
            .map((haplogroup) => (Object.assign(Object.assign({}, haplogroup), { af_hom: haplogroup.an !== 0 ? haplogroup.ac_hom / haplogroup.an : 0, af_het: haplogroup.an !== 0 ? haplogroup.ac_het / haplogroup.an : 0 })))
            .sort((a, b) => {
            const [haplogroup1, haplogroup2] = sortAscending ? [a, b] : [b, a];
            return sortBy === 'id'
                ? haplogroup1.id.localeCompare(haplogroup2.id)
                : haplogroup1[sortBy] - haplogroup2[sortBy];
        });
        const totalAlleleNumber = renderedHaplogroups
            .map((haplogroup) => haplogroup.an)
            .reduce((acc, n) => acc + n, 0);
        const totalHomoplasmicAlleleCount = renderedHaplogroups
            .map((haplogroup) => haplogroup.ac_hom)
            .reduce((acc, n) => acc + n, 0);
        const totalHomoplasmicAlleleFrequency = totalAlleleNumber !== 0 ? totalHomoplasmicAlleleCount / totalAlleleNumber : 0;
        const totalHeteroplasmicAlleleCount = renderedHaplogroups
            .map((haplogroup) => haplogroup.ac_het)
            .reduce((acc, n) => acc + n, 0);
        const totalHeteroplasmicAlleleFrequency = totalAlleleNumber !== 0 ? totalHeteroplasmicAlleleCount / totalAlleleNumber : 0;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Table, null,
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        this.renderColumnHeader('id', 'Haplogroup', null),
                        this.renderColumnHeader('an', 'Allele Number', 'Total number of individuals in this haplogroup with high quality sequence at this position.'),
                        this.renderColumnHeader('ac_hom', 'Homoplasmic AC', 'Number of individuals in this haplogroup with homoplasmic or near-homoplasmic variant (heteroplasmy level ≥ 0.95).'),
                        this.renderColumnHeader('af_hom', 'Homoplasmic AF', 'Proportion of individuals in this haplogroup with homoplasmic or near-homoplasmic variant (heteroplasmy level ≥ 0.95).'),
                        this.renderColumnHeader('ac_het', 'Heteroplasmic AC', 'Number of individuals in this haplogroup with a variant at heteroplasmy level 0.10 - 0.95.'),
                        this.renderColumnHeader('af_het', 'Heteroplasmic AF', 'Proportion of individuals in this haplogroup with a variant at heteroplasmy level 0.10 - 0.95.'))),
                react_1.default.createElement("tbody", null, renderedHaplogroups.map((haplogroup) => (react_1.default.createElement("tr", { key: haplogroup.id },
                    react_1.default.createElement("th", { scope: "row" }, haplogroup.id),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(CountCell, null, haplogroup.an)),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(CountCell, null, haplogroup.ac_hom)),
                    react_1.default.createElement("td", null, haplogroup.af_hom.toPrecision(4)),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(CountCell, null, haplogroup.ac_het)),
                    react_1.default.createElement("td", null, haplogroup.af_het.toPrecision(4)))))),
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
                        react_1.default.createElement("td", null, totalHeteroplasmicAlleleFrequency.toPrecision(4))))),
            react_1.default.createElement(ui_1.Checkbox, { id: "haplogroups-toggle-ac0", label: "Include haplogroups with allele count of 0", checked: showAC0Haplogroups, onChange: (isChecked) => {
                    this.setState({ showAC0Haplogroups: isChecked });
                } })));
    }
}
exports.default = MitochondrialVariantHaplogroupFrequenciesTable;
//# sourceMappingURL=MitochondrialVariantHaplogroupFrequenciesTable.js.map