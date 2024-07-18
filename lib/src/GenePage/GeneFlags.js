"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const GeneFlags = ({ gene }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null, gene.flags.includes('chip') && (react_1.default.createElement("p", null,
        react_1.default.createElement(ui_1.Badge, { level: "warning" }, "Note"),
        " Analysis of allele balance and age data indicates that this gene shows evidence of",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8050831/" }, "clonal hematopoiesis of indeterminate potential (CHIP)"),
        ". The potential presence of somatic variants should be taken into account when interpreting the penetrance, pathogenicity, and frequency of assumed germline variants. For more information, see pages 37-40 of",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "https://static-content.springer.com/esm/art%3A10.1038%2Fs41586-020-2308-7/MediaObjects/41586_2020_2308_MOESM1_ESM.pdf" }, "supplementary information"),
        ' ',
        "for ",
        react_1.default.createElement(ui_1.ExternalLink, { href: "https://doi.org/10.1038/s41586-020-2308-7" },
            react_1.default.createElement("em", null, "The mutational constraint spectrum quantified from variation in 141,456 humans")),
        ' ',
        "and ",
        react_1.default.createElement(ui_1.ExternalLink, { href: "https://pubmed.ncbi.nlm.nih.gov/28229513/" },
            react_1.default.createElement("em", null, "Pathogenic ASXL1 somatic variants in reference databases complicate germline variant interpretation for Bohring-Opitz Syndrome")),
        "."))));
};
exports.default = GeneFlags;
//# sourceMappingURL=GeneFlags.js.map