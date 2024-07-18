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
const root_1 = require("react-hot-loader/root");
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const Delayed_1 = __importDefault(require("./Delayed"));
const ErrorBoundary_1 = __importDefault(require("./ErrorBoundary"));
const Notifications_1 = __importStar(require("./Notifications"));
const StatusMessage_1 = __importDefault(require("./StatusMessage"));
const userPreferences_1 = __importDefault(require("./userPreferences"));
const ui_1 = require("@gnomad/ui");
const NavBar = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./NavBar'))));
const Routes = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./Routes'))));
const scrollToAnchorOrStartOfPage = (location) => {
    if (location.hash) {
        setTimeout(() => {
            const anchor = document.querySelector(`a${location.hash}`);
            if (anchor) {
                anchor.scrollIntoView();
            }
            else {
                window.scrollTo(0, 0);
            }
        }, 0);
    }
    else {
        window.scrollTo(0, 0);
    }
};
// Hack to make anchor links work on the first navigation to a page
// See https://github.com/broadinstitute/gnomad-browser/issues/685
const PageLoading = () => {
    const location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(() => () => {
        scrollToAnchorOrStartOfPage(location);
    });
    return null;
};
const GoogleAnalytics = () => {
    const location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(() => {
        if (window.gtag) {
            ;
            window.gtag('config', window.gaTrackingId, {
                page_path: location.pathname,
            });
        }
    }, [location.pathname]);
    return null;
};
const TopBarWrapper = styled_components_1.default.div `
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.23);

  @media print {
    display: none;
  }
`;
const Banner = styled_components_1.default.div `
  padding: 0.75em 0.5em;
  background: rgb(17, 115, 187);
  color: #fff;
  text-align: center;

  a {
    color: #8ac8f4 !important;
    text-decoration: underline;
  }
`;
const BANNER_CONTENT = (react_1.default.createElement(react_1.default.Fragment, null,
    "Help us continue to improve gnomAD by taking 5 minutes to fill out our ",
    react_1.default.createElement(ui_1.ExternalLink, { href: "http://broad.io/2024_survey" }, "user survey"),
    "."));
const App = () => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        userPreferences_1.default.loadPreferences().then(() => {
            setIsLoading(false);
        }, (error) => {
            setIsLoading(false);
            (0, Notifications_1.showNotification)({
                title: 'Error',
                message: error.message,
                status: 'error',
            });
        });
    }, []);
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", component: GoogleAnalytics }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", render: ({ location }) => {
                scrollToAnchorOrStartOfPage(location);
            } }),
        react_1.default.createElement(ErrorBoundary_1.default, null, isLoading ? (react_1.default.createElement(Delayed_1.default, null,
            react_1.default.createElement(StatusMessage_1.default, null, "Loading"))) : (react_1.default.createElement(react_1.Suspense, { fallback: null },
            react_1.default.createElement(Notifications_1.default, null),
            react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(PageLoading, null) },
                react_1.default.createElement(Routes, null)))))));
};
exports.default = (0, root_1.hot)(App);
//# sourceMappingURL=App.js.map