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
exports.PopulationsTable = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const analytics_1 = require("../analytics");
const Table = (0, styled_components_1.default)(ui_1.BaseTable) `
  min-width: 100%;

  tr.border {
    td,
    th {
      border-top: 2px solid #aaa;
    }
  }

  th.right-align,
  td.right-align {
    padding-right: 25px;
    text-align: right;
  }
`;
const TogglePopulationButton = (0, styled_components_1.default)(ui_1.TextButton) `
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${(props) => (props.isExpanded ? '15px' : '10px')};
  background-image: ${(props) => props.isExpanded
    ? 'url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7)'
    : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAVCAYAAABhe09AAAAATElEQVQoU2NkQAOM9BFQ1jXYf/fyBUeYbYzKugb/GRgYDsAEYQIgBWBBZAGwIIoA438GhAoQ586VCxAVMA5ID6OKjoEDSAZuLV18CwAQVSMV/9L8fgAAAABJRU5ErkJggg==)'};
  background-position: center left ${(props) => (props.isExpanded ? '-5px' : '0')};
  background-repeat: no-repeat;
  color: inherit;
  text-align: left;
`;
const SEX_IDENTIFIERS = ['XX', 'XY'];
const isSexSpecificPopulation = (pop) => SEX_IDENTIFIERS.includes(pop.id) || SEX_IDENTIFIERS.some((id) => pop.id.endsWith(`_${id}`));
// if the allele number (denominator) is 0, return a non-number
//   to signal to users that there is no information to be displayed about
//   the frequency, rather than artificially calling it 0
const calculatePopAF = (ac, an) => {
    if (an === 0) {
        return '-';
    }
    return ac / an;
};
const renderPopAF = (af) => {
    if (typeof af === 'number') {
        return af.toPrecision(4);
    }
    return af;
};
class PopulationsTable extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'af',
            sortAscending: false,
            expandedPopulations: props.populations.reduce((acc, pop) => (Object.assign(Object.assign({}, acc), { [pop.name]: props.initiallyExpandRows })), {}),
        };
    }
    setSortBy(sortBy) {
        this.setState((state) => ({
            sortBy,
            sortAscending: sortBy === state.sortBy ? !state.sortAscending : state.sortAscending,
        }));
    }
    togglePopulationExpanded(populationName) {
        this.setState((state) => (Object.assign(Object.assign({}, state), { expandedPopulations: Object.assign(Object.assign({}, state.expandedPopulations), { [populationName]: !state.expandedPopulations[populationName] }) })));
    }
    renderColumnHeader({ key, label, tooltip = null, props = {} }) {
        const { sortAscending, sortBy } = this.state;
        let ariaSortAttr = 'none';
        if (sortBy === key) {
            ariaSortAttr = sortAscending ? 'ascending' : 'descending';
        }
        return (react_1.default.createElement("th", Object.assign({}, props, { "aria-sort": ariaSortAttr, scope: "col" }),
            react_1.default.createElement("button", { type: "button", onClick: () => this.setSortBy(key) }, tooltip ? (
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: any; }' is not... Remove this comment to see the full error message
            react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: tooltip },
                react_1.default.createElement(ui_1.TooltipHint, null, label))) : (label))));
    }
    renderPopulationRowHeader(pop) {
        const { expandedPopulations } = this.state;
        const isExpanded = expandedPopulations[pop.name];
        const colSpan = isExpanded ? 1 : 2;
        const rowSpan = isExpanded ? pop.subpopulations.length + 1 : 1;
        return (react_1.default.createElement("th", { colSpan: colSpan, rowSpan: rowSpan, scope: "row" }, pop.subpopulations.length > 0 ? (react_1.default.createElement(TogglePopulationButton
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        , { 
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            isExpanded: isExpanded, onClick: () => {
                (0, analytics_1.logButtonClick)(`User toggled ${pop.name} in variant page frequency table`);
                this.togglePopulationExpanded(pop.name);
            } }, pop.name)) : (pop.name)));
    }
    render() {
        // Hack to support alternate column labels for MCNV structural variants
        const { columnLabels, populations } = this.props;
        const { expandedPopulations, sortAscending, sortBy } = this.state;
        const renderedPopulations = populations
            .map((pop) => (Object.assign(Object.assign({}, pop), { af: calculatePopAF(pop.ac, pop.an), subpopulations: (pop.subpopulations || [])
                .map((subPop) => (Object.assign(Object.assign({}, subPop), { af: calculatePopAF(subPop.ac, subPop.an) })))
                .sort((a, b) => {
                // Sort XX/XY subpopulations to bottom of list
                if (isSexSpecificPopulation(a) && !isSexSpecificPopulation(b)) {
                    return 1;
                }
                if (isSexSpecificPopulation(b) && !isSexSpecificPopulation(a)) {
                    return -1;
                }
                const [subPop1, subPop2] = sortAscending ? [a, b] : [b, a];
                return sortBy === 'name'
                    ? subPop1.name.localeCompare(subPop2.name)
                    : // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        subPop1[sortBy] - subPop2[sortBy];
            }) })))
            .sort((a, b) => {
            // Sort XX/XY populations to bottom of list
            if (isSexSpecificPopulation(a) && !isSexSpecificPopulation(b)) {
                return 1;
            }
            if (isSexSpecificPopulation(b) && !isSexSpecificPopulation(a)) {
                return -1;
            }
            // Always sort xx/xy populations by name
            if (isSexSpecificPopulation(b) && isSexSpecificPopulation(a)) {
                return a.name.localeCompare(b.name);
            }
            const [pop1, pop2] = sortAscending ? [a, b] : [b, a];
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            return sortBy === 'name' ? pop1.name.localeCompare(pop2.name) : pop1[sortBy] - pop2[sortBy];
        });
        // XX/XY numbers are included in the ancestry populations.
        const totalAlleleCount = renderedPopulations
            .filter((pop) => !isSexSpecificPopulation(pop))
            .map((pop) => pop.ac)
            .reduce((acc, n) => acc + n, 0);
        const totalAlleleNumber = renderedPopulations
            .filter((pop) => !isSexSpecificPopulation(pop))
            .map((pop) => pop.an)
            .reduce((acc, n) => acc + n, 0);
        const totalAlleleFrequency = totalAlleleNumber !== 0 ? totalAlleleCount / totalAlleleNumber : 0;
        const totalHemizygotes = renderedPopulations
            .filter((pop) => !isSexSpecificPopulation(pop))
            .map((pop) => pop.ac_hemi)
            // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
            .reduce((acc, n) => acc + n, 0);
        const totalHomozygotes = renderedPopulations
            .filter((pop) => !isSexSpecificPopulation(pop))
            .map((pop) => pop.ac_hom)
            // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
            .reduce((acc, n) => acc + n, 0);
        const { showHemizygotes, showHomozygotes } = this.props;
        return (react_1.default.createElement(Table, null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    this.renderColumnHeader({
                        key: 'name',
                        label: 'Genetic Ancestry Group',
                        props: { colSpan: 2 },
                    }),
                    this.renderColumnHeader({
                        key: 'ac',
                        label: columnLabels.ac || 'Allele Count',
                        tooltip: 'Alternate allele count in high quality genotypes',
                        props: {
                            className: 'right-align',
                        },
                    }),
                    this.renderColumnHeader({
                        key: 'an',
                        label: columnLabels.an || 'Allele Number',
                        tooltip: 'Total number of called high quality genotypes',
                        props: {
                            className: 'right-align',
                        },
                    }),
                    showHomozygotes &&
                        this.renderColumnHeader({
                            key: 'ac_hom',
                            label: 'Number of Homozygotes',
                            tooltip: 'Number of individuals homozygous for alternate allele',
                            props: {
                                className: 'right-align',
                            },
                        }),
                    showHemizygotes &&
                        this.renderColumnHeader({
                            key: 'ac_hemi',
                            label: 'Number of Hemizygotes',
                            tooltip: 'Number of individuals hemizygous for alternate allele',
                            props: {
                                className: 'right-align',
                            },
                        }),
                    this.renderColumnHeader({
                        key: 'af',
                        label: columnLabels.af || 'Allele Frequency',
                        tooltip: 'Alternate allele frequency in high quality genotypes',
                        props: {
                            style: { paddingLeft: '25px' },
                        },
                    }))),
            renderedPopulations.map((pop, i) => (react_1.default.createElement("tbody", { key: pop.id },
                react_1.default.createElement("tr", { className: i > 0 &&
                        isSexSpecificPopulation(pop) &&
                        !isSexSpecificPopulation(renderedPopulations[i - 1])
                        ? 'border'
                        : undefined },
                    this.renderPopulationRowHeader(pop),
                    expandedPopulations[pop.name] && react_1.default.createElement("td", null, "Overall"),
                    react_1.default.createElement("td", { className: "right-align" }, pop.ac),
                    react_1.default.createElement("td", { className: "right-align" }, pop.an),
                    showHomozygotes && react_1.default.createElement("td", { className: "right-align" }, pop.ac_hom),
                    showHemizygotes && react_1.default.createElement("td", { className: "right-align" }, pop.ac_hemi),
                    react_1.default.createElement("td", { style: { paddingLeft: '25px' } }, renderPopAF(pop.af))),
                pop.subpopulations &&
                    expandedPopulations[pop.name] &&
                    pop.subpopulations.map((subPop, j) => (react_1.default.createElement("tr", { key: `${pop.name}-${subPop.name}`, className: j === 0 ||
                            (isSexSpecificPopulation(subPop) &&
                                !isSexSpecificPopulation(pop.subpopulations[j - 1]))
                            ? 'border'
                            : undefined },
                        react_1.default.createElement("td", null, subPop.name),
                        react_1.default.createElement("td", { className: "right-align" }, subPop.ac),
                        react_1.default.createElement("td", { className: "right-align" }, subPop.an),
                        showHomozygotes && react_1.default.createElement("td", { className: "right-align" }, subPop.ac_hom),
                        showHemizygotes && (react_1.default.createElement("td", { className: "right-align" }, subPop.ac_hemi !== null ? subPop.ac_hemi : '—')),
                        react_1.default.createElement("td", { style: { paddingLeft: '25px' } }, renderPopAF(subPop.af)))))))),
            react_1.default.createElement("tfoot", null,
                react_1.default.createElement("tr", { className: "border" },
                    react_1.default.createElement("th", { colSpan: 2, scope: "row" }, "Total"),
                    react_1.default.createElement("td", { className: "right-align" }, totalAlleleCount),
                    react_1.default.createElement("td", { className: "right-align" }, totalAlleleNumber),
                    showHomozygotes && react_1.default.createElement("td", { className: "right-align" }, totalHomozygotes),
                    showHemizygotes && react_1.default.createElement("td", { className: "right-align" }, totalHemizygotes),
                    react_1.default.createElement("td", { style: { paddingLeft: '25px' } }, totalAlleleFrequency.toPrecision(4))))));
    }
}
exports.PopulationsTable = PopulationsTable;
PopulationsTable.defaultProps = {
    columnLabels: {},
    showHemizygotes: true,
    showHomozygotes: true,
    initiallyExpandRows: false,
};
//# sourceMappingURL=PopulationsTable.js.map