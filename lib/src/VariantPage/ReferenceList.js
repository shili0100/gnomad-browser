"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceList = exports.ClinvarReference = exports.NcbiReference = void 0;
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const NcbiReference = (variantRsids) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        variantRsids.length === 1 && (
        // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: `http://www.ncbi.nlm.nih.gov/snp/${variantRsids[0]}` },
                "dbSNP (",
                variantRsids[0],
                ")"))),
        variantRsids.length > 1 && (
        // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.ListItem, null,
            "dbSNP (",
            ' ',
            variantRsids
                .map((rsid) => (
            // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
            react_1.default.createElement(ui_1.ExternalLink, { key: rsid, href: `https://www.ncbi.nlm.nih.gov/snp/${rsid}` }, rsid)))
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                .reduce((acc, el) => [...acc, ', ', el], []).slice(1),
            ")"))));
};
exports.NcbiReference = NcbiReference;
const ClinvarReference = (variantClinvarVariationId) => {
    return (
    // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.ListItem, null,
        react_1.default.createElement(ui_1.ExternalLink, { href: `https://www.ncbi.nlm.nih.gov/clinvar/variation/${variantClinvarVariationId}/` },
            "ClinVar (",
            variantClinvarVariationId,
            ")")));
};
exports.ClinvarReference = ClinvarReference;
const ReferenceList = ({ variant }) => {
    const ucscReferenceGenomeId = variant.reference_genome === 'GRCh37' ? 'hg19' : 'hg38';
    const { chrom, pos, ref } = variant;
    const ucscURL = `https://genome.ucsc.edu/cgi-bin/hgTracks?db=${ucscReferenceGenomeId}&highlight=${ucscReferenceGenomeId}.chr${chrom}%3A${pos}-${pos + (ref.length - 1)}&position=chr${chrom}%3A${pos - 25}-${pos + (ref.length - 1) + 25}`;
    const allOfUsURL = `https://databrowser.researchallofus.org/variants/${variant.variant_id}`;
    return (
    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.List, null,
        variant.rsids && (0, exports.NcbiReference)(variant.rsids),
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: ucscURL }, "UCSC")),
        variant.clinvar && (0, exports.ClinvarReference)(variant.clinvar.clinvar_variation_id),
        variant.caid && (
        // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: `https://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_canonicalid?canonicalid=${variant.caid}` },
                "ClinGen Allele Registry (",
                variant.caid,
                ")"))),
        variant.reference_genome === 'GRCh38' && (
        // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.ListItem, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: allOfUsURL }, "All of Us")))));
};
exports.ReferenceList = ReferenceList;
//# sourceMappingURL=ReferenceList.js.map