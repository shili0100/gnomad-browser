"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const ReferenceList_1 = require("../VariantPage/ReferenceList");
const MitochondrialVariantReferenceList = ({ variant }) => {
    const { pos, ref, alt } = variant;
    const ucscURL = `https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&highlight=hg38.chrM%3A${pos}-${pos + (ref.length - 1)}&position=chrM%3A${pos - 25}-${pos + (ref.length - 1) + 25}`;
    const mitomapURL = `https://mitomap.org/cgi-bin/search_allele?variant=${encodeURIComponent(`${pos}${ref}>${alt}`)}`;
    const mseqdrURL = `https://mseqdr.org/variant.php?variant=M-${pos}-${ref}-${alt}&dataset=gnomad_r3`;
    return (
    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.List, null,
        variant.rsids && (0, ReferenceList_1.NcbiReference)(variant.rsids),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: ucscURL }, "UCSC")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: mitomapURL }, "Mitomap")),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: mseqdrURL }, "MSeqDR")),
        (variant.transcript_consequences || []).some((csq) => csq.gene_symbol.startsWith('MT-T') || csq.gene_symbol.startsWith('MT-R')) && (
        // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: `https://www.mitovisualize.org/variant/${variant.variant_id}` }, "MitoVisualize"))),
        variant.clinvar && (0, ReferenceList_1.ClinvarReference)(variant.clinvar.clinvar_variation_id)));
};
exports.default = MitochondrialVariantReferenceList;
//# sourceMappingURL=MitochondrialVariantReferenceList.js.map