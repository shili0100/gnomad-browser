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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ui_1 = require("@gnomad/ui");
const Delayed_1 = __importDefault(require("./Delayed"));
const InfoPage_1 = __importDefault(require("./InfoPage"));
const StatusMessage_1 = __importDefault(require("./StatusMessage"));
const search_1 = require("./search");
const useRequest_1 = __importDefault(require("./useRequest"));
const defaultSearchDataset = 'gnomad_r2_1';
const SearchRedirect = ({ query }) => {
    const search = (0, react_1.useCallback)(() => (0, search_1.fetchSearchResults)(defaultSearchDataset, query), [query]);
    const { isLoading, response: searchResults, error } = (0, useRequest_1.default)(search);
    if (isLoading) {
        return (react_1.default.createElement(Delayed_1.default, null,
            react_1.default.createElement(StatusMessage_1.default, null, "Searching")));
    }
    if (error) {
        return react_1.default.createElement(StatusMessage_1.default, null, "Unable to load search results");
    }
    // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
    if (searchResults.length > 0) {
        // @ts-expect-error TS(2786) FIXME: 'Redirect' cannot be used as a JSX component.
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: searchResults[0].value });
    }
    return (react_1.default.createElement("p", null,
        "No results found for \"",
        query,
        "\"."));
};
const SearchRedirectPage = ({ query }) => {
    return (react_1.default.createElement(InfoPage_1.default, null,
        react_1.default.createElement(ui_1.PageHeading, null, "Search"),
        react_1.default.createElement(SearchRedirect, { query: query })));
};
exports.default = SearchRedirectPage;
//# sourceMappingURL=SearchRedirectPage.js.map