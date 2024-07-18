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
exports.SectionSubheading = exports.SectionHeading = void 0;
const js_worker_search_1 = __importStar(require("js-worker-search"));
const polished_1 = require("polished");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const helpPageTableOfContents_1 = __importDefault(require("../../help/helpPageTableOfContents"));
const AnchorLink_1 = require("../AnchorLink");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const Link_1 = __importDefault(require("../Link"));
// import helpTopics, { indexTexts } from './helpTopics' // eslint-disable-line import/no-unresolved,import/extensions
const slugify_1 = __importDefault(require("./slugify"));
exports.SectionHeading = (0, AnchorLink_1.withAnchor)(styled_components_1.default.h2 ``);
exports.SectionSubheading = (0, AnchorLink_1.withAnchor)(styled_components_1.default.h3 `
  margin-bottom: 0.5em;
`);
const searchApi = new js_worker_search_1.default({
    indexMode: js_worker_search_1.INDEX_MODES.PREFIXES,
});
// indexTexts.forEach(({ id, texts }: { id: string; texts: string[] }) => {
//   texts.forEach((text: string) => {
//     searchApi.indexDocument(id, text)
//   })
// })
const HelpPageWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  max-width: 1680px;
  padding-right: 240px; /* balance navigation */
  margin: 0 auto 40px;

  @media (max-width: 1280px) {
    padding-right: 0;
  }
`;
const HelpNavigation = styled_components_1.default.section `
  position: sticky;
  top: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 240px;
  height: 100%;
  padding: 15px;

  ul {
    padding-left: 20px;
    line-height: 1.5;

    ul {
      margin: 0.5em 0;
    }
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;
const HelpContentWrapper = styled_components_1.default.div `
  flex-grow: 1;
  overflow: auto;
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px;
`;
const HelpContent = styled_components_1.default.div `
  font-size: 16px;

  p {
    margin-bottom: 1em;
    line-height: 1.4;
  }
`;
const FAQList = styled_components_1.default.ul `
  padding-left: 0;
  list-style-type: none;
  margin-bottom: 1em;

  summary {
    padding: 0.25em;
    cursor: pointer;

    h4 {
      display: inline;
      font-weight: normal;
    }
  }

  details[open] {
    summary {
      h4 {
        font-weight: bold;
      }
    }
  }
`;
const FAQAnswer = styled_components_1.default.div `
  padding-left: 10px;
  border-left: 1px solid #999;
`;
const ToggleButton = (0, styled_components_1.default)(ui_1.Button) `
  font-size: 12px;
`;
const HelpPage = () => {
    const history = (0, react_router_dom_1.useHistory)();
    return (react_1.default.createElement(HelpPageWrapper, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: "Help" }),
        react_1.default.createElement(HelpNavigation, null,
            react_1.default.createElement("h2", null, "Table of contents"),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null,
                    react_1.default.createElement(ui_1.Link, { href: "#search" }, "Search")),
                helpPageTableOfContents_1.default.topics.map((topicId) => (react_1.default.createElement("li", { key: topicId },
                    react_1.default.createElement(Link_1.default, { to: `/help/${topicId}` }, '石丽------')))),
                react_1.default.createElement("li", null,
                    react_1.default.createElement(ui_1.Link, { href: "#frequently-asked-questions" }, "Frequently asked questions"),
                    react_1.default.createElement("ul", null, helpPageTableOfContents_1.default.faq.map((section) => (react_1.default.createElement("li", { key: section.heading },
                        react_1.default.createElement(ui_1.Link, { href: `#${(0, slugify_1.default)(section.heading)}` }, section.heading)))))))),
        react_1.default.createElement(HelpContentWrapper, null,
            react_1.default.createElement(ui_1.PageHeading, null, "gnomAD Help"),
            react_1.default.createElement(HelpContent, null,
                react_1.default.createElement("section", { id: "search" },
                    react_1.default.createElement("label", { htmlFor: "help-search", style: (0, polished_1.hideVisually)() }, "Search gnomAD help"),
                    react_1.default.createElement(ui_1.Searchbox
                    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                    , { 
                        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                        width: "100%", fetchSearchResults: (query) => searchApi.search(query).then((results) => results.map((topicId) => ({
                            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                            label: "石丽------", //helpTopics[topicId].title,
                            value: topicId,
                        }))), id: "help-search", placeholder: "Search", onSelect: (topicId) => {
                            history.push(`/help/${topicId}`);
                        } })),
                react_1.default.createElement("section", null,
                    react_1.default.createElement(ui_1.List, null, helpPageTableOfContents_1.default.topics.map((topicId) => (
                    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                    react_1.default.createElement(ui_1.ListItem, { key: topicId },
                        react_1.default.createElement(Link_1.default, { to: `/help/${topicId}` }, "'\u77F3\u4E3D------'")))))),
                react_1.default.createElement("section", null,
                    react_1.default.createElement(exports.SectionHeading, { id: "frequently-asked-questions" }, "Frequently asked questions"),
                    helpPageTableOfContents_1.default.faq.map((section) => (react_1.default.createElement("div", { key: section.heading },
                        react_1.default.createElement(exports.SectionSubheading, { id: (0, slugify_1.default)(section.heading) }, section.heading),
                        react_1.default.createElement(ToggleButton, { onClick: (e) => {
                                Array.from(e.target.parentElement.querySelectorAll('details')).forEach((el) => {
                                    el.open = true; // eslint-disable-line no-param-reassign
                                });
                            } }, "Show all answers in this section"),
                        ' ',
                        react_1.default.createElement(ToggleButton, { onClick: (e) => {
                                Array.from(e.target.parentElement.querySelectorAll('details')).forEach((el) => {
                                    el.open = false; // eslint-disable-line no-param-reassign
                                });
                            } }, "Hide all answers in this section"),
                        react_1.default.createElement(FAQList, null, section.topics.map((topicId) => (react_1.default.createElement("li", { key: topicId },
                            react_1.default.createElement("details", null,
                                react_1.default.createElement("summary", null,
                                    react_1.default.createElement("h4", null, "\u77F3\u4E3D------")),
                                react_1.default.createElement(FAQAnswer, null, "'\u77F3\u4E3D------'"))))))))))))));
};
exports.default = HelpPage;
//# sourceMappingURL=HelpPage.js.map