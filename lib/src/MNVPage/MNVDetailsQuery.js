"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Query_1 = require("../Query");
const operationName = 'MultiNucleotideVariant';
const query = `
query ${operationName}($variantId: String!, $datasetId: DatasetId!) {
  multiNucleotideVariant(variant_id: $variantId, dataset: $datasetId) {
    variant_id
    chrom
    pos
    ref
    alt
    exome {
      ac
      ac_hom
      n_individuals
    }
    genome {
      ac
      ac_hom
      n_individuals
    }
    constituent_snvs {
      variant_id
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
    consequences {
      gene_id
      gene_name
      transcript_id
      category
      consequence
      codons
      amino_acids
      snv_consequences {
        variant_id
        consequence
        codons
        amino_acids
      }
    }
    related_mnvs {
      combined_variant_id
      changes_amino_acids
      n_individuals
      other_constituent_snvs
    }
  }
}
`;
const MNVDetailsQuery = ({ children, datasetId, variantId }) => (react_1.default.createElement(Query_1.BaseQuery, { operationName: operationName, query: query, variables: { datasetId, variantId } }, children));
exports.default = MNVDetailsQuery;
//# sourceMappingURL=MNVDetailsQuery.js.map