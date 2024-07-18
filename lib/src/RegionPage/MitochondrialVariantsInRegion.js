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
const metadata_1 = require("../../dataset-metadata/metadata");
const ClinvarVariantTrack_1 = __importDefault(require("../ClinvarVariantsTrack/ClinvarVariantTrack"));
const formatClinvarDate_1 = __importDefault(require("../ClinvarVariantsTrack/formatClinvarDate"));
const Link_1 = __importDefault(require("../Link"));
const Query_1 = __importDefault(require("../Query"));
const filterVariantsInZoomRegion_1 = __importDefault(require("../RegionViewer/filterVariantsInZoomRegion"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const TrackPage_1 = require("../TrackPage");
const MitochondrialVariants_1 = __importDefault(require("../MitochondrialVariantList/MitochondrialVariants"));
const annotateVariantsWithClinvar_1 = __importDefault(require("../VariantList/annotateVariantsWithClinvar"));
const operationName = 'MitochondrialVariantsInRegion';
const query = `
query ${operationName}($start: Int!, $stop: Int!, $datasetId: DatasetId!, $referenceGenome: ReferenceGenomeId!) {
  meta {
    clinvar_release_date
  }
  region(chrom: "M", start: $start, stop: $stop, reference_genome: $referenceGenome) {
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
    mitochondrial_variants(dataset: $datasetId) {
      ac_het
      ac_hom
      an
      consequence
      filters
      flags
      gene_id
      gene_symbol
      transcript_id
      hgvsc
      hgvsp
      lof
      lof_filter
      lof_flags
      max_heteroplasmy
      pos
      reference_genome
      variant_id
    }
  }
}
`;
const MitochondrialVariantsInRegion = (_a) => {
    var { datasetId, region, zoomRegion } = _a, rest = __rest(_a, ["datasetId", "region", "zoomRegion"]);
    const regionId = `${region.chrom}-${region.start}-${region.stop}`;
    if (!(0, metadata_1.hasMitochondrialVariants)(datasetId)) {
        return (react_1.default.createElement(StatusMessage_1.default, null,
            "Mitochondrial variants are not available in ",
            (0, metadata_1.labelForDataset)(datasetId),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Link_1.default, { to: `/region/${regionId}?dataset=gnomad_r3`, preserveSelectedDataset: false }, "View this region in gnomAD v3.1 to see mitochondrial variants")));
    }
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: {
            datasetId,
            start: region.start,
            stop: region.stop,
            referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
        }, loadingMessage: "Loading variants", errorMessage: "Unable to load variants", success: (data) => data.region && data.region.mitochondrial_variants }, ({ data }) => {
        data.region.mitochondrial_variants.forEach((v) => {
            /* eslint-disable no-param-reassign */
            if (v.an !== 0) {
                v.af = (v.ac_het + v.ac_hom) / v.an;
                v.af_het = v.ac_het / v.an;
                v.af_hom = v.ac_hom / v.an;
            }
            else {
                v.af = 0;
                v.af_het = 0;
                v.af_hom = 0;
            }
            v.hgvs = v.hgvsp || v.hgvsc;
            /* eslint-enable no-param-reassign */
        });
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TrackPage_1.TrackPageSection, null,
                react_1.default.createElement("h2", null, "ClinVar variants")),
            data.region.clinvar_variants.length > 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ClinvarVariantTrack_1.default, { referenceGenome: (0, metadata_1.referenceGenome)(datasetId), transcripts: region.genes.flatMap((gene) => gene.transcripts), variants: (0, filterVariantsInZoomRegion_1.default)(data.region.clinvar_variants, zoomRegion) }),
                react_1.default.createElement(TrackPage_1.TrackPageSection, { as: "p" },
                    "Data displayed here is from ClinVar's",
                    ' ',
                    (0, formatClinvarDate_1.default)(data.meta.clinvar_release_date),
                    " release."))) : (react_1.default.createElement(TrackPage_1.TrackPageSection, { as: "p" }, "No ClinVar variants found in this region.")),
            react_1.default.createElement(MitochondrialVariants_1.default, Object.assign({}, rest, { clinvarReleaseDate: data.meta.clinvar_release_date, context: region, exportFileName: `gnomad_mitochondrial_variants_${regionId}`, variants: (0, filterVariantsInZoomRegion_1.default)((0, annotateVariantsWithClinvar_1.default)(data.region.mitochondrial_variants, data.region.clinvar_variants), zoomRegion) }))));
    }));
};
exports.default = MitochondrialVariantsInRegion;
//# sourceMappingURL=MitochondrialVariantsInRegion.js.map