"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const metadata_1 = require("../../dataset-metadata/metadata");
const TrackPage_1 = require("../TrackPage");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const Query_1 = require("../Query");
const Delayed_1 = __importDefault(require("../Delayed"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const Link_1 = __importDefault(require("../Link"));
const react_router_dom_1 = require("react-router-dom");
const LiftoverDisambiguationPage = ({ fromVariantId, fromDatasetId, toDatasetId, }) => {
    const fromLabel = (0, metadata_1.labelForDataset)(fromDatasetId);
    const fromReferenceGenome = (0, metadata_1.referenceGenome)(fromDatasetId);
    const toReferenceGenome = (0, metadata_1.referenceGenome)(toDatasetId);
    const operationName = 'LiftoverDisambiguation';
    const correspondingVariantField = (0, metadata_1.isLiftoverSource)(fromDatasetId)
        ? 'liftover'
        : 'source';
    const disambiguationQuery = `
query ${operationName}($source_variant_id: String, $liftover_variant_id: String, $reference_genome: ReferenceGenomeId!) {
  liftover(source_variant_id: $source_variant_id, liftover_variant_id: $liftover_variant_id, reference_genome: $reference_genome) {
	${correspondingVariantField} {
	  variant_id
	}
    }
  }
`;
    const baseQueryVariables = { reference_genome: (0, metadata_1.referenceGenome)(fromDatasetId) };
    const queryVariables = fromReferenceGenome === 'GRCh37'
        ? Object.assign(Object.assign({}, baseQueryVariables), { source_variant_id: fromVariantId }) : Object.assign(Object.assign({}, baseQueryVariables), { liftover_variant_id: fromVariantId });
    return (react_1.default.createElement(TrackPage_1.TrackPage, null,
        react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement(DocumentTitle_1.default, { title: `${fromVariantId} liftover | ${fromReferenceGenome} to ${toReferenceGenome}` }),
            react_1.default.createElement(react_1.default.Fragment, null,
                "Due to liftover, variant ",
                fromVariantId,
                " in dataset ",
                fromLabel,
                " may correspond to a different variant or variants in ",
                toReferenceGenome,
                "."),
            react_1.default.createElement(Query_1.BaseQuery, { operationName: "LiftoverDisambiguation", query: disambiguationQuery, variables: queryVariables }, ({ data, error, graphQLErrors, loading }) => {
                let pageContent = null;
                if (loading) {
                    pageContent = (react_1.default.createElement(Delayed_1.default, null,
                        react_1.default.createElement(StatusMessage_1.default, null, "Loading corresponding variants...")));
                }
                else if (error) {
                    pageContent = react_1.default.createElement(StatusMessage_1.default, null, "Unable to load corresponding variants");
                }
                else if (!(data || {}).liftover) {
                    pageContent = (react_1.default.createElement(StatusMessage_1.default, null, graphQLErrors && graphQLErrors.length
                        ? Array.from(new Set(graphQLErrors
                            .filter((e) => !e.message.includes('ClinVar'))
                            .map((e) => e.message))).join(', ')
                        : 'Unable to load corresponding variants'));
                }
                else if (data.liftover.length === 0) {
                    pageContent = react_1.default.createElement(StatusMessage_1.default, null, "No corresponding variants found");
                }
                else if (data.liftover.length === 1) {
                    pageContent = (react_1.default.createElement(react_router_dom_1.Redirect, { to: {
                            pathname: `/variant/${data.liftover[0][correspondingVariantField].variant_id}`,
                            search: `dataset=${(0, metadata_1.baseDatasetForReferenceGenome)(toReferenceGenome)}`,
                        } }));
                }
                else {
                    pageContent = (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("ul", null, data.liftover.map((correspondingVariant) => {
                            const variantId = correspondingVariant[correspondingVariantField].variant_id;
                            const datasetToLink = (0, metadata_1.baseDatasetForReferenceGenome)(toReferenceGenome);
                            return (react_1.default.createElement("li", { key: variantId },
                                react_1.default.createElement(Link_1.default, { to: `/variant/${variantId}?dataset=${datasetToLink}`, preserveSelectedDataset: false }, variantId)));
                        }))));
                }
                return react_1.default.createElement(react_1.default.Fragment, null, pageContent);
            }))));
};
exports.default = LiftoverDisambiguationPage;
//# sourceMappingURL=LiftoverDisambiguationPage.js.map