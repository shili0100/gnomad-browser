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
exports.DownloadLinks = exports.GetUrlButtons = exports.DownloadsSection = exports.Column = exports.ColumnsWrapper = exports.StyledParagraph = exports.SectionTitle = exports.FileList = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const AnchorLink_1 = require("../AnchorLink");
const analytics_1 = require("../analytics");
exports.FileList = (0, styled_components_1.default)(ui_1.List) `
  li {
    line-height: 1.25;
  }
`;
const BaseSectionTitle = styled_components_1.default.h2 `
  font-size: ${(props) => 
// eslint-disable-next-line no-nested-ternary
props.theme.type === 'release'
    ? '2.25rem'
    : props.theme.type === 'datasets'
        ? '1.88rem'
        : '1.5rem'};
`;
exports.SectionTitle = (0, styled_components_1.default)((0, AnchorLink_1.withAnchor)(BaseSectionTitle)) ``;
exports.StyledParagraph = styled_components_1.default.p `
  padding-bottom: 1rem;
`;
exports.ColumnsWrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
exports.Column = styled_components_1.default.div `
  flex-basis: calc(50% - 25px);

  @media (max-width: 900px) {
    flex-basis: 100%;
  }

  > h3 {
    margin-top: 0;
  }
`;
exports.DownloadsSection = styled_components_1.default.section `
  margin-bottom: 5rem;
`;
const ShowURLButton = (_a) => {
    var { label, url, logClicks } = _a, otherProps = __rest(_a, ["label", "url", "logClicks"]);
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.TextButton, Object.assign({}, otherProps, { onClick: () => {
                if (logClicks) {
                    (0, analytics_1.logButtonClick)(`User showed or copied URL for ${label}`);
                }
                setIsExpanded(true);
            } })),
        isExpanded && (react_1.default.createElement(ui_1.Modal, { size: "large", title: label, footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: () => {
                        setIsExpanded(false);
                    } }, "Ok"),
                navigator.clipboard && navigator.clipboard.writeText && (react_1.default.createElement(ui_1.PrimaryButton, { onClick: () => {
                        navigator.clipboard.writeText(url);
                    }, style: { marginLeft: '1em' } }, "Copy URL"))), onRequestClose: () => {
                setIsExpanded(false);
            } }, url))));
};
const renderDownloadOptions = (elements) => {
    return elements
        .filter((el) => el)
        .flatMap((el) => [' / ', el])
        .slice(1);
};
// @ts-expect-error TS(7022) FIXME: 'GetUrlButtons' implicitly has type 'any' because ... Remove this comment to see the full error message
const GetUrlButtons = ({ gcsBucket, label, path, size, md5, includeGCP, includeAWS, includeAzure, logClicks = false, }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", null, label),
        react_1.default.createElement("br", null),
        size && md5 && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", null,
                size,
                ", MD5:\u00A0",
                md5),
            react_1.default.createElement("br", null))),
        "Show URL for",
        ' ',
        renderDownloadOptions([
            includeGCP && (
            // @ts-expect-error TS(2322) FIXME: Type '{ children: string; key: string; "aria-label... Remove this comment to see the full error message
            react_1.default.createElement(ShowURLButton, { key: "gcp", "aria-label": `Show Google URL for ${label}`, label: label, url: `gs://${gcsBucket}${path}`, logClicks: logClicks }, "Google")),
            includeAWS && (
            // @ts-expect-error TS(2322) FIXME: Type '{ children: string; key: string; "aria-label... Remove this comment to see the full error message
            react_1.default.createElement(ShowURLButton, { key: "aws", "aria-label": `Show Amazon URL for ${label}`, label: label, url: `s3://gnomad-public-us-east-1${path}`, logClicks: logClicks }, "Amazon")),
            includeAzure && (
            // @ts-expect-error TS(2322) FIXME: Type '{ children: string; key: string; "aria-label... Remove this comment to see the full error message
            react_1.default.createElement(ShowURLButton, { key: "azure", "aria-label": `Show Microsoft URL for ${label}`, label: label, url: `https://datasetgnomad.blob.core.windows.net/dataset${path}`, logClicks: logClicks }, "Microsoft")),
        ]),
        navigator.clipboard && navigator.clipboard.writeText && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("br", null),
            "Copy URL for",
            ' ',
            renderDownloadOptions([
                includeGCP && (react_1.default.createElement(ui_1.TextButton, { key: "gcp", "aria-label": `Copy Google URL for ${label}`, onClick: () => {
                        if (logClicks) {
                            (0, analytics_1.logButtonClick)(`User showed or copied URL for ${label}`);
                        }
                        navigator.clipboard.writeText(`gs://${gcsBucket}${path}`);
                    } }, "Google")),
                includeAWS && (react_1.default.createElement(ui_1.TextButton, { key: "aws", "aria-label": `Copy Amazon URL for ${label}`, onClick: () => {
                        if (logClicks) {
                            (0, analytics_1.logButtonClick)(`User showed or copied URL for ${label}`);
                        }
                        navigator.clipboard.writeText(`s3://gnomad-public-us-east-1${path}`);
                    } }, "Amazon")),
                includeAzure && (react_1.default.createElement(ui_1.TextButton, { key: "azure", "aria-label": `Copy Microsoft URL for ${label}`, onClick: () => {
                        if (logClicks) {
                            (0, analytics_1.logButtonClick)(`User showed or copied URL for ${label}`);
                        }
                        navigator.clipboard.writeText(`https://datasetgnomad.blob.core.windows.net/dataset${path}`);
                    } }, "Microsoft")),
            ])))));
};
exports.GetUrlButtons = GetUrlButtons;
exports.GetUrlButtons.defaultProps = {
    gcsBucket: 'gcp-public-data--gnomad',
    size: undefined,
    md5: undefined,
    includeGCP: true,
    includeAWS: true,
    includeAzure: true,
};
const DownloadLinks = ({ label, path, size, md5, crc32c, gcsBucket = 'gcp-public-data--gnomad', includeGCP = true, includeAWS = true, includeAzure = true, associatedFileType, }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", null, label),
        react_1.default.createElement("br", null),
        size && md5 && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", null,
                size,
                ", MD5:\u00A0",
                md5),
            react_1.default.createElement("br", null))),
        size && crc32c && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", null,
                size,
                ", CRC32C:\u00A0",
                crc32c),
            react_1.default.createElement("br", null))),
        react_1.default.createElement("span", null,
            "Download from",
            ' ',
            renderDownloadOptions([
                includeGCP && (
                // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
                react_1.default.createElement(ui_1.ExternalLink, { key: "gcp", "aria-label": `Download ${label} from Google`, href: `https://storage.googleapis.com/${gcsBucket}${path}` }, "Google")),
                includeAWS && (
                // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
                react_1.default.createElement(ui_1.ExternalLink, { key: "aws", "aria-label": `Download ${label} from Amazon`, href: `https://gnomad-public-us-east-1.s3.amazonaws.com${path}` }, "Amazon")),
                includeAzure && (
                // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
                react_1.default.createElement(ui_1.ExternalLink, { key: "azure", "aria-label": `Download ${label} from Microsoft`, href: `https://datasetgnomad.blob.core.windows.net/dataset${path}` }, "Microsoft")),
            ])),
        associatedFileType && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("br", null),
            react_1.default.createElement("span", null,
                "Download ",
                associatedFileType.toUpperCase(),
                " from",
                ' ',
                renderDownloadOptions([
                    includeGCP && (
                    // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
                    react_1.default.createElement(ui_1.ExternalLink, { key: "gcp", "aria-label": `Download ${associatedFileType.toUpperCase()} file for ${label} from Google`, href: `https://storage.googleapis.com/${gcsBucket}${path}.${associatedFileType.toLowerCase()}` }, "Google")),
                    includeAWS && (
                    // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
                    react_1.default.createElement(ui_1.ExternalLink, { key: "aws", "aria-label": `Download ${associatedFileType.toUpperCase()} file for ${label} from Amazon`, href: `https://gnomad-public-us-east-1.s3.amazonaws.com${path}.${associatedFileType.toLowerCase()}` }, "Amazon")),
                    includeAzure && (
                    // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
                    react_1.default.createElement(ui_1.ExternalLink, { key: "azure", "aria-label": `Download ${associatedFileType.toUpperCase()} file for ${label} from Microsoft`, href: `https://datasetgnomad.blob.core.windows.net/dataset${path}.${associatedFileType.toLowerCase()}` }, "Microsoft")),
                ]))))));
};
exports.DownloadLinks = DownloadLinks;
//# sourceMappingURL=downloadsPageStyles.js.map