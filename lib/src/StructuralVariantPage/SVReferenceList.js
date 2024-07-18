"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVReferenceList = void 0;
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const SVUCSCLinks = ({ variant, datasetId }) => {
    const ucscReferenceGenomeId = (0, metadata_1.usesGrch37)(datasetId) ? 'hg19' : 'hg38';
    const ucscUrl = (chrom, pos, end) => `https://genome.ucsc.edu/cgi-bin/hgTracks?db=${ucscReferenceGenomeId}&position=chr${chrom}%3A${pos}-${end}`;
    if (variant.type === 'INS') {
        return (
        // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
        react_1.default.createElement(ui_1.ExternalLink, { href: ucscUrl(variant.chrom, Math.max(variant.pos - 5000, 0), variant.pos + 5000) }, "UCSC"));
    }
    if (variant.type === 'BND' || variant.type === 'CTX') {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            "UCSC",
            ' ',
            react_1.default.createElement(ui_1.ExternalLink, { href: ucscUrl(variant.chrom, Math.max(variant.pos - 5000, 0), variant.pos + 5000) }, "position"),
            ",",
            ' ',
            react_1.default.createElement(ui_1.ExternalLink
            // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
            , { 
                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                href: ucscUrl(variant.chrom2, Math.max(variant.pos2 - 5000, 0), variant.pos2 + 5000) }, "second position")));
    }
    // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
    return react_1.default.createElement(ui_1.ExternalLink, { href: ucscUrl(variant.chrom, variant.pos, variant.end) }, "UCSC");
};
const SVReferenceList = ({ variant, datasetId }) => (
// @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
react_1.default.createElement(ui_1.List, null,
    react_1.default.createElement(ui_1.ListItem, null,
        react_1.default.createElement(SVUCSCLinks, { variant: variant, datasetId: datasetId }))));
exports.SVReferenceList = SVReferenceList;
exports.default = exports.SVReferenceList;
//# sourceMappingURL=SVReferenceList.js.map