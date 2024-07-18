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
exports.CNVPopulationsTable = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
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
const calculatePopSF = (sc, sn) => {
    if (sn === 0) {
        return '-';
    }
    return sc / sn;
};
const renderPopSF = (sf) => {
    if (typeof sf === 'number') {
        return sf.toPrecision(4);
    }
    return sf;
};
class CNVPopulationsTable extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'sf',
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
            isExpanded: isExpanded, onClick: () => this.togglePopulationExpanded(pop.name) }, pop.name)) : (pop.name)));
    }
    render() {
        const { columnLabels, populations, variant } = this.props;
        const { expandedPopulations, sortAscending, sortBy } = this.state;
        const renderedPopulations = populations
            .map((pop) => {
            const transformedSubpopulations = (pop.subpopulations || [])
                .map((subPop) => ({
                id: subPop.id,
                name: subPop.name,
                sc: subPop.sc,
                sn: subPop.sn,
                sf: calculatePopSF(subPop.sc, subPop.sn),
            }))
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
                    : // @ts-expect-error TS(7053) FIXME: Element implicitly has sn 'any' type because expre... Remove this comment to see the full error message
                        subPop1[sortBy] - subPop2[sortBy];
            });
            return {
                id: pop.id,
                name: pop.name,
                sc: pop.sc,
                sn: pop.sn,
                sf: calculatePopSF(pop.sc, pop.sn),
                subpopulations: transformedSubpopulations,
            };
        })
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
            // @ts-expect-error TS(7053) FIXME: Element implicitly has sn 'any' type because expre... Remove this comment to see the full error message
            return sortBy === 'name' ? pop1.name.localeCompare(pop2.name) : pop1[sortBy] - pop2[sortBy];
        });
        // XX/XY numbers are included in the ancestry populations.
        const totalSC = variant.sc;
        const totalSN = variant.sn;
        const totalSF = totalSN !== 0 ? totalSC / totalSN : 0;
        return (react_1.default.createElement(Table, null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    this.renderColumnHeader({
                        key: 'name',
                        label: 'Genetic ancestry group',
                        props: { colSpan: 2 },
                    }),
                    this.renderColumnHeader({
                        key: 'sc',
                        label: columnLabels.sc || 'SC',
                        tooltip: 'Number of individuals that carry this variant',
                        props: {
                            className: 'right-align',
                        },
                    }),
                    this.renderColumnHeader({
                        key: 'sn',
                        label: columnLabels.sn || 'SN',
                        tooltip: 'Number of individuals that have a non-null genotype',
                        props: {
                            className: 'right-align',
                        },
                    }),
                    this.renderColumnHeader({
                        key: 'sf',
                        label: columnLabels.sf || 'SF',
                        tooltip: 'Proportion of individuals carrying this variant',
                        props: {
                            className: 'right-align',
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
                    react_1.default.createElement("td", { className: "right-align" }, pop.sc),
                    react_1.default.createElement("td", { className: "right-align" }, pop.sn),
                    react_1.default.createElement("td", { className: "right-align" }, renderPopSF(pop.sf))),
                pop.subpopulations &&
                    expandedPopulations[pop.name] &&
                    pop.subpopulations.map((subPop, j) => (react_1.default.createElement("tr", { key: `${pop.name}-${subPop.name}`, className: j === 0 ||
                            (isSexSpecificPopulation(subPop) &&
                                !isSexSpecificPopulation(pop.subpopulations[j - 1]))
                            ? 'border'
                            : undefined },
                        react_1.default.createElement("td", null, subPop.name),
                        react_1.default.createElement("td", { className: "right-align" }, subPop.sc),
                        react_1.default.createElement("td", { className: "right-align" }, subPop.sn),
                        react_1.default.createElement("td", { className: "right-align" }, renderPopSF(subPop.sf)))))))),
            react_1.default.createElement("tfoot", null,
                react_1.default.createElement("tr", { className: "border" },
                    react_1.default.createElement("th", { colSpan: 2, scope: "row" }, "Total"),
                    react_1.default.createElement("td", { className: "right-align" }, totalSC),
                    react_1.default.createElement("td", { className: "right-align" }, totalSN),
                    react_1.default.createElement("td", { className: "right-align" }, totalSF.toPrecision(4))))));
    }
}
exports.CNVPopulationsTable = CNVPopulationsTable;
CNVPopulationsTable.defaultProps = {
    columnLabels: {},
    initiallyExpandRows: false,
    variant: {}
};
//# sourceMappingURL=CNVPopulationsTable.js.map