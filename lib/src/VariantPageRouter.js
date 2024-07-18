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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_string_1 = __importDefault(require("query-string"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const identifiers_1 = require("@gnomad/identifiers");
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../dataset-metadata/metadata");
const DocumentTitle_1 = __importDefault(require("./DocumentTitle"));
const Link_1 = __importDefault(require("./Link"));
const useRequest_1 = __importDefault(require("./useRequest"));
const StatusMessage_1 = __importDefault(require("./StatusMessage"));
const search_1 = require("./search");
const MitochondrialVariantPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./MitochondrialVariantPage/MitochondrialVariantPage'))));
const MNVPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./MNVPage/MNVPage'))));
const StructuralVariantPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./StructuralVariantPage/StructuralVariantPage'))));
const CopyNumberVariantPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./CopyNumberVariantPage/CopyNumberVariantPage'))));
const VariantPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./VariantPage/VariantPage'))));
const VariantSearch = ({ datasetId, query }) => {
    const search = (0, react_1.useCallback)(() => (0, search_1.fetchVariantSearchResults)(datasetId, query), [datasetId, query]);
    const { isLoading, response: matchingVariants, error } = (0, useRequest_1.default)(search);
    if (isLoading) {
        return react_1.default.createElement(StatusMessage_1.default, null, "Searching variants");
    }
    if (error || !matchingVariants) {
        return react_1.default.createElement(StatusMessage_1.default, null, "Unable to complete search");
    }
    if (matchingVariants.length === 0) {
        return react_1.default.createElement("p", null, "No matching variants found.");
    }
    if (matchingVariants.length === 1) {
        return (react_1.default.createElement(react_router_dom_1.Redirect, { to: {
                pathname: `/variant/${matchingVariants[0]}`,
                search: query_string_1.default.stringify({ dataset: datasetId }),
            } }));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("p", { style: { fontSize: '16px' } }, "Multiple matching variants found:"),
        react_1.default.createElement(ui_1.List, null, matchingVariants.map((variantId) => (
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        react_1.default.createElement(ui_1.ListItem, { key: variantId },
            react_1.default.createElement(Link_1.default, { to: {
                    pathname: `/variant/${variantId}`,
                    search: query_string_1.default.stringify({ dataset: datasetId }),
                } }, variantId)))))));
};
const VariantSearchPage = ({ datasetId, query }) => {
    return (
    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.Page, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: `${query} | ${(0, metadata_1.labelForDataset)(datasetId)}` }),
        react_1.default.createElement(ui_1.PageHeading, null, query),
        (0, identifiers_1.isRsId)(query) && (react_1.default.createElement("p", { style: { fontSize: '16px' } },
            react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
            " We discourage searching by rsIDs as they can be ambiguous, and generally recommend searching for variants using chromosome, position, reference, and alternate alleles to ensure an accurate match.")),
        react_1.default.createElement(VariantSearch, { datasetId: datasetId, query: query })));
};
const VariantPageRouter = ({ datasetId, variantId }) => {
    if ((0, metadata_1.hasStructuralVariants)(datasetId)) {
        return react_1.default.createElement(StructuralVariantPage, { datasetId: datasetId, variantId: variantId });
    }
    if ((0, metadata_1.hasCopyNumberVariants)(datasetId)) {
        return react_1.default.createElement(CopyNumberVariantPage, { datasetId: datasetId, variantId: variantId });
    }
    if ((0, identifiers_1.isVariantId)(variantId)) {
        const normalizedVariantId = (0, identifiers_1.normalizeVariantId)(variantId).replace(/^MT/, 'M');
        const [chrom, _pos, ref, alt] = normalizedVariantId.split('-');
        if (ref.length === alt.length && ref.length > 1) {
            return react_1.default.createElement(MNVPage, { datasetId: datasetId, variantId: normalizedVariantId });
        }
        if (chrom === 'M') {
            return react_1.default.createElement(MitochondrialVariantPage, { datasetId: datasetId, variantId: normalizedVariantId });
        }
        return react_1.default.createElement(VariantPage, { datasetId: datasetId, variantId: normalizedVariantId });
    }
    if ((0, identifiers_1.isRsId)(variantId) || /^CA[0-9]+$/i.test(variantId) || /^[0-9]+$/.test(variantId)) {
        return react_1.default.createElement(VariantSearchPage, { datasetId: datasetId, query: variantId });
    }
    return (
    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.Page, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: "Invalid variant ID" }),
        react_1.default.createElement(ui_1.PageHeading, null, "Invalid Variant ID"),
        react_1.default.createElement("p", null, "Expected chrom-pos-ref-alt variant ID, rsID, or ClinVar variation ID.")));
};
exports.default = VariantPageRouter;
//# sourceMappingURL=VariantPageRouter.js.map