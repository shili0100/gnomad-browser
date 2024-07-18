"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const analytics_1 = require("../analytics");
const MNVSummaryList = ({ multiNucleotideVariants }) => (
// @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
react_1.default.createElement(ui_1.List, null, multiNucleotideVariants.map((mnv) => (
// @ts-expect-error TS(2769) FIXME: No overload matches this call.
react_1.default.createElement(ui_1.ListItem, { key: mnv.combined_variant_id },
    mnv.changes_amino_acids ? (react_1.default.createElement(ui_1.Badge, { level: "warning" }, "Warning")) : (react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note")),
    ' ',
    "This variant is found in phase with",
    ' ',
    mnv.other_constituent_snvs
        .map((snv) => (react_1.default.createElement(Link_1.default, { key: snv, to: `/variant/${snv}` }, snv)))
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        .reduce((acc, el) => (acc ? [...acc, ' and ', el] : [el]), null),
    ' ',
    "in ",
    mnv.n_individuals,
    " individual",
    mnv.individuals !== 1 && 's',
    mnv.changes_amino_acids && ', altering the amino acid sequence',
    ".",
    ' ',
    react_1.default.createElement(Link_1.default, { onClick: () => {
            (0, analytics_1.logButtonClick)('User clicked "more info" in the MNV summary text');
        }, to: `/variant/${mnv.combined_variant_id}?dataset=gnomad_r2_1`, preserveSelectedDataset: false }, "More info"))))));
exports.default = MNVSummaryList;
//# sourceMappingURL=MNVSummaryList.js.map