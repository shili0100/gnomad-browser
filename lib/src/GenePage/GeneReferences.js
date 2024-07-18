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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ui_1 = require("@gnomad/ui");
const GeneReferences = ({ gene }) => {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const { gene_id: geneId, symbol: geneSymbol, reference_genome: referenceGenome, chrom, start, stop, hgnc_id: hgncId, ncbi_id: ncbiId, omim_id: omimId, } = gene;
    const ensemblGeneUrl = `https://${referenceGenome === 'GRCh37' ? 'grch37.' : ''}ensembl.org/Homo_sapiens/Gene/Summary?g=${geneId}`;
    const ucscReferenceGenomeId = referenceGenome === 'GRCh37' ? 'hg19' : 'hg38';
    const ucscUrl = `https://genome.ucsc.edu/cgi-bin/hgTracks?db=${ucscReferenceGenomeId}&position=chr${chrom}%3A${start}-${stop}`;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.ExternalLink, { href: ensemblGeneUrl }, "Ensembl"),
        ",",
        ' ',
        react_1.default.createElement(ui_1.ExternalLink, { href: ucscUrl }, "UCSC Browser"),
        ",",
        ' ',
        react_1.default.createElement(ui_1.TextButton, { onClick: () => {
                setIsExpanded(true);
            } }, "and more"),
        isExpanded && (react_1.default.createElement(ui_1.Modal
        // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; initialFocusOnButton: b... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; initialFocusOnButton: b... Remove this comment to see the full error message
            initialFocusOnButton: false, onRequestClose: () => {
                setIsExpanded(false);
            }, title: `External resources for ${geneSymbol}` },
            react_1.default.createElement(ui_1.List, null,
                react_1.default.createElement(ui_1.ListItem, null,
                    react_1.default.createElement(ui_1.ExternalLink, { href: ensemblGeneUrl }, "Ensembl")),
                react_1.default.createElement(ui_1.ListItem, null,
                    react_1.default.createElement(ui_1.ExternalLink, { href: ucscUrl }, "UCSC Browser")),
                react_1.default.createElement(ui_1.ListItem, null,
                    react_1.default.createElement(ui_1.ExternalLink, { href: `https://www.genecards.org/cgi-bin/carddisp.pl?gene=${geneSymbol}` }, "GeneCards")),
                omimId && (
                // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
                react_1.default.createElement(ui_1.ListItem, null,
                    react_1.default.createElement(ui_1.ExternalLink, { href: `https://omim.org/entry/${omimId}` }, "OMIM"))),
                react_1.default.createElement(ui_1.ListItem, null,
                    react_1.default.createElement(ui_1.ExternalLink, { href: `https://deciphergenomics.org/gene/${geneId}/overview/protein-genomic-info` }, "DECIPHER")),
                hgncId && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ui_1.ListItem, null,
                        react_1.default.createElement(ui_1.ExternalLink, { href: `https://search.clinicalgenome.org/kb/genes/${hgncId}` }, "ClinGen")),
                    react_1.default.createElement(ui_1.ListItem, null,
                        react_1.default.createElement(ui_1.ExternalLink, { href: `https://search.thegencc.org/genes/${hgncId}` }, "Gene Curation Coalition (GenCC)")),
                    react_1.default.createElement(ui_1.ListItem, null,
                        react_1.default.createElement(ui_1.ExternalLink, { href: `https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/${hgncId}` }, "HGNC")))),
                ncbiId && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ui_1.ListItem, null,
                        react_1.default.createElement(ui_1.ExternalLink, { href: `https://www.ncbi.nlm.nih.gov/gene/?term=${ncbiId}` }, "NCBI")),
                    react_1.default.createElement(ui_1.ListItem, null,
                        react_1.default.createElement(ui_1.ExternalLink, { href: `https://www.ncbi.nlm.nih.gov/genome/gdv/browser/gene/?id=${ncbiId}` }, "NCBI Genome Data Viewer")))))))));
};
exports.default = GeneReferences;
//# sourceMappingURL=GeneReferences.js.map