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
const StructuralVariants_1 = __importDefault(require("../StructuralVariantList/StructuralVariants"));
// @ts-expect-error TS(7022) FIXME: 'StructuralVariantsInGene' implicitly has type 'an... Remove this comment to see the full error message
const StructuralVariantsInGene = (_a) => {
    var { datasetId, gene, zoomRegion } = _a, rest = __rest(_a, ["datasetId", "gene", "zoomRegion"]);
    const operationName = 'StructuralVariantsInGene';
    const query = `
    query ${operationName}($datasetId: StructuralVariantDatasetId!, $geneId: String!, $referenceGenome: ReferenceGenomeId!) {
      gene(gene_id: $geneId, reference_genome: $referenceGenome) {
        structural_variants(dataset: $datasetId) {
          ac
          ac_hemi
          ac_hom
          an
          af
          chrom
          chrom2
          end
          end2
          consequence
          filters
          length
          pos
          pos2
          type
          variant_id
        }
      }
    }
  `;
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: {
            datasetId,
            geneId: gene.gene_id,
            referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
        }, loadingMessage: "Loading variants", errorMessage: "Unable to load variants", success: (data) => data.gene && data.gene.structural_variants }, ({ data }) => {
        const structural_variants = (0, filterVariantsInZoomRegion_1.filterStructuralVariantsInZoomRegion)(data.gene.structural_variants, zoomRegion).map((variant) => (Object.assign(Object.assign({}, variant), { variant_id: variant.variant_id.toUpperCase() })));
        return (react_1.default.createElement(StructuralVariants_1.default, Object.assign({}, rest, { context: gene, exportFileName: `gnomad_structural_variants_${gene.gene_id}`, variants: structural_variants })));
    }));
};
StructuralVariantsInGene.defaultProps = {
    zoomRegion: null,
};
exports.default = StructuralVariantsInGene;
//# sourceMappingURL=StructuralVariantsInGene.js.map