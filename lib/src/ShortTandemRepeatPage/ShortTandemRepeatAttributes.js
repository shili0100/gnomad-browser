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
const AttributeList_1 = __importStar(require("../AttributeList"));
const InlineList_1 = __importDefault(require("../InlineList"));
const Link_1 = __importDefault(require("../Link"));
const ShortTandemRepeatRepeatUnits = ({ shortTandemRepeat }) => {
    const repeatUnitsByClassification = {};
    shortTandemRepeat.repeat_units.forEach((repeatUnit) => {
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (repeatUnitsByClassification[repeatUnit.classification] === undefined) {
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            repeatUnitsByClassification[repeatUnit.classification] = [];
        }
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        repeatUnitsByClassification[repeatUnit.classification].push(repeatUnit.repeat_unit);
    });
    if (!repeatUnitsByClassification.pathogenic &&
        !repeatUnitsByClassification.benign) {
        return (react_1.default.createElement(AttributeList_1.AttributeListItem, { label: `Repeat unit${repeatUnitsByClassification.unknown.length > 1 ? 's' : ''}` },
            react_1.default.createElement(InlineList_1.default, { items: repeatUnitsByClassification.unknown.map((repeatUnit) => (react_1.default.createElement("span", null, repeatUnit === shortTandemRepeat.reference_repeat_unit &&
                    shortTandemRepeat.repeat_units.length > 1
                    ? `${repeatUnit} (reference)`
                    : repeatUnit))), label: `Repeat unit${repeatUnitsByClassification.unknown.length > 1 ? 's' : ''}` })));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        repeatUnitsByClassification.pathogenic && (react_1.default.createElement(AttributeList_1.AttributeListItem, { label: `Pathogenic repeat unit${repeatUnitsByClassification.pathogenic.length > 1 ? 's' : ''}`, tooltip: "These repeat units have been reported in the literature as pathogenic when they expand beyond a certain threshold." },
            react_1.default.createElement(InlineList_1.default, { items: repeatUnitsByClassification.pathogenic.map((repeatUnit) => (react_1.default.createElement("span", null, repeatUnit === shortTandemRepeat.reference_repeat_unit &&
                    shortTandemRepeat.repeat_units.length > 1
                    ? `${repeatUnit} (reference)`
                    : repeatUnit))), label: `Pathogenic repeat unit${repeatUnitsByClassification.pathogenic.length > 1 ? 's' : ''}` }))),
        repeatUnitsByClassification.benign && (react_1.default.createElement(AttributeList_1.AttributeListItem, { label: `Benign repeat unit${repeatUnitsByClassification.benign.length > 1 ? 's' : ''}`, tooltip: "These repeat units are regarded in the literature as benign, even when expanded." },
            react_1.default.createElement(InlineList_1.default, { items: repeatUnitsByClassification.benign.map((repeatUnit) => (react_1.default.createElement("span", null, repeatUnit === shortTandemRepeat.reference_repeat_unit &&
                    shortTandemRepeat.repeat_units.length > 1
                    ? `${repeatUnit} (reference)`
                    : repeatUnit))), label: `Benign repeat unit${repeatUnitsByClassification.benign.length > 1 ? 's' : ''}` }))),
        repeatUnitsByClassification.unknown && (react_1.default.createElement(AttributeList_1.AttributeListItem, { label: `Other repeat unit${repeatUnitsByClassification.unknown.length > 1 ? 's' : ''}`, tooltip: "These are the other repeat units detected at this locus within gnomAD samples by the call_non_ref_pathogenic_motifs.py script." },
            react_1.default.createElement(InlineList_1.default, { items: repeatUnitsByClassification.unknown.map((repeatUnit) => (react_1.default.createElement("span", null, repeatUnit === shortTandemRepeat.reference_repeat_unit &&
                    shortTandemRepeat.repeat_units.length > 1
                    ? `${repeatUnit} (reference)`
                    : repeatUnit))), label: `Other repeat unit${repeatUnitsByClassification.unknown.length > 1 ? 's' : ''}` })))));
};
const ShortTandemRepeatAttributes = ({ shortTandemRepeat }) => {
    return (react_1.default.createElement(AttributeList_1.default, { style: { marginTop: '1.25em' } },
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Gene" },
            react_1.default.createElement(Link_1.default, { to: `/gene/${shortTandemRepeat.gene.ensembl_id}` }, shortTandemRepeat.gene.symbol)),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Gene region" }, shortTandemRepeat.gene.region),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Reference region" },
            react_1.default.createElement(Link_1.default, { to: `/region/${shortTandemRepeat.reference_region.chrom}-${shortTandemRepeat.reference_region.start}-${shortTandemRepeat.reference_region.stop}` },
                shortTandemRepeat.reference_region.chrom,
                "-",
                shortTandemRepeat.reference_region.start,
                "-",
                shortTandemRepeat.reference_region.stop)),
        react_1.default.createElement(ShortTandemRepeatRepeatUnits, { shortTandemRepeat: shortTandemRepeat })));
};
exports.default = ShortTandemRepeatAttributes;
//# sourceMappingURL=ShortTandemRepeatAttributes.js.map