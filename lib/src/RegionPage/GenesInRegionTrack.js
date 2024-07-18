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
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const track_genes_1 = require("@gnomad/track-genes");
const Link_1 = __importDefault(require("../Link"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const GeneLink = (0, styled_components_1.default)(Link_1.default) `
  text {
    fill: #1173bb;
    text-decoration: none;
  }

  &:visited,
  &:active {
    text {
      fill: #1173bb;
    }
  }

  &:focus,
  &:hover {
    text {
      text-decoration: underline;
    }
  }
`;
const TopPanel = styled_components_1.default.div `
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
`;
const Label = styled_components_1.default.label `
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CheckboxInput = styled_components_1.default.input.attrs({ type: 'checkbox' }) `
  margin-right: 0.5em;
`;
const TitlePanel = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const StatusMessage = (0, styled_components_1.default)(StatusMessage_1.default) `
  padding: 0;
  margin: 0 auto 1em;
`;
const isCodingGene = (gene) => gene.exons.some((exon) => exon.feature_type === 'CDS');
const GenesInRegionTrack = ({ genes, region }) => {
    const codingGenes = genes.filter(isCodingGene);
    const hasCodingGenes = codingGenes.length > 0;
    const hasNonCodingGenes = genes.length > 0 && genes.length > codingGenes.length;
    // If no genes are present or all genes are coding, default to true and disable checkbox to indicate that no more genes are available.
    // If all genes are non-coding, default to true and disable checkbox.
    const [includeNonCodingGenes, setIncludeNonCodingGenes] = (0, react_1.useState)(genes.length === 0 || !hasCodingGenes || !hasNonCodingGenes || region.chrom === 'M');
    return (react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: () => (react_1.default.createElement(TitlePanel, null, hasNonCodingGenes && !includeNonCodingGenes ? 'Coding genes' : 'Genes')), renderTopPanel: () => genes.length > 0 && (react_1.default.createElement(TopPanel, null,
            react_1.default.createElement(Label, { htmlFor: "genes-track-include-non-coding-genes" },
                react_1.default.createElement(CheckboxInput, { checked: includeNonCodingGenes, disabled: genes.length === 0 || !(hasCodingGenes && hasNonCodingGenes), id: "genes-track-include-non-coding-genes", onChange: (e) => {
                        setIncludeNonCodingGenes(e.target.checked);
                    } }),
                "Include non-coding genes"))) }, ({ scalePosition, width }) => {
        if (genes.length === 0) {
            return react_1.default.createElement(StatusMessage, null, "No genes found in this region");
        }
        return (react_1.default.createElement(track_genes_1.GenesPlot, { genes: includeNonCodingGenes ? genes : codingGenes, includeNonCodingGenes: true, renderGeneLabel: (gene) => (react_1.default.createElement(GeneLink, { to: `/gene/${gene.gene_id}` },
                react_1.default.createElement("text", { textAnchor: "middle" }, gene.symbol))), scalePosition: scalePosition, width: width }));
    }));
};
exports.default = GenesInRegionTrack;
//# sourceMappingURL=GenesInRegionTrack.js.map