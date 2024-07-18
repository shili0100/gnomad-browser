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
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const AttributeList_1 = __importStar(require("../AttributeList"));
const RegionInfo = ({ region }) => {
    const { reference_genome: referenceGenome, chrom, start, stop } = region;
    const ucscReferenceGenomeId = referenceGenome === 'GRCh37' ? 'hg19' : 'hg38';
    const ucscUrl = `https://genome.ucsc.edu/cgi-bin/hgTracks?db=${ucscReferenceGenomeId}&position=chr${chrom}%3A${start}-${stop}`;
    return (react_1.default.createElement(AttributeList_1.default, { style: { marginTop: '1.25em' } },
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Genome build" },
            referenceGenome,
            " / ",
            ucscReferenceGenomeId),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Region size" },
            (stop - start + 1).toLocaleString(),
            " BP"),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "External resources" },
            react_1.default.createElement(ui_1.ExternalLink, { href: ucscUrl }, "UCSC Browser"))));
};
exports.default = RegionInfo;
//# sourceMappingURL=RegionInfo.js.map