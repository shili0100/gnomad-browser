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
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const TranscriptReferences = ({ transcript }) => {
    const { transcript_id: transcriptId, reference_genome: referenceGenome, chrom, start, stop, } = transcript;
    const ensemblGeneUrl = `https://${referenceGenome === 'GRCh37' ? 'grch37.' : ''}ensembl.org/Homo_sapiens/Transcript/Summary?t=${transcriptId}`;
    const ucscReferenceGenomeId = referenceGenome === 'GRCh37' ? 'hg19' : 'hg38';
    const ucscUrl = `https://genome.ucsc.edu/cgi-bin/hgTracks?db=${ucscReferenceGenomeId}&position=chr${chrom}%3A${start}-${stop}`;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.ExternalLink, { href: ensemblGeneUrl }, "Ensembl"),
        ",",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: ucscUrl }, "UCSC Browser")));
};
const TranscriptInfo = ({ transcript }) => {
    const ucscReferenceGenomeId = transcript.reference_genome === 'GRCh37' ? 'hg19' : 'hg38';
    const isManeSelectTranscript = transcript.transcript_id === (transcript.gene.mane_select_transcript || {}).ensembl_id;
    const isCanonicalTranscript = transcript.transcript_id === transcript.gene.canonical_transcript_id;
    return (react_1.default.createElement(AttributeList_1.default, { style: { marginTop: '1.25em' } },
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Genome build" },
            transcript.reference_genome,
            " / ",
            ucscReferenceGenomeId),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Ensembl ID" },
            transcript.transcript_id,
            ".",
            transcript.transcript_version),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Gene" },
            react_1.default.createElement(Link_1.default, { to: `/gene/${transcript.gene.gene_id}` },
                transcript.gene.symbol,
                " (",
                transcript.gene.gene_id,
                ".",
                transcript.gene.gene_version,
                ")"),
            isManeSelectTranscript && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("br", null),
                "This transcript is",
                ' ',
                transcript.transcript_version !==
                    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                    transcript.gene.mane_select_transcript.ensembl_version && 'a version of ',
                "the MANE Select transcript for ",
                transcript.gene.symbol,
                ' ',
                react_1.default.createElement(InfoButton_1.default, { topic: "mane-select-transcript" }))),
            isCanonicalTranscript && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("br", null),
                "This transcript is ",
                isManeSelectTranscript && 'also ',
                "the Ensembl canonical transcript for ",
                transcript.gene.symbol,
                " ",
                react_1.default.createElement(InfoButton_1.default, { topic: "canonical-transcript" })))),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Region" },
            react_1.default.createElement(Link_1.default, { to: `/region/${transcript.chrom}-${transcript.start}-${transcript.stop}` },
                transcript.chrom,
                ":",
                transcript.start,
                "-",
                transcript.stop)),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "External resources" },
            react_1.default.createElement(TranscriptReferences, { transcript: transcript }))));
};
exports.default = TranscriptInfo;
//# sourceMappingURL=TranscriptInfo.js.map