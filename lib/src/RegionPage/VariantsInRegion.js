"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const metadata_1 = require("../../dataset-metadata/metadata");
const ClinvarVariantTrack_1 = __importDefault(require("../ClinvarVariantsTrack/ClinvarVariantTrack"));
const formatClinvarDate_1 = __importDefault(require("../ClinvarVariantsTrack/formatClinvarDate"));
const Query_1 = __importDefault(require("../Query"));
const filterVariantsInZoomRegion_1 = __importDefault(require("../RegionViewer/filterVariantsInZoomRegion"));
const TrackPage_1 = require("../TrackPage");
const annotateVariantsWithClinvar_1 = __importDefault(require("../VariantList/annotateVariantsWithClinvar"));
const Variants_1 = __importDefault(require("../VariantList/Variants"));
// @ts-expect-error TS(7022) FIXME: 'VariantsInRegion' implicitly has type 'any' becau... Remove this comment to see the full error message
const VariantsInRegion = ({ clinvarReleaseDate, clinvarVariants, datasetId, region, variants, zoomRegion, }) => {
    const datasetLabel = (0, metadata_1.labelForDataset)(datasetId);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement("h2", null, "ClinVar variants")),
        clinvarVariants.length > 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ClinvarVariantTrack_1.default, { referenceGenome: (0, metadata_1.referenceGenome)(datasetId), transcripts: region.genes.flatMap((gene) => gene.transcripts), variants: (0, filterVariantsInZoomRegion_1.default)(clinvarVariants, zoomRegion) }),
            react_1.default.createElement(TrackPage_1.TrackPageSection, { as: "p" },
                "Data displayed here is from ClinVar's ",
                (0, formatClinvarDate_1.default)(clinvarReleaseDate),
                ' ',
                "release."))) : (react_1.default.createElement(TrackPage_1.TrackPageSection, { as: "p" }, "No ClinVar variants found in this region.")),
        react_1.default.createElement(Variants_1.default, { clinvarReleaseDate: clinvarReleaseDate, context: region, datasetId: datasetId, exportFileName: `${datasetLabel}_${region.chrom}-${region.start}-${region.stop}`, variants: (0, filterVariantsInZoomRegion_1.default)(variants, zoomRegion) })));
};
VariantsInRegion.defaultProps = {
    clinvarVariants: null,
    zoomRegion: null,
};
const operationName = 'VariantInRegion';
const query = `
query ${operationName}($chrom: String!, $start: Int!, $stop: Int!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!) {
  meta {
    clinvar_release_date
  }
  region(start: $start, stop: $stop, chrom: $chrom, reference_genome: $referenceGenome) {
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
      gene_id
      gene_symbol
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
const ConnectedVariantsInRegion = ({ datasetId, region }) => (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: {
        datasetId,
        chrom: region.chrom,
        start: region.start,
        stop: region.stop,
        referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
    }, loadingMessage: "Loading variants", errorMessage: "Unable to load variants", success: (data) => data.region && data.region.variants }, ({ data }) => {
    return (react_1.default.createElement(VariantsInRegion, { clinvarReleaseDate: data.meta.clinvar_release_date, clinvarVariants: data.region.clinvar_variants, datasetId: datasetId, region: region, variants: (0, annotateVariantsWithClinvar_1.default)(data.region.variants, data.region.clinvar_variants) }));
}));
exports.default = ConnectedVariantsInRegion;
//# sourceMappingURL=VariantsInRegion.js.map