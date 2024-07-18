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
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const InlineList_1 = __importDefault(require("../InlineList"));
const Link_1 = __importDefault(require("../Link"));
const GeneReferences_1 = __importDefault(require("./GeneReferences"));
const ManeSelectTranscriptId = ({ gene }) => {
    const gencodeVersionOfManeSelectTransript = gene.transcripts.find((transcript) => transcript.transcript_id === gene.mane_select_transcript.ensembl_id);
    const shouldLinkToTranscriptPage = gencodeVersionOfManeSelectTransript &&
        gencodeVersionOfManeSelectTransript.transcript_version ===
            gene.mane_select_transcript.ensembl_version;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        shouldLinkToTranscriptPage ? (react_1.default.createElement(Link_1.default, { to: `/transcript/${gene.mane_select_transcript.ensembl_id}` },
            gene.mane_select_transcript.ensembl_id,
            ".",
            gene.mane_select_transcript.ensembl_version)) : (`${gene.mane_select_transcript.ensembl_id}.${gene.mane_select_transcript.ensembl_version}`),
        ' ',
        "/ ",
        gene.mane_select_transcript.refseq_id,
        ".",
        gene.mane_select_transcript.refseq_version));
};
const GeneInfo = ({ gene }) => {
    const canonicalTranscript = gene.canonical_transcript_id
        ? gene.transcripts.find((transcript) => transcript.transcript_id === gene.canonical_transcript_id)
        : null;
    const ucscReferenceGenomeId = gene.reference_genome === 'GRCh37' ? 'hg19' : 'hg38';
    const gencodeVersion = gene.reference_genome === 'GRCh37' ? '19' : '35';
    const otherTranscripts = gene.transcripts.filter((transcript) => transcript.transcript_id !== (canonicalTranscript || {}).transcript_id &&
        transcript.transcript_id !== (gene.mane_select_transcript || {}).ensembl_id);
    return (react_1.default.createElement(AttributeList_1.default, { style: { marginTop: '1.25em' } },
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Genome build" },
            gene.reference_genome,
            " / ",
            ucscReferenceGenomeId),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Ensembl gene ID" },
            gene.gene_id,
            ".",
            gene.gene_version),
        gene.symbol !== gene.gencode_symbol && (react_1.default.createElement(AttributeList_1.AttributeListItem, { label: `Symbol in GENCODE v${gencodeVersion}` }, gene.gencode_symbol)),
        gene.reference_genome === 'GRCh38' && (react_1.default.createElement(AttributeList_1.AttributeListItem, { label: react_1.default.createElement(react_1.default.Fragment, null,
                "MANE Select transcript ",
                react_1.default.createElement(InfoButton_1.default, { topic: "mane-select-transcript" })) }, gene.mane_select_transcript ? react_1.default.createElement(ManeSelectTranscriptId, { gene: gene }) : 'Not available')),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: react_1.default.createElement(react_1.default.Fragment, null,
                "Ensembl canonical transcript ",
                react_1.default.createElement(InfoButton_1.default, { topic: "canonical-transcript" })) }, canonicalTranscript ? (react_1.default.createElement(Link_1.default, { to: `/transcript/${canonicalTranscript.transcript_id}` },
            canonicalTranscript.transcript_id,
            ".",
            canonicalTranscript.transcript_version)) : ('Not available')),
        otherTranscripts.length > 0 && (react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Other transcripts" },
            react_1.default.createElement(InlineList_1.default, { items: otherTranscripts.map((transcript) => (react_1.default.createElement(Link_1.default, { to: `/transcript/${transcript.transcript_id}` },
                    transcript.transcript_id,
                    ".",
                    transcript.transcript_version))), label: "Other transcripts" }))),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Region" },
            react_1.default.createElement(Link_1.default, { to: `/region/${gene.chrom}-${gene.start}-${gene.stop}` },
                gene.chrom,
                ":",
                gene.start,
                "-",
                gene.stop)),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "External resources" },
            react_1.default.createElement(GeneReferences_1.default, { gene: gene }))));
};
exports.default = GeneInfo;
//# sourceMappingURL=GeneInfo.js.map