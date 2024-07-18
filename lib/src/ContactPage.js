"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const DocumentTitle_1 = __importDefault(require("./DocumentTitle"));
const InfoPage_1 = __importDefault(require("./InfoPage"));
exports.default = () => (react_1.default.createElement(InfoPage_1.default, null,
    react_1.default.createElement(DocumentTitle_1.default, { title: "Contact" }),
    react_1.default.createElement(ui_1.PageHeading, null, "Contact"),
    react_1.default.createElement("p", null,
        "Tell us how you use gnomAD and your wish list by filling out",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "http://broad.io/2024_survey" }, "our user survey"),
        "."),
    react_1.default.createElement("p", null,
        "Use the gnomAD",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "https://discuss.gnomad.broadinstitute.org/new-topic?category=General" }, "Forum"),
        ' ',
        "to request help, discuss the data, and ask questions.*"),
    react_1.default.createElement("p", null,
        "Report errors in the website on",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "https://github.com/broadinstitute/gnomad-browser/issues/new?labels=Type%3A%20Bug" }, "GitHub"),
        ' ',
        "or the",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "https://discuss.gnomad.broadinstitute.org/new-topic?category=Browser&tags=bug" }, "Forum")),
    react_1.default.createElement("p", null,
        "For questions about gnomAD, check out the",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "/help" }, "help page"),
        "."),
    react_1.default.createElement("p", null, "Note that, for many reasons (including consent and data usage restrictions), we do not have (and cannot share) phenotype information. Overall, we have limited information that we can share for some cohorts, such as last known age in bins of 5 years (when known) and chromosomal sex."),
    react_1.default.createElement("p", null,
        "Follow us on Twitter",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "https://twitter.com/gnomad_project" }, "@gnomad_project"),
        "."),
    react_1.default.createElement("br", null),
    react_1.default.createElement("p", null,
        "*Alternately, you can",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: "mailto:gnomad@broadinstitute.org" }, "email us"),
        ". Please note that we prioritize answering issues on Github and topics on the Forum, so if you choose to email it may take us longer to respond.")));
//# sourceMappingURL=ContactPage.js.map