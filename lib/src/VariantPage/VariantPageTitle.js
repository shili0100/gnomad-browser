"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const TitleWrapper = styled_components_1.default.span `
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  max-width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const Separator = styled_components_1.default.span `
  @media (max-width: 900px) {
    display: none;
  }
`;
const VariantIdWrapper = styled_components_1.default.span `
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  max-width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const VariantIdSeparator = styled_components_1.default.span `
  @media (max-width: 600px) {
    display: none;
  }
`;
const TitleAlleles = styled_components_1.default.span `
  flex-shrink: 1;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const VariantPageTitle = ({ datasetId, variantId }) => {
    const [chrom, pos, ref, alt] = variantId.split('-');
    let variantDescription = 'Variant';
    if (ref.length === 1 && alt.length === 1) {
        variantDescription = 'SNV';
    }
    if (ref.length < alt.length) {
        const insertionLength = alt.length - ref.length;
        variantDescription = `Insertion (${insertionLength} base${insertionLength > 1 ? 's' : ''})`;
    }
    if (ref.length > alt.length) {
        const deletionLength = ref.length - alt.length;
        variantDescription = `Deletion (${deletionLength} base${deletionLength > 1 ? 's' : ''})`;
    }
    return (react_1.default.createElement(TitleWrapper, null,
        variantDescription === 'SNV' ? (
        // @ts-expect-error TS(2322) -- error from gnomad-browser-toolkit component
        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Single nucleotide variant" },
            react_1.default.createElement("span", null, variantDescription))) : (react_1.default.createElement("span", null, variantDescription)),
        react_1.default.createElement(Separator, { style: { width: '1ch' } }, ":"),
        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: variantId },
            react_1.default.createElement(VariantIdWrapper, null,
                react_1.default.createElement("span", null,
                    chrom,
                    "-",
                    pos),
                react_1.default.createElement(VariantIdSeparator, null, "-"),
                react_1.default.createElement(TitleAlleles, null,
                    ref,
                    "-",
                    alt))),
        react_1.default.createElement(Separator, null, " "),
        react_1.default.createElement("span", null,
            "(",
            (0, metadata_1.referenceGenome)(datasetId),
            ")")));
};
exports.default = VariantPageTitle;
//# sourceMappingURL=VariantPageTitle.js.map