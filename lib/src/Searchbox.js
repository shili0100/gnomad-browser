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
const query_string_1 = __importDefault(require("query-string"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const search_1 = require("./search");
const metadata_1 = require("../dataset-metadata/metadata");
const Wrapper = styled_components_1.default.div `
  display: flex;
  align-items: stretch;
  width: ${(props) => props.width};

  select {
    border-right: 1px solid #ddd;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #fff;
  }

  input {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;
const getDefaultSearchDataset = (selectedDataset) => {
    if (selectedDataset) {
        if (selectedDataset.startsWith('gnomad_r4')) {
            return 'gnomad_r4';
        }
        if (selectedDataset.startsWith('gnomad_r3')) {
            return 'gnomad_r3';
        }
        if (selectedDataset.startsWith('gnomad_r2')) {
            return 'gnomad_r2_1';
        }
        if (selectedDataset.startsWith('gnomad_sv_r2')) {
            return 'gnomad_sv_r2_1';
        }
        if (selectedDataset === 'exac') {
            return 'exac';
        }
        if (selectedDataset === 'gnomad_sv_r4') {
            return 'gnomad_sv_r4';
        }
        if (selectedDataset === 'gnomad_cnv_r4') {
            return 'gnomad_cnv_r4';
        }
    }
    return 'gnomad_r4';
};
exports.default = (0, react_router_dom_1.withRouter)((props) => {
    const { history, location, _match, placeholder = 'Search by gene, region, or variant', width } = props, rest = __rest(props, ["history", "location", "_match", "placeholder", "width"]);
    const currentParams = query_string_1.default.parse(location.search);
    const defaultSearchDataset = getDefaultSearchDataset(currentParams.dataset);
    const [searchDataset, setSearchDataset] = (0, react_1.useState)(defaultSearchDataset);
    // Update search dataset when active dataset changes.
    // Cannot rely on props for this because the top bar does not re-render.
    (0, react_1.useEffect)(() => {
        return history.listen((newLocation) => {
            const newParams = query_string_1.default.parse(newLocation.search);
            setSearchDataset(getDefaultSearchDataset(newParams.dataset));
        });
    });
    const innerSearchbox = (0, react_1.useRef)(null);
    const grch38Datasets = ['gnomad_r4', 'gnomad_r3', 'gnomad_sv_r4', 'gnomad_cnv_r4'];
    const grch37Datasets = ['gnomad_r2_1', 'gnomad_sv_r2_1', 'exac'];
    return (
    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
    react_1.default.createElement(Wrapper, { width: width },
        react_1.default.createElement(ui_1.Select, { value: searchDataset, onChange: (e) => {
                setSearchDataset(e.target.value);
                if (innerSearchbox.current) {
                    ;
                    innerSearchbox.current.updateResults();
                }
            } },
            react_1.default.createElement("optgroup", { label: "GRCh38" }, grch38Datasets.map((datasetId) => (react_1.default.createElement("option", { value: datasetId }, (0, metadata_1.labelForDataset)(datasetId))))),
            react_1.default.createElement("optgroup", { label: "GRCh37" }, grch37Datasets.map((datasetId) => (react_1.default.createElement("option", { value: datasetId }, (0, metadata_1.labelForDataset)(datasetId)))))),
        react_1.default.createElement("span", { style: { flexGrow: 1 } },
            react_1.default.createElement(ui_1.Searchbox
            // Clear input when URL changes
            , Object.assign({ 
                // Clear input when URL changes
                key: history.location.pathname }, rest, { ref: innerSearchbox, width: "100%", fetchSearchResults: (query) => (0, search_1.fetchSearchResults)(searchDataset, query), placeholder: placeholder, onSelect: (url) => {
                    history.push(url);
                } })))));
});
//# sourceMappingURL=Searchbox.js.map