"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const ucscUrl = (chrom, pos, end) => `https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&position=chr${chrom}%3A${pos}-${end}`;
const CNVUCSCLinks = ({ variant }) => {
    // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
    return react_1.default.createElement(ui_1.ExternalLink, { href: ucscUrl(variant.chrom, variant.pos, variant.end) }, "UCSC");
};
const CNVReferenceList = ({ variant }) => (
// @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
react_1.default.createElement(ui_1.List, null,
    react_1.default.createElement(ui_1.ListItem, null,
        react_1.default.createElement(CNVUCSCLinks, { variant: variant }))));
exports.default = CNVReferenceList;
//# sourceMappingURL=CNVReferenceList.js.map