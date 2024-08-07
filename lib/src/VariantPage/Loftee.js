"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LofteeFlag = exports.LofteeFilter = void 0;
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const lofteeFilterDescriptions = {
    END_TRUNC: 'The LoF variant falls in the last filter_position of the transcript (default = 0.05).',
    INCOMPLETE_CDS: 'The LoF falls in a transcript whose start or stop codons are not known.',
    EXON_INTRON_UNDEF: 'The LoF falls in a transcript whose exon/intron boundaries are undefined in the EnsEMBL API.',
    SMALL_INTRON: 'The LoF falls in a splice site of a small (biologically unlikely; default < 15 bp) intron.',
    ANC_ALLELE: 'The alternate allele of the LoF reverts the sequence back to the ancestral state.',
    NON_DONOR_DISRUPTING: 'An essential splice donor variant’s DISRUPTION_PROB fails to exceed the donor_disruption_cutoff.',
    NON_ACCEPTOR_DISRUPTING: 'An essential splice acceptor variant’s DISRUPTION_PROB fails to exceed the acceptor_disruption_cutoff.',
    RESCUE_DONOR: 'A splice donor-disrupting variant (either essential or extended with sufficient DONOR_DISRUPTION_PROB) is rescued by an alternative splice site (less than max_scan_distance bp away) with an MES score above donor_rescue_cutoff.\nThe variant in question, which was formerly determined to disrupt an existing splice site, gets downgraded to an LC LoF.',
    RESCUE_ACCEPTOR: 'A splice acceptor-disrupting variant (either essential or extended with sufficient ACCEPTOR_DISRUPTION_PROB) is rescued by an alternative splice site (less than max_scan_distance bp away) with an MES score above acceptor_rescue_cutoff.\nThe variant in question, which was formerly determined to disrupt an existing splice site, gets downgraded to an LC LoF.',
    GC_TO_GT_DONOR: 'Essential donor splice variant creates a more canonical splice site (strengthening the site if anything, thus unlikely to disrupt splicing).',
    '5UTR_SPLICE': 'Essential splice variant LoF occurs in the UTR of the transcript.',
    '3UTR_SPLICE': 'Essential splice variant LoF occurs in the UTR of the transcript.',
};
const LofteeFilter = ({ filter }) => {
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!lofteeFilterDescriptions[filter]) {
        return react_1.default.createElement("span", null, filter);
    }
    return (
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: any; }' is not... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: lofteeFilterDescriptions[filter] },
        react_1.default.createElement(ui_1.TooltipHint, null, filter)));
};
exports.LofteeFilter = LofteeFilter;
const lofteeFlagDescriptions = {
    SINGLE_EXON: 'The LoF falls in a single exon transcript.',
    NAGNAG_SITE: 'The LoF is a splice variant that falls into a NAGNAG sequence, which may indicate a frame-restoring splice site.',
    PHYLOCSF_WEAK: 'The LoF falls in an exon that does not exhibit a pattern of conservation typical of a protein-coding exon.',
    PHYLOCSF_UNLIKELY_ORF: 'The LoF falls in an exon that exhibits a pattern of conservation typical of a protein-coding exon, but the reading frame is likely offset.',
    NON_CAN_SPLICE: 'The LoF is a splice variant that falls in a non-canonical splice site (not GT..AG).',
};
const LofteeFlag = ({ flag }) => {
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!lofteeFlagDescriptions[flag]) {
        return react_1.default.createElement("span", null, flag);
    }
    return (
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: any; }' is not... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: lofteeFlagDescriptions[flag] },
        react_1.default.createElement(ui_1.TooltipHint, null, flag)));
};
exports.LofteeFlag = LofteeFlag;
//# sourceMappingURL=Loftee.js.map