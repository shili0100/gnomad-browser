"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect = ({ shortTandemRepeatOrAdjacentRepeat, value, onChange, }) => {
    // Adjacent repeats do not have classifications for repeat units.
    const isAdjacentRepeat = !shortTandemRepeatOrAdjacentRepeat.associated_diseases;
    const repeatUnitClassifications = isAdjacentRepeat
        ? {}
        : shortTandemRepeatOrAdjacentRepeat.repeat_units.reduce((acc, repeatUnit) => (Object.assign(Object.assign({}, acc), { [repeatUnit.repeat_unit]: repeatUnit.classification })), {});
    return (react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-${shortTandemRepeatOrAdjacentRepeat.id}-genotype-distribution-repeat-units` },
        "Repeat units: ",
        react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-${shortTandemRepeatOrAdjacentRepeat.id}-genotype-distribution-repeat-units`, value: value, onChange: (e) => {
                onChange(e.target.value);
            } },
            shortTandemRepeatOrAdjacentRepeat.genotype_distribution.repeat_units.length > 1 && (react_1.default.createElement("option", { value: "" }, "All")),
            react_1.default.createElement("optgroup", { label: "Repeat unit pairs (only pairs found in gnomAD are listed here)" }, shortTandemRepeatOrAdjacentRepeat.genotype_distribution.repeat_units.map((repeatUnitDistribution) => {
                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                const optionValue = repeatUnitDistribution.repeat_units.join(' / ');
                return (react_1.default.createElement("option", { key: optionValue, value: optionValue }, repeatUnitDistribution.repeat_units
                    .map((repeatUnit) => {
                    const notes = [];
                    if (repeatUnitClassifications[repeatUnit]) {
                        notes.push(repeatUnitClassifications[repeatUnit]);
                    }
                    if (repeatUnit === shortTandemRepeatOrAdjacentRepeat.reference_repeat_unit) {
                        notes.push('reference');
                    }
                    if (shortTandemRepeatOrAdjacentRepeat.repeat_units.length > 1 &&
                        notes.length > 0) {
                        return `${repeatUnit} (${notes.join(', ')})`;
                    }
                    return repeatUnit;
                })
                    .join(' / ')));
            })))));
};
exports.default = ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect;
//# sourceMappingURL=ShortTandemRepeatGenotypeDistributionRepeatUnitsSelect.js.map