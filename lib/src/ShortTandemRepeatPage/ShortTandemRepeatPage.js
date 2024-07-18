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
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const TableWrapper_1 = __importDefault(require("../TableWrapper"));
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const ControlSection_1 = __importDefault(require("../VariantPage/ControlSection"));
const ShortTandemRepeatAgeDistributionPlot_1 = __importDefault(require("./ShortTandemRepeatAgeDistributionPlot"));
const ShortTandemRepeatAssociatedDiseasesTable_1 = __importDefault(require("./ShortTandemRepeatAssociatedDiseasesTable"));
const ShortTandemRepeatAttributes_1 = __importDefault(require("./ShortTandemRepeatAttributes"));
const ShortTandemRepeatPopulationOptions_1 = __importDefault(require("./ShortTandemRepeatPopulationOptions"));
const ShortTandemRepeatAlleleSizeDistributionPlot_1 = __importDefault(require("./ShortTandemRepeatAlleleSizeDistributionPlot"));
const ShortTandemRepeatGenotypeDistributionPlot_1 = __importDefault(require("./ShortTandemRepeatGenotypeDistributionPlot"));
const ShortTandemRepeatGenotypeDistributionBinDetails_1 = __importDefault(require("./ShortTandemRepeatGenotypeDistributionBinDetails"));
const ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect_1 = __importDefault(require("./ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect"));
const ShortTandemRepeatReads_1 = __importDefault(require("./ShortTandemRepeatReads"));
const shortTandemRepeatHelpers_1 = require("./shortTandemRepeatHelpers");
const ShortTandemRepeatAdjacentRepeatSection_1 = __importDefault(require("./ShortTandemRepeatAdjacentRepeatSection"));
const ResponsiveSection = styled_components_1.default.section `
  width: calc(50% - 15px);

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const FlexWrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`;
const parseCombinedPopulationId = (combinedPopulationId) => {
    let population;
    let sex;
    if (combinedPopulationId.includes('_')) {
        ;
        [population, sex] = combinedPopulationId.split('_');
    }
    else if (combinedPopulationId === 'XX' || combinedPopulationId === 'XY') {
        population = null;
        sex = combinedPopulationId;
    }
    else {
        population = combinedPopulationId;
        sex = null;
    }
    return { population, sex };
};
const ShortTandemRepeatPage = ({ datasetId, shortTandemRepeat }) => {
    const [selectedRepeatUnit, setSelectedRepeatUnit] = (0, react_1.useState)(shortTandemRepeat.allele_size_distribution.repeat_units.length === 1
        ? shortTandemRepeat.allele_size_distribution.repeat_units[0].repeat_unit
        : '');
    const [selectedPopulationId, setSelectedPopulationId] = (0, react_1.useState)('');
    const [selectedScaleType, setSelectedScaleType] = (0, react_1.useState)('linear');
    const [selectedGenotypeDistributionRepeatUnits, setSelectedGenotypeDistributionRepeatUnits] = (0, react_1.useState)(shortTandemRepeat.genotype_distribution.repeat_units.length === 1
        ? shortTandemRepeat.genotype_distribution.repeat_units[0].repeat_units.join(' / ')
        : '');
    const [selectedDisease, setSelectedDisease] = (0, react_1.useState)(shortTandemRepeat.associated_diseases[0].name);
    const [showAdjacentRepeats, setShowAdjacentRepeats] = (0, react_1.useState)(false);
    const populationIds = shortTandemRepeat.allele_size_distribution.populations.map((pop) => pop.id);
    const allRepeatUnitsByClassification = {};
    shortTandemRepeat.repeat_units.forEach((repeatUnit) => {
        if (allRepeatUnitsByClassification[repeatUnit.classification] === undefined) {
            allRepeatUnitsByClassification[repeatUnit.classification] = [];
        }
        allRepeatUnitsByClassification[repeatUnit.classification].push(repeatUnit.repeat_unit);
    });
    // This uses repeat units from shortTandemRepeat.allele_size_distribution.repeat_units because
    // shortTandemRepeat.repeat_units may include repeat units that do not appear in gnomAD.
    const repeatUnitsFoundInGnomad = new Set(shortTandemRepeat.allele_size_distribution.repeat_units.map((repeatUnit) => repeatUnit.repeat_unit));
    const repeatUnitsFoundInGnomadByClassification = {};
    Object.keys(allRepeatUnitsByClassification).forEach((classification) => {
        repeatUnitsFoundInGnomadByClassification[classification] = allRepeatUnitsByClassification[classification].filter((repeatUnit) => repeatUnitsFoundInGnomad.has(repeatUnit));
    });
    const allRepeatUnitsFoundInGnomadArePathogenic = Object.keys(repeatUnitsFoundInGnomadByClassification)
        .filter((classification) => classification !== 'pathogenic')
        .every((classification) => (repeatUnitsFoundInGnomadByClassification[classification] || []).length === 0);
    const diseaseToPlot = shortTandemRepeat.associated_diseases.find((disease) => disease.name === selectedDisease);
    const repeatSizeClassificationsToPlot = diseaseToPlot
        ? diseaseToPlot.repeat_size_classifications
        : [];
    const plotRanges = repeatSizeClassificationsToPlot.map((classification) => {
        return {
            label: classification.classification,
            start: classification.min !== null ? classification.min : 0,
            stop: classification.max !== null ? classification.max + 1 : Infinity,
        };
    });
    const [selectedGenotypeDistributionBin, setSelectedGenotypeDistributionBin] = (0, react_1.useState)(null);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(FlexWrapper, { style: { marginBottom: '3em' } },
            react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement(ShortTandemRepeatAttributes_1.default, { shortTandemRepeat: shortTandemRepeat }),
                !allRepeatUnitsFoundInGnomadArePathogenic && (react_1.default.createElement("p", { style: { marginBottom: 0 } },
                    react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                    " This locus has both pathogenic and non-pathogenic repeat units."))),
            react_1.default.createElement(ResponsiveSection, null,
                shortTandemRepeat.stripy_id && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("h2", null, "External Resources"),
                    react_1.default.createElement(ui_1.List, null,
                        react_1.default.createElement(ui_1.ListItem, null,
                            react_1.default.createElement(ui_1.ExternalLink, { href: `https://stripy.org/database/${shortTandemRepeat.stripy_id}` }, "STRipy"))))),
                react_1.default.createElement("h2", null, "Related Loci"),
                react_1.default.createElement("p", null,
                    react_1.default.createElement(Link_1.default, { to: "/short-tandem-repeats" }, "Table of tandem repeat loci in gnomAD")))),
        react_1.default.createElement("section", { style: { marginBottom: '3em' } },
            react_1.default.createElement("h2", null,
                "Associated Diseases ",
                react_1.default.createElement(InfoButton_1.default, { topic: "str-associated-diseases" })),
            react_1.default.createElement(TableWrapper_1.default, null,
                react_1.default.createElement(ShortTandemRepeatAssociatedDiseasesTable_1.default, { shortTandemRepeat: shortTandemRepeat }))),
        react_1.default.createElement("section", { style: { marginBottom: '3em' } },
            react_1.default.createElement("h2", null,
                "Allele Size Distribution ",
                react_1.default.createElement(InfoButton_1.default, { topic: "str-allele-size-distribution" })),
            react_1.default.createElement(ShortTandemRepeatAlleleSizeDistributionPlot_1.default
            // @ts-expect-error TS(2322) FIXME: Type '{ maxRepeats: number; alleleSizeDistribution... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ maxRepeats: number; alleleSizeDistribution... Remove this comment to see the full error message
                maxRepeats: shortTandemRepeat.allele_size_distribution.distribution[shortTandemRepeat.allele_size_distribution.distribution.length - 1][0], alleleSizeDistribution: (0, shortTandemRepeatHelpers_1.getSelectedAlleleSizeDistribution)(shortTandemRepeat, {
                    selectedPopulationId,
                    selectedRepeatUnit,
                }), repeatUnitLength: selectedRepeatUnit && !selectedRepeatUnit.startsWith('classification')
                    ? selectedRepeatUnit.length
                    : null, ranges: (selectedRepeatUnit === '' && allRepeatUnitsFoundInGnomadArePathogenic) ||
                    selectedRepeatUnit === 'classification/pathogenic' ||
                    (repeatUnitsFoundInGnomadByClassification.pathogenic || []).includes(selectedRepeatUnit)
                    ? plotRanges
                    : [], scaleType: selectedScaleType }),
            react_1.default.createElement(ControlSection_1.default, { style: { marginTop: '0.5em' } },
                react_1.default.createElement(ShortTandemRepeatPopulationOptions_1.default, { id: `${shortTandemRepeat.id}-repeat-counts`, populationIds: populationIds, selectedPopulationId: selectedPopulationId, onSelectPopulationId: setSelectedPopulationId }),
                react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-${shortTandemRepeat.id}-repeat-unit` },
                    "Repeat unit: ",
                    react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-${shortTandemRepeat.id}-repeat-unit`, value: selectedRepeatUnit, onChange: (e) => {
                            setSelectedRepeatUnit(e.target.value);
                        } }, shortTandemRepeat.allele_size_distribution.repeat_units.length === 1 ? (react_1.default.createElement(react_1.default.Fragment, null, shortTandemRepeat.allele_size_distribution.repeat_units.map((repeatUnit) => (react_1.default.createElement("option", { key: repeatUnit.repeat_unit, value: repeatUnit.repeat_unit }, repeatUnit.repeat_unit))))) : (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("option", { value: "" }, "All"),
                        Object.keys(allRepeatUnitsByClassification).length > 1 && (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("optgroup", { label: "Grouped by classification" }, ['pathogenic', 'benign', 'unknown'].map((classification) => {
                                const foundInGnomad = (repeatUnitsFoundInGnomadByClassification[classification] || [])
                                    .length > 0;
                                return (react_1.default.createElement("option", { key: classification, value: `classification/${classification}`, disabled: !foundInGnomad }, foundInGnomad
                                    ? `All ${classification}`
                                    : `All ${classification} (not found in gnomAD)`));
                            })))),
                        ['pathogenic', 'benign', 'unknown']
                            .filter((classification) => (allRepeatUnitsByClassification[classification] || []).length > 0)
                            .map((classification) => (react_1.default.createElement("optgroup", { key: classification, label: `${classification.charAt(0).toUpperCase()}${classification.slice(1)}` }, allRepeatUnitsByClassification[classification].map((repeatUnit) => {
                            const foundInGnomad = repeatUnitsFoundInGnomad.has(repeatUnit);
                            const notes = [];
                            if (repeatUnit === shortTandemRepeat.reference_repeat_unit) {
                                notes.push('reference');
                            }
                            if (!foundInGnomad) {
                                notes.push('not found in gnomAD');
                            }
                            return (react_1.default.createElement("option", { key: repeatUnit, value: repeatUnit, disabled: !foundInGnomad },
                                repeatUnit,
                                notes.length > 0 && ` (${notes.join(', ')})`));
                        })))))))),
                react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-${shortTandemRepeat.id}-allele-size-distribution-scale` },
                    "Scale: ",
                    react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-${shortTandemRepeat.id}-allele-size-distribution-scale`, value: selectedScaleType, onChange: (e) => {
                            setSelectedScaleType(e.target.value);
                        } },
                        react_1.default.createElement("option", { value: "linear" }, "Linear"),
                        react_1.default.createElement("option", { value: "log" }, "Log")))),
            shortTandemRepeat.associated_diseases.length > 1 && (react_1.default.createElement(ControlSection_1.default, { style: { marginTop: '1em' } },
                react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-${shortTandemRepeat.id}-allele-size-distribution-selected-disease` },
                    "Show ranges for",
                    ' ',
                    react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-${shortTandemRepeat.id}-allele-size-distribution-selected-disease`, value: selectedDisease, onChange: (e) => {
                            setSelectedDisease(e.target.value);
                        } }, shortTandemRepeat.associated_diseases.map((disease) => {
                        return (react_1.default.createElement("option", { key: disease.name, value: disease.name }, disease.name));
                    }))))),
            !((selectedRepeatUnit === '' && allRepeatUnitsFoundInGnomadArePathogenic) ||
                selectedRepeatUnit === 'classification/pathogenic' ||
                (allRepeatUnitsByClassification.pathogenic || []).includes(selectedRepeatUnit)) && (react_1.default.createElement("p", { style: { marginBottom: 0 } },
                react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                " This plot includes non-pathogenic repeat units. Use the \u201CRepeat unit\u201D menu to view specific repeat units."))),
        react_1.default.createElement("section", { style: { marginBottom: '3em' } },
            react_1.default.createElement("h2", null,
                "Genotype Distribution ",
                react_1.default.createElement(InfoButton_1.default, { topic: "str-genotype-distribution" })),
            react_1.default.createElement(ShortTandemRepeatGenotypeDistributionPlot_1.default
            // @ts-expect-error TS(2322) FIXME: Type '{ axisLabels: any; maxRepeats: (string | und... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ axisLabels: any; maxRepeats: (string | und... Remove this comment to see the full error message
                axisLabels: (0, shortTandemRepeatHelpers_1.getGenotypeDistributionPlotAxisLabels)(shortTandemRepeat, {
                    selectedRepeatUnits: selectedGenotypeDistributionRepeatUnits,
                }), maxRepeats: [
                    (0, d3_array_1.max)(shortTandemRepeat.genotype_distribution.distribution, (d) => (0, d3_array_1.max)(d.slice(0, 2))),
                    (0, d3_array_1.max)(shortTandemRepeat.genotype_distribution.distribution, (d) => (0, d3_array_1.min)(d.slice(0, 2))),
                ], genotypeDistribution: (0, shortTandemRepeatHelpers_1.getSelectedGenotypeDistribution)(shortTandemRepeat, {
                    selectedRepeatUnits: selectedGenotypeDistributionRepeatUnits,
                    selectedPopulationId,
                }), xRanges: (selectedGenotypeDistributionRepeatUnits === '' &&
                    allRepeatUnitsFoundInGnomadArePathogenic) ||
                    (allRepeatUnitsByClassification.pathogenic || []).includes(selectedGenotypeDistributionRepeatUnits.split(' / ')[0])
                    ? plotRanges
                    : [], yRanges: (selectedGenotypeDistributionRepeatUnits === '' &&
                    allRepeatUnitsFoundInGnomadArePathogenic) ||
                    (allRepeatUnitsByClassification.pathogenic || []).includes(selectedGenotypeDistributionRepeatUnits.split(' / ')[1])
                    ? plotRanges
                    : [], onSelectBin: (bin) => {
                    if (bin.xRange[0] !== bin.xRange[1] || bin.yRange[0] !== bin.yRange[1]) {
                        setSelectedGenotypeDistributionBin(bin);
                    }
                } }),
            react_1.default.createElement(ControlSection_1.default, { style: { marginTop: '0.5em' } },
                react_1.default.createElement(ShortTandemRepeatPopulationOptions_1.default, { id: `${shortTandemRepeat.id}-genotype-distribution`, populationIds: populationIds, selectedPopulationId: selectedPopulationId, onSelectPopulationId: setSelectedPopulationId }),
                react_1.default.createElement(ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect_1.default, { shortTandemRepeatOrAdjacentRepeat: shortTandemRepeat, value: selectedGenotypeDistributionRepeatUnits, onChange: setSelectedGenotypeDistributionRepeatUnits })),
            shortTandemRepeat.associated_diseases.length > 1 && (react_1.default.createElement(ControlSection_1.default, { style: { marginTop: '1em' } },
                react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-${shortTandemRepeat.id}-genotype-distribution-selected-disease` },
                    "Show ranges for",
                    ' ',
                    react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-${shortTandemRepeat.id}-genotype-distribution-selected-disease`, value: selectedDisease, onChange: (e) => {
                            setSelectedDisease(e.target.value);
                        } }, shortTandemRepeat.associated_diseases.map((disease) => {
                        return (react_1.default.createElement("option", { key: disease.name, value: disease.name }, disease.name));
                    }))))),
            ((selectedGenotypeDistributionRepeatUnits === '' &&
                !allRepeatUnitsFoundInGnomadArePathogenic) ||
                !selectedGenotypeDistributionRepeatUnits
                    .split(' / ')
                    .every((repeatUnit) => (allRepeatUnitsByClassification.pathogenic || []).includes(repeatUnit))) && (react_1.default.createElement("p", { style: { marginBottom: 0 } },
                react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                " This plot includes non-pathogenic repeat units. Use the \u201CRepeat units\u201D menu to view specific repeat units."))),
        selectedGenotypeDistributionBin && (react_1.default.createElement(ui_1.Modal, { title: selectedGenotypeDistributionBin.label, size: "large", 
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; title: any; size: "larg... Remove this comment to see the full error message
            initialFocusOnButton: false, onRequestClose: () => {
                setSelectedGenotypeDistributionBin(null);
            } },
            react_1.default.createElement(ShortTandemRepeatGenotypeDistributionBinDetails_1.default, { shortTandemRepeatOrAdjacentRepeat: shortTandemRepeat, selectedPopulationId: selectedPopulationId, selectedRepeatUnits: selectedGenotypeDistributionRepeatUnits, bin: selectedGenotypeDistributionBin }))),
        react_1.default.createElement("section", { style: { marginBottom: '3em' } },
            react_1.default.createElement("h2", null,
                "Age Distribution ",
                react_1.default.createElement(InfoButton_1.default, { topic: "str-age-distribution" })),
            react_1.default.createElement(ShortTandemRepeatAgeDistributionPlot_1.default
            // @ts-expect-error TS(2322) FIXME: Type '{ ageDistribution: any; maxRepeats: number; ... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ ageDistribution: any; maxRepeats: number; ... Remove this comment to see the full error message
                ageDistribution: shortTandemRepeat.age_distribution, maxRepeats: shortTandemRepeat.allele_size_distribution.distribution[shortTandemRepeat.allele_size_distribution.distribution.length - 1][0], ranges: allRepeatUnitsFoundInGnomadArePathogenic ? plotRanges : [] }),
            !allRepeatUnitsFoundInGnomadArePathogenic && (react_1.default.createElement("p", { style: { marginBottom: 0 } },
                react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                " This plot includes non-pathogenic repeat units."))),
        shortTandemRepeat.adjacent_repeats.length > 0 && (react_1.default.createElement("section", { style: { marginBottom: '3em' } },
            react_1.default.createElement("h2", null,
                "Adjacent Repeats ",
                react_1.default.createElement(InfoButton_1.default, { topic: "str-adjacent-repeats" })),
            showAdjacentRepeats ? (shortTandemRepeat.adjacent_repeats.map((adjacentRepeat) => {
                return (react_1.default.createElement(ShortTandemRepeatAdjacentRepeatSection_1.default, { key: adjacentRepeat.id, adjacentRepeat: adjacentRepeat, populationIds: populationIds, selectedPopulationId: selectedPopulationId, onSelectPopulationId: setSelectedPopulationId, selectedScaleType: selectedScaleType, onSelectScaleType: setSelectedScaleType }));
            })) : (react_1.default.createElement(ui_1.Button, { onClick: () => {
                    setShowAdjacentRepeats(true);
                } },
                "Show ",
                shortTandemRepeat.adjacent_repeats.length,
                " adjacent repeat",
                shortTandemRepeat.adjacent_repeats.length > 1 && 's')))),
        react_1.default.createElement("section", null,
            react_1.default.createElement("h2", null,
                "Read Data",
                ' ',
                react_1.default.createElement(InfoButton_1.default, { topic: shortTandemRepeat.allele_size_distribution.repeat_units.length > 1
                        ? 'str-read-data-multiple-repeat-units'
                        : 'str-read-data' })),
            react_1.default.createElement(ControlSection_1.default, { style: { marginBottom: '1em' } },
                react_1.default.createElement(ShortTandemRepeatPopulationOptions_1.default, { id: `${shortTandemRepeat.id}-read-data`, populationIds: populationIds, selectedPopulationId: selectedPopulationId, onSelectPopulationId: setSelectedPopulationId })),
            react_1.default.createElement(ShortTandemRepeatReads_1.default, { datasetId: datasetId, shortTandemRepeat: shortTandemRepeat, filter: Object.assign({}, parseCombinedPopulationId(selectedPopulationId)) }))));
};
exports.default = ShortTandemRepeatPage;
//# sourceMappingURL=ShortTandemRepeatPage.js.map