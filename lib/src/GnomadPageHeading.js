"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const DatasetSelector_1 = __importDefault(require("./DatasetSelector"));
const InfoButton_1 = __importDefault(require("./help/InfoButton"));
const PageHeadingWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #ccc;
  margin: 0.67em 0;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 0.25em;
  }

  @media (max-width: 900px) {
    align-items: center;
  }
`;
const PageHeadingInnerWrapper = styled_components_1.default.div `
  display: flex;
  flex-shrink: 1;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
  padding: 3px 0;

  @media (max-width: 1200px) {
    margin-bottom: 1em;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const CenterPanel = styled_components_1.default.div `
  flex-shrink: 0;

  @media (max-width: 900px) {
    margin: 0.25em 0;
  }
`;
const PageHeadingText = styled_components_1.default.h1 `
  overflow: hidden;
  max-width: 100%;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;
const PageControlsWrapper = styled_components_1.default.div `
  display: flex;
  flex-shrink: 0;
  align-items: center;

  @media (min-width: 900px) {
    margin-left: 1ch;
  }
`;
const Label = styled_components_1.default.span `
  margin-right: 0.5em;
`;
const GnomadPageHeading = ({ children, extra, datasetOptions, selectedDataset }) => (react_1.default.createElement(PageHeadingWrapper, null,
    react_1.default.createElement(PageHeadingInnerWrapper, null,
        react_1.default.createElement(PageHeadingText, null, children),
        extra && react_1.default.createElement(CenterPanel, null, extra)),
    react_1.default.createElement(PageControlsWrapper, null,
        react_1.default.createElement(Label, null, "Dataset"),
        react_1.default.createElement(DatasetSelector_1.default, { datasetOptions: datasetOptions, selectedDataset: selectedDataset }),
        react_1.default.createElement("span", null,
            react_1.default.createElement(InfoButton_1.default, { topic: "dataset-selection" })))));
GnomadPageHeading.defaultProps = {
    extra: undefined,
};
exports.default = GnomadPageHeading;
//# sourceMappingURL=GnomadPageHeading.js.map