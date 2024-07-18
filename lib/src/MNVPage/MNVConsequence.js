"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MNVConsequencePropType = void 0;
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const vepConsequences_1 = require("../vepConsequences");
const VariantCategoryMarker_1 = __importDefault(require("../VariantList/VariantCategoryMarker"));
const categoryColors = {
    lof: '#DD2C00',
    missense: 'orange',
    synonymous: '#2E7D32',
    other: '#424242',
};
const getConsequenceColor = (consequenceTerm) => {
    if (!consequenceTerm) {
        return 'gray';
    }
    const category = (0, vepConsequences_1.getCategoryFromConsequence)(consequenceTerm) || 'other';
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return categoryColors[category];
};
// @ts-expect-error TS(2322) FIXME: Type 'Requireable<InferProps<{ category: Requireab... Remove this comment to see the full error message
const MNVConsequencePropType = prop_types_1.default.shape({
    category: prop_types_1.default.string,
    consequence: prop_types_1.default.string.isRequired,
    codons: prop_types_1.default.string.isRequired,
    amino_acids: prop_types_1.default.string.isRequired,
    snv_consequences: prop_types_1.default.arrayOf(prop_types_1.default.shape({
        variant_id: prop_types_1.default.shape.isRequired,
        consequence: prop_types_1.default.string.isRequired,
        codons: prop_types_1.default.string.isRequired,
        amino_acids: prop_types_1.default.string.isRequired,
    })),
});
exports.MNVConsequencePropType = MNVConsequencePropType;
const MNVConsequence = ({ consequence }) => (react_1.default.createElement("div", null,
    consequence.category && (react_1.default.createElement("p", null,
        react_1.default.createElement("strong", null, "Category:"),
        " ",
        consequence.category)),
    react_1.default.createElement(ui_1.BaseTable, null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "col" }, "Variant"),
                react_1.default.createElement("th", { scope: "col" }, "Consequence"),
                react_1.default.createElement("th", { scope: "col" }, "Codon Change"),
                react_1.default.createElement("th", { scope: "col" }, "Amino Acid Change"))),
        react_1.default.createElement("tbody", null,
            consequence.snv_consequences.map((snvConsequence) => (react_1.default.createElement("tr", { key: snvConsequence.variant_id },
                react_1.default.createElement("th", { scope: "row" }, snvConsequence.variant_id),
                react_1.default.createElement("td", null,
                    react_1.default.createElement(VariantCategoryMarker_1.default, { color: getConsequenceColor(snvConsequence.consequence) }),
                    (0, vepConsequences_1.getLabelForConsequenceTerm)(snvConsequence.consequence)),
                react_1.default.createElement("td", null, snvConsequence.codons.replace('/', ' → ')),
                react_1.default.createElement("td", null, snvConsequence.amino_acids.replace('/', ' → '))))),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "row" }, "Combined"),
                react_1.default.createElement("td", null,
                    react_1.default.createElement(VariantCategoryMarker_1.default, { color: getConsequenceColor(consequence.consequence) }),
                    (0, vepConsequences_1.getLabelForConsequenceTerm)(consequence.consequence)),
                react_1.default.createElement("td", null, consequence.codons.replace('/', ' → ')),
                react_1.default.createElement("td", null, consequence.amino_acids.replace('/', ' → ')))))));
exports.default = MNVConsequence;
//# sourceMappingURL=MNVConsequence.js.map