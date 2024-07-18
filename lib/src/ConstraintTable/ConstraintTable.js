"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const metadata_1 = require("../../dataset-metadata/metadata");
const Link_1 = __importDefault(require("../Link"));
const ExacConstraintTable_1 = __importDefault(require("./ExacConstraintTable"));
const GnomadConstraintTable_1 = __importDefault(require("./GnomadConstraintTable"));
const isGene = (geneOrTranscript) => geneOrTranscript.transcript_id === undefined;
const transcriptDetails = (geneOrTranscript) => {
    let transcriptId;
    let transcriptVersion;
    let transcriptDescription = null;
    if (isGene(geneOrTranscript)) {
        if (geneOrTranscript.mane_select_transcript) {
            const maneSelectTranscript = geneOrTranscript.mane_select_transcript;
            transcriptId = maneSelectTranscript.ensembl_id;
            const matchingTranscript = geneOrTranscript.transcripts.find((transcript) => transcript.transcript_id === maneSelectTranscript.ensembl_id);
            transcriptVersion = matchingTranscript.transcript_version;
            transcriptDescription =
                transcriptVersion === maneSelectTranscript.ensembl_version
                    ? 'MANE Select'
                    : 'a version of MANE Select';
        }
        else {
            transcriptId = geneOrTranscript.canonical_transcript_id;
            const canonicalTranscript = transcriptId
                ? geneOrTranscript.transcripts.find((transcript) => transcript.transcript_id === transcriptId)
                : null;
            transcriptVersion = canonicalTranscript ? canonicalTranscript.transcript_version : null;
            transcriptDescription = 'Ensembl canonical';
        }
    }
    else {
        transcriptId = geneOrTranscript.transcript_id;
        transcriptVersion = geneOrTranscript.transcript_version;
    }
    return { transcriptId, transcriptVersion, transcriptDescription };
};
const ConstraintTable = ({ datasetId, geneOrTranscript }) => {
    if (!(0, metadata_1.hasConstraints)(datasetId)) {
        return react_1.default.createElement("p", null,
            "Constraint not yet available for ",
            (0, metadata_1.labelForDataset)(datasetId),
            ".");
    }
    const { transcriptId, transcriptVersion, transcriptDescription } = transcriptDetails(geneOrTranscript);
    const gnomadConstraint = geneOrTranscript.gnomad_constraint;
    const exacConstraint = geneOrTranscript.exac_constraint;
    if (geneOrTranscript.chrom === 'M') {
        return (react_1.default.createElement("p", null,
            "Constraint is not available for mitochondrial",
            ' ',
            isGene(geneOrTranscript) ? 'genes' : 'transcripts'));
    }
    if (datasetId === 'exac') {
        if (!exacConstraint) {
            return (react_1.default.createElement("p", null,
                "Constraint not available for this ",
                isGene(geneOrTranscript) ? 'gene' : 'transcript'));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ExacConstraintTable_1.default, { constraint: exacConstraint }),
            isGene(geneOrTranscript) && (react_1.default.createElement("p", null,
                "Constraint metrics based on ",
                transcriptDescription,
                " transcript (",
                react_1.default.createElement(Link_1.default, { to: `/transcript/${transcriptId}` },
                    transcriptId,
                    ".",
                    transcriptVersion),
                ")."))));
    }
    if (!gnomadConstraint) {
        return (react_1.default.createElement("p", null,
            "Constraint not available for this ",
            isGene(geneOrTranscript) ? 'gene' : 'transcript'));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        ['controls', 'non_neuro', 'non_cancer', 'non_topmed'].some((subset) => datasetId.includes(subset)) && react_1.default.createElement("p", null, "Constraint is based on the full gnomAD dataset, not the selected subset."),
        react_1.default.createElement(GnomadConstraintTable_1.default, { constraint: gnomadConstraint }),
        isGene(geneOrTranscript) && (react_1.default.createElement("p", { style: { marginBottom: 0 } },
            "Constraint metrics based on ",
            transcriptDescription,
            " transcript (",
            react_1.default.createElement(Link_1.default, { to: `/transcript/${transcriptId}` },
                transcriptId,
                ".",
                transcriptVersion),
            ")."))));
};
exports.default = ConstraintTable;
//# sourceMappingURL=ConstraintTable.js.map