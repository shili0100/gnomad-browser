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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const Link_1 = __importDefault(require("../Link"));
const Query_1 = __importDefault(require("../Query"));
const filterVariantsInZoomRegion_1 = __importDefault(require("../RegionViewer/filterVariantsInZoomRegion"));
const annotateVariantsWithClinvar_1 = __importDefault(require("../VariantList/annotateVariantsWithClinvar"));
const Variants_1 = __importDefault(require("../VariantList/Variants"));
const TranscriptsModal = ({ gene, onRequestClose }) => (react_1.default.createElement(ui_1.Modal
// @ts-expect-error TS(2322) FIXME: Type '{ children: Element; initialFocusOnButton: b... Remove this comment to see the full error message
, { 
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; initialFocusOnButton: b... Remove this comment to see the full error message
    initialFocusOnButton: false, title: `${gene.symbol} transcripts`, onRequestClose: onRequestClose },
    react_1.default.createElement(ui_1.List, null, gene.transcripts.map((transcript) => (
    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
    react_1.default.createElement(ui_1.ListItem, { key: transcript.transcript_id },
        react_1.default.createElement(Link_1.default, { to: `/transcript/${transcript.transcript_id}` },
            transcript.transcript_id,
            ".",
            transcript.transcript_version)))))));
// @ts-expect-error TS(7022) FIXME: 'VariantsInGene' implicitly has type 'any' because... Remove this comment to see the full error message
const VariantsInGene = ({ clinvarReleaseDate, clinvarVariants, datasetId, gene, includeNonCodingTranscripts, includeUTRs, variants, zoomRegion, }) => {
    const datasetLabel = (0, metadata_1.labelForDataset)(datasetId);
    const [isTranscriptsModalOpen, setIsTranscriptsModalOpen] = (0, react_1.useState)(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Variants_1.default, { clinvarReleaseDate: clinvarReleaseDate, context: gene, datasetId: datasetId, exportFileName: `${datasetLabel}_${gene.gene_id}`, variants: (0, filterVariantsInZoomRegion_1.default)(variants, zoomRegion) },
            react_1.default.createElement("p", null,
                react_1.default.createElement(ui_1.Badge, { level: includeNonCodingTranscripts || includeUTRs ? 'warning' : 'info' }, includeNonCodingTranscripts || includeUTRs ? 'Warning' : 'Note'),
                ' ',
                "Only variants located in or within 75 base pairs of a coding exon are shown here. To see variants in UTRs or introns, use the",
                ' ',
                react_1.default.createElement(Link_1.default, { to: `/region/${gene.chrom}-${gene.start}-${gene.stop}` }, "region view"),
                "."),
            react_1.default.createElement("p", null,
                "The table below shows the HGVS consequence and VEP annotation for each variant's most severe consequence across all transcripts in this gene. Cases where the most severe consequence occurs in a",
                ' ',
                gene.reference_genome === 'GRCh37'
                    ? 'non-canonical transcript'
                    : 'non-MANE Select transcript (or non-canonical transcript if no MANE Select transcript exists)',
                ' ',
                "are denoted with \u2020. To see consequences in a specific transcript, use the",
                ' ',
                react_1.default.createElement(ui_1.TextButton, { onClick: () => {
                        setIsTranscriptsModalOpen(true);
                    } }, "transcript view"),
                "."),
            isTranscriptsModalOpen && (react_1.default.createElement(TranscriptsModal, { gene: gene, onRequestClose: () => {
                    setIsTranscriptsModalOpen(false);
                } })))));
};
VariantsInGene.defaultProps = {
    clinvarVariants: null,
    zoomRegion: null,
};
const operationName = 'VariantsInGene';
const query = `
query ${operationName}($geneId: String!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!) {
  meta {
    clinvar_release_date
  }
  gene(gene_id: $geneId, reference_genome: $referenceGenome) {
    clinvar_variants {
      clinical_significance
      clinvar_variation_id
      gnomad {
        exome {
          ac
          an
          filters
        }
        genome {
          ac
          an
          filters
        }
      }
      gold_stars
      hgvsc
      hgvsp
      in_gnomad
      major_consequence
      pos
      review_status
      transcript_id
      variant_id
    }
    variants(dataset: $datasetId) {
      consequence
      flags
      hgvs
      hgvsc
      hgvsp
      lof
      lof_filter
      lof_flags
      pos
      rsids
      transcript_id
      transcript_version
      variant_id
      faf95_joint {
        popmax
        popmax_population
      }
      exome {
        ac
        ac_hemi
        ac_hom
        faf95 {
          popmax
          popmax_population
        }
        an
        af
        filters
        populations {
          id
          ac
          an
          ac_hemi
          ac_hom
        }
        fafmax {
          faf95_max
          faf95_max_gen_anc
          faf99_max
          faf99_max_gen_anc
        }
      }
      genome {
        ac
        ac_hemi
        ac_hom
        faf95 {
          popmax
          popmax_population
        }
        an
        af
        filters
        populations {
          id
          ac
          an
          ac_hemi
          ac_hom
        }
      }
      joint {
        ac
        hemizygote_count
        homozygote_count
        fafmax {
          faf95_max
          faf95_max_gen_anc
          faf99_max
          faf99_max_gen_anc
        }
        an
        filters
        populations {
          id
          ac
          an
          homozygote_count
          hemizygote_count
        }
      }
      in_silico_predictors {
        id
        value
        flags
      }
      lof_curation {
        verdict
        flags
      }
    }
  }
}`;
const annotateVariantsWithPext = (variants, pext) => {
    const pextRegions = [...pext.regions];
    let currentPextRegion = pextRegions.shift();
    return variants.map((variant) => {
        while (pextRegions.length && variant.pos > currentPextRegion.stop) {
            currentPextRegion = pextRegions.shift();
        }
        if (currentPextRegion !== undefined &&
            currentPextRegion.start <= variant.pos &&
            variant.pos <= currentPextRegion.stop) {
            return Object.assign(Object.assign({}, variant), { base_level_pext: currentPextRegion.mean });
        }
        return variant;
    });
};
const ConnectedVariantsInGene = (_a) => {
    var { datasetId, gene } = _a, otherProps = __rest(_a, ["datasetId", "gene"]);
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: {
            datasetId,
            geneId: gene.gene_id,
            referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
        }, loadingMessage: "Loading variants", errorMessage: "Unable to load variants", success: (data) => data.gene && data.gene.variants }, ({ data }) => {
        let variants = (0, annotateVariantsWithClinvar_1.default)(data.gene.variants, data.gene.clinvar_variants);
        if (gene.pext) {
            variants = annotateVariantsWithPext(variants, gene.pext);
        }
        return (react_1.default.createElement(VariantsInGene, Object.assign({}, otherProps, { clinvarReleaseDate: data.meta.clinvar_release_date, clinvarVariants: data.gene.clinvar_variants, datasetId: datasetId, gene: gene, variants: variants })));
    }));
};
exports.default = ConnectedVariantsInGene;
//# sourceMappingURL=VariantsInGene.js.map