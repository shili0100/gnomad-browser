"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const DocumentTitle_1 = __importDefault(require("./DocumentTitle"));
const InfoPage_1 = __importDefault(require("./InfoPage"));
const Link_1 = __importDefault(require("./Link"));
const PageNotFoundPage = () => (react_1.default.createElement(InfoPage_1.default, null,
    react_1.default.createElement(DocumentTitle_1.default, { title: "Not Found" }),
    react_1.default.createElement(ui_1.PageHeading, null, "Page Not Found"),
    react_1.default.createElement("p", null,
        "This page does not exist. Try searching for a gene, region, or variant or go to the",
        ' ',
        react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: "/" }, "home page"),
        ".")));
exports.default = PageNotFoundPage;
//# sourceMappingURL=PageNotFoundPage.js.map