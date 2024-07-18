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
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const AttributeList_1 = __importStar(require("./AttributeList"));
const formatClinvarDate_1 = __importDefault(require("./ClinvarVariantsTrack/formatClinvarDate"));
const SubmissionsList = ({ submissions }) => (
// @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
react_1.default.createElement(ui_1.List, null, submissions.map((submission) => (
// @ts-expect-error TS(2769) FIXME: No overload matches this call.
react_1.default.createElement(ui_1.ListItem, { key: `${submission.submitter_name}-${submission.last_evaluated}` },
    react_1.default.createElement(AttributeList_1.default, null,
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Submitter" }, submission.submitter_name),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Conditions" }, submission.conditions
            .map((condition) => condition.medgen_id ? (
        // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
        react_1.default.createElement(ui_1.ExternalLink, { key: condition.medgen_id, href: `https://www.ncbi.nlm.nih.gov/medgen/${condition.medgen_id}/` }, condition.name)) : (react_1.default.createElement("span", null, condition.name)))
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            .reduce((acc, el, i) => (i === 0 ? [...acc, el] : [...acc, ', ', el]), [])),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Clinical significance" }, submission.clinical_significance || '–'),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Review status" }, submission.review_status),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Last evaluated" }, submission.last_evaluated ? (0, formatClinvarDate_1.default)(submission.last_evaluated) : '–')))))));
exports.default = SubmissionsList;
//# sourceMappingURL=SubmissionsList.js.map