"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const metadata_1 = require("../../dataset-metadata/metadata");
const ui_1 = require("@gnomad/ui");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const GnomadPageHeading_1 = __importDefault(require("../GnomadPageHeading"));
const Query_1 = __importDefault(require("../Query"));
const ShortTandemRepeatPage_1 = __importDefault(require("./ShortTandemRepeatPage"));
const operationName = 'ShortTandemRepeat';
const query = `
query ${operationName}($strId: String!, $datasetId: DatasetId!) {
  short_tandem_repeat(id: $strId, dataset: $datasetId) {
    id
    gene {
      ensembl_id
      symbol
      region
    }
    associated_diseases {
      name
      symbol
      omim_id
      inheritance_mode
      repeat_size_classifications {
        classification
        min
        max
      }
      notes
    }
    reference_region {
      chrom
      start
      stop
    }
    reference_repeat_unit
    repeat_units {
      repeat_unit
      classification
    }
    allele_size_distribution {
      distribution
      populations {
        id
        distribution
      }
      repeat_units {
        repeat_unit
        distribution
        populations {
          id
          distribution
        }
      }
    }
    genotype_distribution {
      distribution
      populations {
        id
        distribution
      }
      repeat_units {
        repeat_units
        distribution
        populations {
          id
          distribution
        }
      }
    }
    age_distribution {
      age_range
      distribution
    }
    stripy_id
    adjacent_repeats {
      id
      reference_region {
        chrom
        start
        stop
      }
      reference_repeat_unit
      repeat_units
      allele_size_distribution {
        distribution
        populations {
          id
          distribution
        }
        repeat_units {
          repeat_unit
          distribution
          populations {
            id
            distribution
          }
        }
      }
      genotype_distribution {
        distribution
        populations {
          id
          distribution
        }
        repeat_units {
          repeat_units
          distribution
          populations {
            id
            distribution
          }
        }
      }
    }
  }
}
`;
const ShortTandemRepeatPageContainer = ({ datasetId, strId, }) => {
    return (
    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.Page, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: `${strId} | Tandem Repeat | ${(0, metadata_1.labelForDataset)(datasetId)}` }),
        react_1.default.createElement(GnomadPageHeading_1.default, { datasetOptions: {
                includeShortVariants: true,
                includeStructuralVariants: false,
                includeCopyNumberVariants: false,
                includeExac: false,
                includeGnomad2: false,
                includeGnomad3: true,
                includeGnomad3Subsets: false,
            }, selectedDataset: datasetId },
            "Tandem Repeat: ",
            react_1.default.createElement("span", null, strId)),
        react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: {
                datasetId,
                strId,
            }, loadingMessage: "Loading tandem repeat data", errorMessage: "Unable to load tandem repeat data", success: (data) => data.short_tandem_repeat }, ({ data }) => {
            return (react_1.default.createElement(ShortTandemRepeatPage_1.default, { datasetId: datasetId, shortTandemRepeat: data.short_tandem_repeat }));
        })));
};
exports.default = ShortTandemRepeatPageContainer;
//# sourceMappingURL=ShortTandemRepeatPageContainer.js.map