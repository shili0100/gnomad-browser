"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
// @ts-expect-error TS(2307) FIXME: Cannot find module '../about/mou.md' or its corres... Remove this comment to see the full error message
const mou_md_1 = __importDefault(require("../about/mou.md"));
const DocumentTitle_1 = __importDefault(require("./DocumentTitle"));
const InfoPage_1 = __importDefault(require("./InfoPage"));
const MarkdownContent_1 = __importDefault(require("./MarkdownContent"));
const MOUHeading = styled_components_1.default.h1 `
  text-align: center;

  @media print {
    font-size: 16pt; /* stylelint-disable-line */
  }
`;
const PrintButton = (0, styled_components_1.default)(ui_1.Button) `
  margin-top: 2em;

  @media print {
    display: none;
  }
`;
exports.default = () => (react_1.default.createElement(InfoPage_1.default, null,
    react_1.default.createElement(DocumentTitle_1.default, { title: "Memorandum of Understanding" }),
    react_1.default.createElement(MOUHeading, null,
        react_1.default.createElement("span", { style: { textTransform: 'uppercase' } }, "Memorandum of Understanding"),
        react_1.default.createElement("br", null),
        "Participation in the Genome Aggregation Database (gnomAD)"),
    react_1.default.createElement(MarkdownContent_1.default, { dangerouslySetInnerHTML: { __html: mou_md_1.default.html } }),
    react_1.default.createElement("p", null, "You indicate your agreement with this MOU by signing below:"),
    react_1.default.createElement("dl", null,
        react_1.default.createElement("dt", { style: { textTransform: 'uppercase' } }, "Participant:"),
        react_1.default.createElement("dd", { style: { marginLeft: 0 } },
            react_1.default.createElement("br", null),
            react_1.default.createElement("span", { "aria-hidden": "true" }, "____________________________")),
        react_1.default.createElement("dt", null, "Consortium:"),
        react_1.default.createElement("dd", null),
        react_1.default.createElement("dt", null, "Name:"),
        react_1.default.createElement("dd", null),
        react_1.default.createElement("dt", null, "Title:"),
        react_1.default.createElement("dd", null),
        react_1.default.createElement("dt", null, "Date:"),
        react_1.default.createElement("dd", null)),
    react_1.default.createElement(PrintButton, { onClick: () => {
            window.print();
        } }, "Print this page")));
//# sourceMappingURL=MOUPage.js.map