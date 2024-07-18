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
const react_1 = __importStar(require("react"));
const ui_1 = require("@gnomad/ui");
const AttributeList_1 = __importStar(require("../AttributeList"));
const SubmissionsList_1 = __importDefault(require("../SubmissionsList"));
const formatClinvarDate_1 = __importDefault(require("../ClinvarVariantsTrack/formatClinvarDate"));
const VariantClinvarInfo = ({ clinvar }) => {
    const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] = (0, react_1.useState)(false);
    const conditions = clinvar.submissions
        .flatMap((submission) => submission.conditions)
        .reduce((acc, condition) => (Object.assign(Object.assign({}, acc), { [`${condition.medgen_id}-${condition.name}`]: condition })), {});
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(AttributeList_1.default, null,
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "ClinVar Variation ID" }, clinvar.clinvar_variation_id),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Conditions" }, Object.values(conditions)
                .map((condition) => condition.medgen_id ? (
            // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
            react_1.default.createElement(ui_1.ExternalLink, { key: condition.medgen_id, href: `https://www.ncbi.nlm.nih.gov/medgen/${condition.medgen_id}/` }, condition.name)) : (react_1.default.createElement("span", null, condition.name)))
                .reduce((acc, el, i) => (i === 0 ? [...acc, el] : [...acc, ', ', el]), [])),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Clinical significance" }, clinvar.clinical_significance),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Review status" },
                clinvar.review_status,
                " (",
                clinvar.gold_stars,
                ' ',
                clinvar.gold_stars === 1 ? 'star' : 'stars',
                ")"),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Last evaluated" }, clinvar.last_evaluated ? (0, formatClinvarDate_1.default)(clinvar.last_evaluated) : '–')),
        react_1.default.createElement("p", { style: { marginBottom: 0 } },
            react_1.default.createElement(ui_1.TextButton, { onClick: () => {
                    setIsSubmissionsModalOpen(true);
                } },
                "See",
                ' ',
                clinvar.submissions.length === 1
                    ? 'submission'
                    : `all ${clinvar.submissions.length} submissions`),
            ' ',
            "or find more information on the",
            ' ',
            react_1.default.createElement(ui_1.ExternalLink, { href: `https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinvar.clinvar_variation_id}/` }, "ClinVar website"),
            ". Data displayed here is from ClinVar's ",
            (0, formatClinvarDate_1.default)(clinvar.release_date),
            ' ',
            "release."),
        isSubmissionsModalOpen && (
        // @ts-expect-error TS(2741) FIXME: Property 'size' is missing in type '{ children: El... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.Modal, { title: "ClinVar submissions", onRequestClose: () => {
                setIsSubmissionsModalOpen(false);
            } },
            react_1.default.createElement(SubmissionsList_1.default, { submissions: clinvar.submissions })))));
};
exports.default = VariantClinvarInfo;
//# sourceMappingURL=VariantClinvarInfo.js.map