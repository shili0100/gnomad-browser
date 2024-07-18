"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const Wrapper = styled_components_1.default.div `
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    label:first-child {
      margin-bottom: 1em;
    }
  }
`;
const ShortTandemRepeatPopulationOptions = ({ id, populationIds, selectedPopulationId, onSelectPopulationId, }) => {
    const selectedAncestralPopulation = selectedPopulationId === 'XX' || selectedPopulationId === 'XY'
        ? ''
        : selectedPopulationId.split('_')[0];
    let selectedSex = '';
    if (selectedPopulationId.endsWith('XX')) {
        selectedSex = 'XX';
    }
    else if (selectedPopulationId.endsWith('XY')) {
        selectedSex = 'XY';
    }
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-${id}-population-options-population` },
            "Genetic ancestry group:",
            ' ',
            react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-${id}-population-options-population`, value: selectedAncestralPopulation, onChange: (e) => {
                    onSelectPopulationId([e.target.value, selectedSex].filter(Boolean).join('_'));
                } },
                react_1.default.createElement("option", { value: "" }, "Global"),
                populationIds
                    .filter((popId) => !(popId.endsWith('XX') || popId.endsWith('XY')))
                    .sort((pop1, pop2) => 
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                gnomadPopulations_1.GNOMAD_POPULATION_NAMES[pop1].localeCompare(gnomadPopulations_1.GNOMAD_POPULATION_NAMES[pop2]))
                    .map((popId) => (react_1.default.createElement("option", { key: popId, value: popId }, gnomadPopulations_1.GNOMAD_POPULATION_NAMES[popId]))))),
        ' ',
        react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-${id}-population-options-sex` },
            "Sex: ",
            react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-${id}-population-options-sex`, value: selectedSex, onChange: (e) => {
                    onSelectPopulationId([selectedAncestralPopulation, e.target.value].filter(Boolean).join('_'));
                } },
                react_1.default.createElement("option", { value: "" }, "All"),
                react_1.default.createElement("option", { value: "XX" }, "XX"),
                react_1.default.createElement("option", { value: "XY" }, "XY")))));
};
exports.default = ShortTandemRepeatPopulationOptions;
//# sourceMappingURL=ShortTandemRepeatPopulationOptions.js.map