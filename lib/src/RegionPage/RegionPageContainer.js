"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const identifiers_1 = require("@gnomad/identifiers");
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const Query_1 = __importDefault(require("../Query"));
const RegionPage_1 = __importDefault(require("./RegionPage"));
const operationName = 'Region';
const query = `
  query ${operationName}($chrom: String!, $start: Int!, $stop: Int!, $referenceGenome: ReferenceGenomeId!, $shortTandemRepeatDatasetId: DatasetId!, $includeShortTandemRepeats: Boolean!) {
    region(chrom: $chrom, start: $start, stop: $stop, reference_genome: $referenceGenome) {
      genes {
        gene_id
        symbol
        start
        stop
        exons {
          feature_type
          start
          stop
        }
        transcripts {
          transcript_id
          exons {
            feature_type
            start
            stop
          }
        }
      }
      non_coding_constraints {
        start
        stop
        oe
        z
      }
      short_tandem_repeats(dataset: $shortTandemRepeatDatasetId) @include(if: $includeShortTandemRepeats) {
        id
      }
    }
  }
`;
const RegionPageContainer = ({ datasetId, regionId }) => {
    if (!(0, identifiers_1.isRegionId)(regionId)) {
        return (
        // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.Page, null,
            react_1.default.createElement(DocumentTitle_1.default, { title: "Invalid region ID" }),
            react_1.default.createElement(ui_1.PageHeading, null, "Invalid region ID"),
            react_1.default.createElement("p", null, "Regions IDs must be formatted chrom-start-stop.")));
    }
    const { chrom, start, stop } = (0, identifiers_1.parseRegionId)(regionId);
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: {
            chrom,
            start,
            stop,
            referenceGenome: (0, metadata_1.referenceGenome)(datasetId),
            includeShortTandemRepeats: (0, metadata_1.hasShortTandemRepeats)(datasetId),
            shortTandemRepeatDatasetId: 'gnomad_r3',
        }, loadingMessage: "Loading region", errorMessage: "Unable to load region", success: (data) => data.region }, ({ data }) => {
        return (react_1.default.createElement(RegionPage_1.default, { datasetId: datasetId, region: Object.assign(Object.assign({}, data.region), { reference_genome: (0, metadata_1.referenceGenome)(datasetId), chrom: chrom === 'MT' ? 'M' : chrom, start,
                stop }) }));
    }));
};
exports.default = RegionPageContainer;
//# sourceMappingURL=RegionPageContainer.js.map