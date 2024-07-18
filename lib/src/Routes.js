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
const query_string_1 = __importDefault(require("query-string"));
const react_router_dom_1 = require("react-router-dom");
const identifiers_1 = require("@gnomad/identifiers");
const ui_1 = require("@gnomad/ui");
const DocumentTitle_1 = __importDefault(require("./DocumentTitle"));
// Content pages
const AboutPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./AboutPage'))));
const TeamPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./TeamPage/TeamPage'))));
const ContactPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./ContactPage'))));
const DownloadsPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./DownloadsPage/DownloadsPage'))));
const HelpPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./help/HelpPage'))));
const HelpTopicPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./help/HelpTopicPage'))));
const HomePage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./HomePage'))));
const MOUPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./MOUPage'))));
const StatsPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./StatsPage/StatsPage'))));
const PublicationsPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./PublicationsPage'))));
const PoliciesPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./PoliciesPage'))));
const GenePageContainer = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./GenePage/GenePageContainer'))));
const RegionPageContainer = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./RegionPage/RegionPageContainer'))));
const TranscriptPageContainer = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./TranscriptPage/TranscriptPageContainer'))));
const VariantPageRouter = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./VariantPageRouter'))));
const ShortTandemRepeatPageContainer = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./ShortTandemRepeatPage/ShortTandemRepeatPageContainer'))));
const ShortTandemRepeatsPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./ShortTandemRepeatsPage/ShortTandemRepeatsPage'))));
const VariantCooccurrencePage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./VariantCooccurrencePage/VariantCooccurrencePage'))));
const LiftoverDisambiguationPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./VariantPage/LiftoverDisambiguationPage'))));
// Other pages
const PageNotFoundPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./PageNotFoundPage'))));
const SearchRedirectPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./SearchRedirectPage'))));
const defaultDataset = 'gnomad_r4';
const Routes = () => {
    // ==================================================================================
    //
    //                                     NOTE!
    //
    // New routes must also be added as a rewrite rule in Nginx configuration.
    // ==================================================================================
    return (react_1.default.createElement(react_router_dom_1.Switch, null,
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: HomePage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/gene/:gene/transcript/:transcriptId", render: ({ location, match }) => (react_1.default.createElement(react_router_dom_1.Redirect, { to: Object.assign(Object.assign({}, location), { pathname: `/transcript/${match.params.transcriptId}` }) })) }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/gene/:gene", render: ({ location, match }) => {
                const params = query_string_1.default.parse(location.search);
                const datasetId = params.dataset || defaultDataset;
                return react_1.default.createElement(GenePageContainer, { datasetId: datasetId, geneIdOrSymbol: match.params.gene });
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/region/:regionId", render: ({ location, match }) => {
                const params = query_string_1.default.parse(location.search);
                const datasetId = params.dataset || defaultDataset;
                if (!(0, identifiers_1.isRegionId)(match.params.regionId)) {
                    return (
                    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
                    react_1.default.createElement(ui_1.Page, null,
                        react_1.default.createElement(DocumentTitle_1.default, { title: "Invalid region" }),
                        react_1.default.createElement(ui_1.PageHeading, null, "Invalid region"),
                        react_1.default.createElement("p", null, "Region must be formatted chrom-start-stop.")));
                }
                const regionId = (0, identifiers_1.normalizeRegionId)(match.params.regionId);
                return react_1.default.createElement(RegionPageContainer, { datasetId: datasetId, regionId: regionId });
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/transcript/:transcriptId", render: ({ location, match }) => {
                const params = query_string_1.default.parse(location.search);
                const datasetId = params.dataset || defaultDataset;
                return (react_1.default.createElement(TranscriptPageContainer, { datasetId: datasetId, transcriptId: match.params.transcriptId }));
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/variant/liftover/:fromVariantId/:fromDatasetId/:toDatasetId", render: ({ match }) => {
                const { fromVariantId, fromDatasetId, toDatasetId } = match.params;
                return (react_1.default.createElement(LiftoverDisambiguationPage, { fromVariantId: fromVariantId, fromDatasetId: fromDatasetId, toDatasetId: toDatasetId }));
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/variant/:variantId([-A-Za-z0-9_.]+)", render: ({ location, match }) => {
                const queryParams = query_string_1.default.parse(location.search);
                const datasetId = queryParams.dataset || defaultDataset;
                return react_1.default.createElement(VariantPageRouter, { datasetId: datasetId, variantId: match.params.variantId });
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/variant-cooccurrence", render: ({ location }) => {
                const params = query_string_1.default.parse(location.search);
                const datasetId = params.dataset || defaultDataset;
                return react_1.default.createElement(VariantCooccurrencePage, { datasetId: datasetId });
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/short-tandem-repeats", render: ({ location }) => {
                const queryParams = query_string_1.default.parse(location.search);
                const datasetId = queryParams.dataset || defaultDataset;
                return react_1.default.createElement(ShortTandemRepeatsPage, { datasetId: datasetId });
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/short-tandem-repeat/:strId", render: ({ location, match }) => {
                const queryParams = query_string_1.default.parse(location.search);
                const datasetId = queryParams.dataset || defaultDataset;
                return react_1.default.createElement(ShortTandemRepeatPageContainer, { datasetId: datasetId, strId: match.params.strId });
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/about", component: AboutPage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/team", component: TeamPage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/downloads", component: DownloadsPage }),
        react_1.default.createElement(react_router_dom_1.Redirect, { from: "/terms", to: "/policies" }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/policies", component: PoliciesPage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/publications", component: PublicationsPage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/contact", component: ContactPage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/feedback", render: () => react_1.default.createElement(react_router_dom_1.Redirect, { to: "/contact" }) }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/mou", component: MOUPage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/stats", component: StatsPage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/faq", render: ({ location }) => {
                if (location.hash) {
                    return react_1.default.createElement(react_router_dom_1.Redirect, { to: `/help/${location.hash.slice(1)}` });
                }
                return react_1.default.createElement(react_router_dom_1.Redirect, { to: { pathname: '/help', hash: '#frequently-asked-questions' } });
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/help/how-should-i-cite-discoveries-made-using-gnomad-data", render: () => react_1.default.createElement(react_router_dom_1.Redirect, { to: "/publications" }) }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/help/:topic", render: ({ match }) => react_1.default.createElement(HelpTopicPage, { topicId: match.params.topic }) }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/help", component: HelpPage }),
        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/awesome", render: ({ location }) => {
                const params = query_string_1.default.parse(location.search);
                return react_1.default.createElement(SearchRedirectPage, { query: params.query });
            } }),
        react_1.default.createElement(react_router_dom_1.Route, { component: PageNotFoundPage })));
    // ==================================================================================
    //
    //                                     NOTE!
    //
    // New routes must also be added as a rewrite rule in Nginx configuration.
    // ==================================================================================
};
exports.default = Routes;
//# sourceMappingURL=Routes.js.map