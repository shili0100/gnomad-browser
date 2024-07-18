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
exports.GnomadPopulationsTable = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const metadata_1 = require("../../dataset-metadata/metadata");
const PopulationsTable_1 = require("./PopulationsTable");
const mergeExomeAndGenomeData_1 = require("../VariantList/mergeExomeAndGenomeData");
const ControlSection = styled_components_1.default.div `
  margin-top: 1em;

  label {
    margin-left: 1em;
  }
`;
const addPopulationNames = (populations) => {
    return populations.map((pop) => {
        let name;
        if (pop.id === 'XX' || pop.id.endsWith('_XX')) {
            name = 'XX';
        }
        else if (pop.id === 'XY' || pop.id.endsWith('_XY')) {
            name = 'XY';
        }
        else {
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            name = gnomadPopulations_1.GNOMAD_POPULATION_NAMES[pop.id.toLowerCase()] || pop.id;
        }
        return Object.assign(Object.assign({}, pop), { name });
    });
};
const nestPopulations = (populations) => {
    const popIndices = [];
    const subpopulations = {};
    for (let i = 0; i < populations.length; i += 1) {
        const pop = populations[i];
        // IDs are one of:
        // * pop
        // * pop_subpop
        // * pop_sex
        // * sex
        const divisions = pop.id.split('_');
        if (divisions.length === 1) {
            popIndices.push(i);
        }
        else {
            const parentPop = divisions[0];
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (subpopulations[parentPop] === undefined) {
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                subpopulations[parentPop] = [Object.assign({}, pop)];
            }
            else {
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                subpopulations[parentPop].push(Object.assign({}, pop));
            }
        }
    }
    return popIndices.map((index) => {
        const pop = populations[index];
        return Object.assign(Object.assign({}, pop), { 
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            subpopulations: subpopulations[pop.id] });
    });
};
class GnomadPopulationsTable extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            includeExomes: props.exomePopulations.length !== 0,
            includeGenomes: props.genomePopulations.length !== 0,
        };
    }
    render() {
        const { datasetId, exomePopulations, genomePopulations, jointPopulations, showHemizygotes, showHomozygotes, } = this.props;
        const { includeExomes, includeGenomes } = this.state;
        const mergedPopulations = (0, mergeExomeAndGenomeData_1.mergeExomeGenomeAndJointPopulationData)({
            datasetId,
            exomePopulations: includeExomes ? exomePopulations : [],
            genomePopulations: includeGenomes ? genomePopulations : [],
            jointPopulations: 
            // if theres joint data, but no variant present in genomes, still use joint
            (includeExomes || exomePopulations.length === 0) &&
                // if theres joint data, but no variant present in exomes, still use joint
                (includeGenomes || genomePopulations.length === 0) &&
                jointPopulations
                ? jointPopulations
                : null,
        }).filter((mergedAncestry) => mergedAncestry.id !== '');
        const mergedPopulationsWithNames = addPopulationNames(mergedPopulations);
        const mergedNestedPopulationsWithNames = nestPopulations(mergedPopulationsWithNames);
        let populations = mergedNestedPopulationsWithNames;
        if ((0, metadata_1.hasV2Genome)(datasetId) && includeGenomes) {
            populations = populations.map((pop) => {
                if (pop.id === 'eas') {
                    // If the variant is only present in genomes, sub-continental populations won't be present at all.
                    if (pop.subpopulations.length === 2) {
                        ;
                        ['jpn', 'kor', 'oea'].forEach((subPopId) => {
                            pop.subpopulations.push({
                                id: `eas_${subPopId}`,
                                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                name: gnomadPopulations_1.GNOMAD_POPULATION_NAMES[`eas_${subPopId}`],
                                ac: 0,
                                an: 0,
                                ac_hemi: 0,
                                ac_hom: 0,
                            });
                        });
                    }
                    pop.subpopulations.forEach((subPop) => {
                        if (!(subPop.id.endsWith('XX') || subPop.id.endsWith('XY'))) {
                            subPop.name += ' *'; // eslint-disable-line no-param-reassign
                        }
                    });
                }
                return pop;
            });
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(PopulationsTable_1.PopulationsTable, { populations: populations, showHemizygotes: showHemizygotes, showHomozygotes: showHomozygotes }),
            (0, metadata_1.hasV2Genome)(datasetId) && includeGenomes && (react_1.default.createElement("p", null, "* Allele frequencies for some sub-continental populations were not computed for genome samples.")),
            showHemizygotes && react_1.default.createElement("p", null, "Hemizygote counts are not available for subpopulations."),
            react_1.default.createElement(ControlSection, null,
                "Include:",
                react_1.default.createElement(ui_1.Checkbox, { checked: includeExomes, disabled: exomePopulations.length === 0 || (includeExomes && !includeGenomes), id: "includeExomePopulations", label: "Exomes", onChange: (value) => {
                        this.setState({ includeExomes: value });
                    } }),
                react_1.default.createElement(ui_1.Checkbox, { checked: includeGenomes, disabled: genomePopulations.length === 0 || (!includeExomes && includeGenomes), id: "includeGenomePopulations", label: "Genomes", onChange: (value) => {
                        this.setState({ includeGenomes: value });
                    } }))));
    }
}
exports.GnomadPopulationsTable = GnomadPopulationsTable;
GnomadPopulationsTable.defaultProps = {
    showHemizygotes: true,
    showHomozygotes: true,
};
//# sourceMappingURL=GnomadPopulationsTable.js.map