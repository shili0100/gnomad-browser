"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const shortTandemRepeatHelpers_1 = require("./shortTandemRepeatHelpers");
const ShortTandemRepeatGenotypeDistributionBinDetails = ({ shortTandemRepeatOrAdjacentRepeat, selectedPopulationId, selectedRepeatUnits, bin, }) => {
    const genotypeDistribution = (0, shortTandemRepeatHelpers_1.getSelectedGenotypeDistribution)(shortTandemRepeatOrAdjacentRepeat, {
        selectedPopulationId,
        selectedRepeatUnits,
    });
    const isInBin = (d) => bin.xRange[0] <= d[0] && d[0] <= bin.xRange[1] && bin.yRange[0] <= d[1] && d[1] <= bin.yRange[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.List, null, genotypeDistribution.filter(isInBin).map(([x, y, n]) => (
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        react_1.default.createElement(ui_1.ListItem, { key: `${x}/${y}` },
            x,
            " repeats / ",
            y,
            " repeats: ",
            n,
            " individuals")))),
        !selectedRepeatUnits && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h3", null, "Repeat Units"),
            react_1.default.createElement(ui_1.List, null, shortTandemRepeatOrAdjacentRepeat.genotype_distribution.repeat_units
                .map((repeatUnitsDistribution) => repeatUnitsDistribution.repeat_units)
                .map((repeatUnits) => ({
                repeatUnits,
                distribution: (0, shortTandemRepeatHelpers_1.getSelectedGenotypeDistribution)(shortTandemRepeatOrAdjacentRepeat, {
                    selectedPopulationId,
                    selectedRepeatUnits: repeatUnits.join(' / '),
                }),
            }))
                .flatMap(({ repeatUnits, distribution }) => [
                {
                    repeatUnits,
                    distribution: distribution.filter((d) => d[0] >= d[1]).filter(isInBin),
                },
                {
                    repeatUnits: [...repeatUnits].reverse(),
                    distribution: distribution
                        .filter((d) => d[0] < d[1])
                        .map((d) => [d[1], d[0], d[2]])
                        .filter(isInBin),
                },
            ])
                .filter(({ distribution }) => distribution.length > 0)
                .map(({ repeatUnits, distribution }) => (
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            react_1.default.createElement(ui_1.ListItem, { key: repeatUnits.join('/') },
                repeatUnits.join(' / '),
                react_1.default.createElement(ui_1.List, null, distribution.map(([x, y, n]) => (
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                react_1.default.createElement(ui_1.ListItem, { key: `${x}/${y}` },
                    x,
                    " repeats / ",
                    y,
                    " repeats: ",
                    n,
                    " individuals"))))))))))));
};
exports.default = ShortTandemRepeatGenotypeDistributionBinDetails;
//# sourceMappingURL=ShortTandemRepeatGenotypeDistributionBinDetails.js.map