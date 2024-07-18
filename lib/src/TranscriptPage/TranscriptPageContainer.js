"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const metadata_1 = require("../../dataset-metadata/metadata");
const Query_1 = __importDefault(require("../Query"));
const TranscriptPage_1 = __importDefault(require("./TranscriptPage"));
const operationName = 'Transcript';
const query = `
query ${operationName}($transcriptId: String!, $referenceGenome: ReferenceGenomeId!) {
  transcript(transcript_id: $transcriptId, reference_genome: $referenceGenome) {
    reference_genome
    transcript_id
    transcript_version
    chrom
    strand
    start
    stop
    exons {
      feature_type
      start
      stop
    }
    gnomad_constraint {
      exp_lof
      exp_mis
      exp_syn
      obs_lof
      obs_mis
      obs_syn
      oe_lof
      oe_lof_lower
      oe_lof_upper
      oe_mis
      oe_mis_lower
      oe_mis_upper
      oe_syn
      oe_syn_lower
      oe_syn_upper
      lof_z
      mis_z
      syn_z
      pLI
      flags
    }
    exac_constraint {
      exp_syn
      obs_syn
      syn_z
      exp_mis
      obs_mis
      mis_z
      exp_lof
      obs_lof
      lof_z
      pLI
    }
    gene {
      gene_id
      gene_version
      reference_genome
      symbol
      name
      canonical_transcript_id
      mane_select_transcript {
        ensembl_id
        ensembl_version
        refseq_id
        refseq_version
      }
      hgnc_id
      omim_id
      chrom
      start
      stop
      strand
      exons {
        feature_type
        start
        stop
      }
      flags
    }
  }
}
`;
const TranscriptPageContainer = ({ datasetId, transcriptId }) => (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: { transcriptId, referenceGenome: (0, metadata_1.referenceGenome)(datasetId) }, loadingMessage: "Loading transcript", errorMessage: "Unable to load transcript", success: (data) => data.transcript }, ({ data }) => {
    const { transcript } = data;
    // Cannot query structural variants by transcript, redirect to gene page
    if ((0, metadata_1.hasStructuralVariants)(datasetId)) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: `/gene/${transcript.gene.gene_id}?dataset=${datasetId}` });
    }
    return react_1.default.createElement(TranscriptPage_1.default, { datasetId: datasetId, transcript: transcript });
}));
exports.default = TranscriptPageContainer;
//# sourceMappingURL=TranscriptPageContainer.js.map