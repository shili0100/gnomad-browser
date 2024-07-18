"use strict";
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
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const ClinvarVariantTrack_1 = __importDefault(require("../ClinvarVariantsTrack/ClinvarVariantTrack"));
const formatClinvarDate_1 = __importDefault(require("../ClinvarVariantsTrack/formatClinvarDate"));
const Link_1 = __importDefault(require("../Link"));
const Query_1 = __importDefault(require("../Query"));
const filterVariantsInZoomRegion_1 = __importDefault(require("../RegionViewer/filterVariantsInZoomRegion"));
const TrackPage_1 = require("../TrackPage");
const annotateVariantsWithClinvar_1 = __importDefault(require("../VariantList/annotateVariantsWithClinvar"));
const Variants_1 = __importDefault(require("../VariantList/Variants"));
// @ts-expect-error TS(7022) FIXME: 'VariantsInTranscript' implicitly has type 'any' b... Remove this comment to see the full error message
const VariantsInTranscript = ({ clinvarReleaseDate, clinvarVariants, datasetId, includeUTRs, transcript, variants, zoomRegion, }) => {
    const isCodingTranscript = transcript.exons.some((exon) => exon.feature_type === 'CDS');
    const datasetLabel = (0, metadata_1.labelForDataset)(datasetId);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement("h2", null, "ClinVar variants")),
        clinvarVariants.length > 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ClinvarVariantTrack_1.default, { referenceGenome: (0, metadata_1.referenceGenome)(datasetId), transcripts: [transcript], variants: (0, filterVariantsInZoomRegion_1.default)(clinvarVariants, zoomRegion) }),
            react_1.default.createElement(TrackPage_1.TrackPageSection, { as: "p" },
                "Data displayed here is from ClinVar's ",
                (0, formatClinvarDate_1.default)(clinvarReleaseDate),
                ' ',
                "release."))) : (react_1.default.createElement(TrackPage_1.TrackPageSection, { as: "p" }, "No ClinVar variants found in this transcript.")),
        react_1.default.createElement(Variants_1.default, { clinvarReleaseDate: clinvarReleaseDate, context: transcript, datasetId: datasetId, exportFileName: `${datasetLabel}_${transcript.transcript_id}`, variants: (0, filterVariantsInZoomRegion_1.default)(variants, zoomRegion) }, isCodingTranscript ? (react_1.default.createElement("p", null,
            react_1.default.createElement(ui_1.Badge, { level: includeUTRs ? 'warning' : 'info' }, includeUTRs ? 'Warning' : 'Note'),
            ' ',
            "Only variants located in or within 75 base pairs of a coding exon are shown here. To see variants in UTRs or introns, use the",
            ' ',
            react_1.default.createElement(Link_1.default, { to: `/region/${transcript.chrom}-${transcript.start}-${transcript.stop}` }, "region view"),
            ".")) : (react_1.default.createElement("p", null,
            react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
            " Only variants located in or within 75 base pairs of an exon are shown here. To see variants in introns, use the",
            ' ',
            react_1.default.createElement(Link_1.default, { to: `/region/${transcript.chrom}-${transcript.start}-${transcript.stop}` }, "region view"),
            ".")))));
};
VariantsInTranscript.defaultProps = {
    clinvarVariants: null,
    zoomRegion: null,
};
const operationName = 'VariantsInTranscript';
const query = `
query ${operationName}($transcriptId: String!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!) {
  meta {
    clinvar_release_date
  }
  transcript(transcript_id: $transcriptId, reference_genome: $referenceGenome) {
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
const ConnectedVariantsInTranscript = (_a) => {
    var { datasetId, transcript } = _a, otherProps = __rest(_a, ["datasetId", "transcript"]);
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: {
            datasetId,
            transcriptId: transcript.transcript_id,
            referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
        }, loadingMessage: "Loading variants", errorMessage: "Unable to load variants", success: (data) => data.transcript && data.transcript.variants }, ({ data }) => {
        return (react_1.default.createElement(VariantsInTranscript, Object.assign({}, otherProps, { clinvarReleaseDate: data.meta.clinvar_release_date, clinvarVariants: data.transcript.clinvar_variants, datasetId: datasetId, transcript: transcript, variants: (0, annotateVariantsWithClinvar_1.default)(data.transcript.variants, data.transcript.clinvar_variants) })));
    }));
};
exports.default = ConnectedVariantsInTranscript;
//# sourceMappingURL=VariantsInTranscript.js.map