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
const Query_1 = __importDefault(require("../Query"));
const filterVariantsInZoomRegion_1 = require("../RegionViewer/filterVariantsInZoomRegion");
const CopyNumberVariants_1 = __importDefault(require("../CopyNumberVariantList/CopyNumberVariants"));
// @ts-expect-error TS(7022) FIXME: 'CopyNumberVariantsInRegion' implicitly has type '... Remove this comment to see the full error message
const CopyNumberVariantsInRegion = (_a) => {
    var { datasetId, region, zoomRegion } = _a, rest = __rest(_a, ["datasetId", "region", "zoomRegion"]);
    const operationName = 'CopyNumberVariantsInRegion';
    const query = `
    query ${operationName}($datasetId: CopyNumberVariantDatasetId!, $chrom: String!, $start: Int!, $stop: Int!, $referenceGenome: ReferenceGenomeId!) {
      region(chrom: $chrom, start: $start, stop: $stop, reference_genome: $referenceGenome) {
        copy_number_variants(dataset: $datasetId) {
          sc
          sn
          sf
          chrom
          end
          filters
          length
          pos
          posmin
          posmax
          endmin
          endmax
          type
          variant_id
        }
      }
    }
  `;
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: {
            datasetId,
            chrom: region.chrom,
            start: region.start,
            stop: region.stop,
            referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
        }, loadingMessage: "Loading variants", errorMessage: "Unable to load variants", success: (data) => data.region && data.region.copy_number_variants }, ({ data }) => {
        const regionId = `${region.chrom}-${region.start}-${region.stop}`;
        const variants = (0, filterVariantsInZoomRegion_1.filterCopyNumberVariantsInZoomRegion)(data.region.copy_number_variants, zoomRegion).map((variant) => (Object.assign(Object.assign({}, variant), { variant_id: variant.variant_id })));
        return (react_1.default.createElement(CopyNumberVariants_1.default, Object.assign({}, rest, { context: region, exportFileName: `gnomad_copy_number_variants_${regionId}`, variants: variants })));
    }));
};
CopyNumberVariantsInRegion.defaultProps = {
    zoomRegion: null,
};
exports.default = CopyNumberVariantsInRegion;
//# sourceMappingURL=CopyNumberVariantsInRegion.js.map