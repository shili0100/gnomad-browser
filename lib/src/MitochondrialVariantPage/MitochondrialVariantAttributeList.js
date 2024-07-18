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
const AttributeList_1 = __importStar(require("../AttributeList"));
const MitochondrialVariantAttributeList = ({ variant }) => (react_1.default.createElement(AttributeList_1.default, { style: { marginTop: '1.25em' } },
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Filters", tooltip: "Quality control filters that this variant failed (if any)" }, variant.filters && variant.filters.length ? (variant.filters.map((f) => (react_1.default.createElement(ui_1.Badge, { key: f, level: "warning" }, f)))) : (react_1.default.createElement(ui_1.Badge, { level: "success" }, "Pass"))),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Allele Number", tooltip: "Total number of individuals with high quality sequence at this position." }, variant.an),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Homoplasmic AC", tooltip: "Number of individuals with homoplasmic or near-homoplasmic variant (heteroplasmy level \u2265 0.95)." }, variant.ac_hom),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Homoplasmic AF", tooltip: "Proportion of individuals with homoplasmic or near-homoplasmic variant (heteroplasmy level \u2265 0.95)." }, variant.an === 0 ? 0 : (variant.ac_hom / variant.an).toPrecision(4)),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Heteroplasmic AC", tooltip: "Number of individuals with a variant at heteroplasmy level 0.10 - 0.95." }, variant.ac_het),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Heteroplasmic AF", tooltip: "Proportion of individuals with a variant at heteroplasmy level 0.10 - 0.95." }, variant.an === 0 ? 0 : (variant.ac_het / variant.an).toPrecision(4)),
    variant.max_heteroplasmy && (react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Max Observed Heteroplasmy", tooltip: "Maximum heteroplasmy level observed across all individuals (range 0.10 - 1.00)." }, variant.max_heteroplasmy.toPrecision(4))),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Excluded Allele Count", tooltip: "Number of individuals with a variant filtered out due to failing one of the genotype-level filters (heteroplasmy below 10%, base quality, position, strand bias, weak evidence, and/or contamination)." }, variant.excluded_ac),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Haplogroup Defining", tooltip: "This variant is homoplasmic among individuals within at least one haplogroup listed in PhyloTree Build 17." }, variant.haplogroup_defining ? 'Yes' : 'No')));
exports.default = MitochondrialVariantAttributeList;
//# sourceMappingURL=MitochondrialVariantAttributeList.js.map