"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
// @ts-expect-error
const terms_md_1 = __importDefault(require("../about/policies/terms.md"));
// @ts-expect-error
const policies_gnomAD_privacy_DRAFT_pdf_1 = __importDefault(require("../about/policies/policies_gnomAD_privacy_DRAFT.pdf"));
// @ts-expect-error
const policies_md_1 = __importDefault(require("../about/policies/policies.md"));
const DocumentTitle_1 = __importDefault(require("./DocumentTitle"));
const InfoPage_1 = __importDefault(require("./InfoPage"));
const MarkdownContent_1 = __importDefault(require("./MarkdownContent"));
const PoliciesPage = (0, styled_components_1.default)(InfoPage_1.default) `
  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }

  h2:not(:first-child) {
    padding-top: 1.5rem;
  }
`;
// TODO: formatting from 'MarkdownContent' breaks a-tags that link to a PDF loaded with
//   webpack, which is how the current Privacy Policy is being loaded.
//   Workaround for now to get this up for GCBR application, will review later.
const PrivacyPolicyWrapper = styled_components_1.default.div `
  p {
    margin-top: 15px;
    margin-bottom: 15px;
    line-height: 1.4;
  }

  a {
    color: #428bca;
    text-decoration: none;
  }
`;
exports.default = () => (react_1.default.createElement(PoliciesPage, null,
    react_1.default.createElement(DocumentTitle_1.default, { title: "Policies" }),
    react_1.default.createElement(ui_1.PageHeading, null, "Policies"),
    react_1.default.createElement(MarkdownContent_1.default, { dangerouslySetInnerHTML: { __html: terms_md_1.default.html } }),
    react_1.default.createElement("br", null),
    react_1.default.createElement(PrivacyPolicyWrapper, null,
        react_1.default.createElement("h2", null, "gnomAD Privacy Policy (Draft)"),
        react_1.default.createElement("p", null,
            "gnomAD\u2019s draft Privacy Policy that outlines what data we store while you are using our website and when you communicate with us, can be found",
            ' ',
            react_1.default.createElement("a", { href: policies_gnomAD_privacy_DRAFT_pdf_1.default, target: "_blank", rel: "noreferrer" }, "here"),
            ". It is currently undergoing legal review and is not yet final.")),
    react_1.default.createElement("br", null),
    react_1.default.createElement(MarkdownContent_1.default, { dangerouslySetInnerHTML: { __html: policies_md_1.default.html } })));
//# sourceMappingURL=PoliciesPage.js.map