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
const Link_1 = __importDefault(require("../Link"));
const copyNumberVariantTypes_1 = require("../CopyNumberVariantList/copyNumberVariantTypes");
const missingContent_1 = require("../missingContent");
const FILTER_LABELS = {
    TRUE: 'TRUE',
};
const FILTER_DESCRIPTIONS = {
    TRUE: 'true',
};
const filterLabel = (filter) => (0, missingContent_1.textOrMissingTextWarning)('filter label', FILTER_LABELS, filter);
const filterDescription = (filter) => (0, missingContent_1.textOrMissingTextWarning)('filter description', FILTER_DESCRIPTIONS, filter);
const CopyNumberVariantAttributeList = ({ variant }) => (react_1.default.createElement(AttributeList_1.default, { style: { marginTop: '1.25em' } },
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Filter" }, variant.filters.length > 0 ? (variant.filters.map((filter) => (react_1.default.createElement(ui_1.Badge, { key: filter, level: "warning", tooltip: filterDescription(filter) }, filterLabel(filter))))) : (react_1.default.createElement(ui_1.Badge, { level: "success" }, "Pass"))),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Site Count" }, variant.sc),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Site Number" }, variant.sn),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Site Frequency" }, (variant.sn === 0 ? 0 : variant.sc / variant.sn).toPrecision(4)),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Position" },
        react_1.default.createElement(Link_1.default, { to: `/region/${variant.chrom}-${variant.pos}-${variant.end}` },
            variant.chrom,
            ":",
            variant.pos,
            "-",
            variant.end)),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Size" }, variant.length === -1 ? '—' : `${variant.length.toLocaleString()} bp`),
    react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Class" }, copyNumberVariantTypes_1.cnvTypeLabels[variant.type])));
exports.default = CopyNumberVariantAttributeList;
//# sourceMappingURL=CopyNumberVariantAttributeList.js.map