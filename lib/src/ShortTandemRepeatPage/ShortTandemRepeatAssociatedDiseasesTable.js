"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const ShortTandemRepeatAssociatedDiseasesTable = ({ shortTandemRepeat }) => {
    const hasNotes = shortTandemRepeat.associated_diseases.some((disease) => disease.notes);
    return (
    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
    react_1.default.createElement(ui_1.BaseTable, { style: { minWidth: '100%' } },
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "col" }, "Disease"),
                react_1.default.createElement("th", { scope: "col" }, "OMIM"),
                react_1.default.createElement("th", { scope: "col" }, "Inheritance"),
                react_1.default.createElement("th", { scope: "col" }, "Ranges of repeats"),
                hasNotes && react_1.default.createElement("th", { scope: "col" }, "Notes"))),
        react_1.default.createElement("tbody", null, shortTandemRepeat.associated_diseases.map((disease) => {
            return (react_1.default.createElement("tr", { key: disease.name },
                react_1.default.createElement("th", { scope: "row" }, disease.name),
                react_1.default.createElement("td", null, disease.omim_id && (
                // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
                react_1.default.createElement(ui_1.ExternalLink, { href: `https://omim.org/entry/${disease.omim_id}` }, disease.omim_id))),
                react_1.default.createElement("td", null, disease.inheritance_mode),
                react_1.default.createElement("td", null, disease.repeat_size_classifications
                    .map((classification) => {
                    if (classification.min === null) {
                        return `${classification.classification} ≤ ${classification.max}`;
                    }
                    if (classification.max === null) {
                        return `${classification.classification} ≥ ${classification.min}`;
                    }
                    return `${classification.classification} ${classification.min} - ${classification.max}`;
                })
                    .join(', ')),
                hasNotes && react_1.default.createElement("td", null, disease.notes)));
        }))));
};
exports.default = ShortTandemRepeatAssociatedDiseasesTable;
//# sourceMappingURL=ShortTandemRepeatAssociatedDiseasesTable.js.map