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
const d3_array_1 = require("d3-array");
const react_1 = __importStar(require("react"));
const ui_1 = require("@gnomad/ui");
const ControlSection_1 = __importDefault(require("../VariantPage/ControlSection"));
const ShortTandemRepeatPopulationOptions_1 = __importDefault(require("./ShortTandemRepeatPopulationOptions"));
const ShortTandemRepeatAlleleSizeDistributionPlot_1 = __importDefault(require("./ShortTandemRepeatAlleleSizeDistributionPlot"));
const ShortTandemRepeatGenotypeDistributionPlot_1 = __importDefault(require("./ShortTandemRepeatGenotypeDistributionPlot"));
const ShortTandemRepeatGenotypeDistributionBinDetails_1 = __importDefault(require("./ShortTandemRepeatGenotypeDistributionBinDetails"));
const ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect_1 = __importDefault(require("./ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect"));
const ShortTandemRepeatAdjacentRepeatAttributes_1 = __importDefault(require("./ShortTandemRepeatAdjacentRepeatAttributes"));
const shortTandemRepeatHelpers_1 = require("./shortTandemRepeatHelpers");
const ShortTandemRepeatAdjacentRepeatSection = ({ adjacentRepeat, populationIds, selectedPopulationId, onSelectPopulationId, selectedScaleType, onSelectScaleType, }) => {
    const [selectedRepeatUnit, setSelectedRepeatUnit] = (0, react_1.useState)(adjacentRepeat.repeat_units.length === 1 ? adjacentRepeat.repeat_units[0] : '');
    const [selectedGenotypeDistributionRepeatUnits, setSelectedGenotypeDistributionRepeatUnits] = (0, react_1.useState)(adjacentRepeat.genotype_distribution.repeat_units.length === 1
        ? adjacentRepeat.genotype_distribution.repeat_units[0].repeat_units.join(' / ')
        : '');
    const [selectedGenotypeDistributionBin, setSelectedGenotypeDistributionBin] = (0, react_1.useState)(null);
    return (react_1.default.createElement("section", { style: { marginBottom: '3em' } },
        react_1.default.createElement("h3", null, adjacentRepeat.id),
        react_1.default.createElement(ShortTandemRepeatAdjacentRepeatAttributes_1.default, { adjacentRepeat: adjacentRepeat }),
        react_1.default.createElement("h4", { style: { marginBottom: '0.66em' } }, "Allele Size Distribution"),
        react_1.default.createElement(ShortTandemRepeatAlleleSizeDistributionPlot_1.default
        // @ts-expect-error TS(2322) FIXME: Type '{ maxRepeats: number; alleleSizeDistribution... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2322) FIXME: Type '{ maxRepeats: number; alleleSizeDistribution... Remove this comment to see the full error message
            maxRepeats: adjacentRepeat.allele_size_distribution.distribution[adjacentRepeat.allele_size_distribution.distribution.length - 1][0], alleleSizeDistribution: (0, shortTandemRepeatHelpers_1.getSelectedAlleleSizeDistribution)(adjacentRepeat, {
                selectedPopulationId,
                selectedRepeatUnit,
            }), repeatUnitLength: selectedRepeatUnit ? selectedRepeatUnit.length : null, scaleType: selectedScaleType }),
        react_1.default.createElement(ControlSection_1.default, null,
            react_1.default.createElement(ShortTandemRepeatPopulationOptions_1.default, { id: `${adjacentRepeat.id}-repeat-counts`, populationIds: populationIds, selectedPopulationId: selectedPopulationId, onSelectPopulationId: onSelectPopulationId }),
            react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-${adjacentRepeat.id}-repeat-unit` },
                "Repeat unit: ",
                react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-${adjacentRepeat.id}-repeat-unit`, value: selectedRepeatUnit, onChange: (e) => {
                        setSelectedRepeatUnit(e.target.value);
                    } },
                    adjacentRepeat.repeat_units.length > 1 && react_1.default.createElement("option", { value: "" }, "All"),
                    adjacentRepeat.repeat_units.map((repeatUnit) => (react_1.default.createElement("option", { key: repeatUnit, value: repeatUnit }, repeatUnit === adjacentRepeat.reference_repeat_unit &&
                        adjacentRepeat.repeat_units.length > 1
                        ? `${repeatUnit} (reference)`
                        : repeatUnit))))),
            react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-${adjacentRepeat.id}-repeat-counts-scale` },
                "Scale: ",
                react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-${adjacentRepeat.id}-repeat-counts-scale`, value: selectedScaleType, onChange: (e) => {
                        onSelectScaleType(e.target.value);
                    } },
                    react_1.default.createElement("option", { value: "linear" }, "Linear"),
                    react_1.default.createElement("option", { value: "log" }, "Log")))),
        react_1.default.createElement("h4", { style: { marginBottom: '0.66em' } }, "Genotype Distribution"),
        react_1.default.createElement(ShortTandemRepeatGenotypeDistributionPlot_1.default
        // @ts-expect-error TS(2322) FIXME: Type '{ axisLabels: any; maxRepeats: (string | und... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2322) FIXME: Type '{ axisLabels: any; maxRepeats: (string | und... Remove this comment to see the full error message
            axisLabels: (0, shortTandemRepeatHelpers_1.getGenotypeDistributionPlotAxisLabels)(adjacentRepeat, {
                selectedRepeatUnits: selectedGenotypeDistributionRepeatUnits,
            }), maxRepeats: [
                (0, d3_array_1.max)(adjacentRepeat.genotype_distribution.distribution, (d) => (0, d3_array_1.max)(d.slice(0, 2))),
                (0, d3_array_1.max)(adjacentRepeat.genotype_distribution.distribution, (d) => (0, d3_array_1.min)(d.slice(0, 2))),
            ], genotypeDistribution: (0, shortTandemRepeatHelpers_1.getSelectedGenotypeDistribution)(adjacentRepeat, {
                selectedRepeatUnits: selectedGenotypeDistributionRepeatUnits,
                selectedPopulationId,
            }), onSelectBin: (bin) => {
                if (bin.xRange[0] !== bin.xRange[1] || bin.yRange[0] !== bin.yRange[1]) {
                    setSelectedGenotypeDistributionBin(bin);
                }
            } }),
        react_1.default.createElement(ControlSection_1.default, null,
            react_1.default.createElement(ShortTandemRepeatPopulationOptions_1.default, { id: `${adjacentRepeat.id}-genotype-distribution`, populationIds: populationIds, selectedPopulationId: selectedPopulationId, onSelectPopulationId: onSelectPopulationId }),
            react_1.default.createElement(ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect_1.default, { shortTandemRepeatOrAdjacentRepeat: adjacentRepeat, value: selectedGenotypeDistributionRepeatUnits, onChange: setSelectedGenotypeDistributionRepeatUnits })),
        selectedGenotypeDistributionBin && (react_1.default.createElement(ui_1.Modal, { title: selectedGenotypeDistributionBin.label, size: "large", 
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; title: any; size: "larg... Remove this comment to see the full error message
            initialFocusOnButton: false, onRequestClose: () => {
                setSelectedGenotypeDistributionBin(null);
            } },
            react_1.default.createElement(ShortTandemRepeatGenotypeDistributionBinDetails_1.default, { shortTandemRepeatOrAdjacentRepeat: adjacentRepeat, selectedPopulationId: selectedPopulationId, selectedRepeatUnits: selectedGenotypeDistributionRepeatUnits, bin: selectedGenotypeDistributionBin })))));
};
exports.default = ShortTandemRepeatAdjacentRepeatSection;
//# sourceMappingURL=ShortTandemRepeatAdjacentRepeatSection.js.map