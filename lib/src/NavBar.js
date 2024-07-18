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
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Searchbox_1 = __importDefault(require("./Searchbox"));
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 30px;
  background-color: black;

  a {
    color: white;
    text-decoration: none;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 10px;
  }
`;
const LogoWrapper = styled_components_1.default.div `
  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
  }
`;
const Logo = styled_components_1.default.div `
  color: white;
  font-size: 1.5em;
  font-weight: bold;
`;
const ToggleMenuButton = (0, styled_components_1.default)(ui_1.Button) `
  border: 1px solid #fafafa;
  background: black;
  color: white;

  @media (min-width: 901px) {
    display: none;
  }
`;
const Menu = styled_components_1.default.ul `
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  list-style-type: none;

  a {
    padding: 0.5em;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    height: ${(props) => (props.isExpanded ? 'auto' : 0)};

    a {
      display: inline-block;
      width: 100%;
      padding: 1em 0;
    }
  }
`;
const NavBar = () => {
    const [isMenuExpanded, setIsMenuExpanded] = (0, react_1.useState)(false);
    const toggleMenu = (0, react_1.useCallback)(() => {
        setIsMenuExpanded((previousValue) => !previousValue);
    }, []);
    const closeMenu = (0, react_1.useCallback)(() => {
        setIsMenuExpanded(false);
    }, []);
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(LogoWrapper, null,
            react_1.default.createElement(react_router_dom_1.Link, { to: "/", onClick: closeMenu },
                react_1.default.createElement(Logo, null, "gnomAD browser")),
            react_1.default.createElement(ToggleMenuButton, { onClick: toggleMenu }, "\u2630")),
        react_1.default.createElement(Searchbox_1.default, { id: "navbar-search", placeholder: "Search", width: "360px" }),
        react_1.default.createElement(Menu, { isExpanded: isMenuExpanded },
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/about", onClick: closeMenu }, "About")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/team", onClick: closeMenu }, "Team")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/stats", onClick: closeMenu }, "Stats")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/policies", onClick: closeMenu }, "Policies")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/publications", onClick: closeMenu }, "Publications")),
            react_1.default.createElement("li", null,
                react_1.default.createElement("a", { href: "https://gnomad.broadinstitute.org/news/" }, "Blog")),
            react_1.default.createElement("li", null,
                react_1.default.createElement("a", { href: "https://gnomad.broadinstitute.org/news/changelog/" }, "Changelog")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/downloads", onClick: closeMenu }, "Downloads")),
            react_1.default.createElement("li", null,
                react_1.default.createElement("a", { href: "https://discuss.gnomad.broadinstitute.org", target: "_blank", rel: "noopener noreferrer" }, "Forum")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/contact", onClick: closeMenu }, "Contact")),
            react_1.default.createElement("li", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/help", onClick: closeMenu }, "Help/FAQ")))));
};
exports.default = NavBar;
//# sourceMappingURL=NavBar.js.map