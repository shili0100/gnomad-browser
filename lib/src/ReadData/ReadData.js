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
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const Query_1 = require("../Query");
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const ChartStyles_1 = require("../ChartStyles");
const analytics_1 = require("../analytics");
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const IGVBrowser = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./IGVBrowser'))));
const LoadReadsControls = styled_components_1.default.div `
  margin-bottom: 3rem;
`;
const NoReadsSpacer = styled_components_1.default.div `
  margin-bottom: 10rem;
`;
function getBrowserConfig(datasetId, locus) {
    if ((0, metadata_1.isV4)(datasetId)) {
        return {
            locus,
            reference: {
                fastaURL: '/reads/reference/Homo_sapiens_assembly38.fasta',
                id: 'hg38',
                indexURL: '/reads/reference/Homo_sapiens_assembly38.fasta.fai',
            },
            tracks: [
                {
                    name: 'GENCODE v39',
                    // @ts-ignore
                    format: 'refgene',
                    url: '/reads/reference/gencode.v39.hg38.sorted.txt.gz',
                    indexURL: '/reads/reference/gencode.v39.hg38.sorted.txt.gz.tbi',
                    indexed: true,
                    displayMode: 'SQUISHED',
                    searchable: true,
                    removable: false,
                    // height: 350,
                    visibilityWindow: -1,
                    color: 'rgb(76,171,225)',
                },
            ],
        };
    }
    if ((0, metadata_1.usesGrch37)(datasetId)) {
        return {
            locus,
            reference: {
                fastaURL: '/reads/reference/Homo_sapiens_assembly19.fasta',
                id: 'hg19',
                indexURL: '/reads/reference/Homo_sapiens_assembly19.fasta.fai',
            },
            tracks: [
                {
                    displayMode: 'SQUISHED',
                    indexURL: '/reads/reference/gencode.v19.bed.gz.tbi',
                    name: 'GENCODE v19',
                    removable: false,
                    url: '/reads/reference/gencode.v19.bed.gz',
                },
            ],
        };
    }
    if ((0, metadata_1.usesGrch38)(datasetId)) {
        return {
            locus,
            reference: {
                fastaURL: '/reads/reference/Homo_sapiens_assembly38.fasta',
                id: 'hg38',
                indexURL: '/reads/reference/Homo_sapiens_assembly38.fasta.fai',
            },
            tracks: [
                {
                    displayMode: 'SQUISHED',
                    indexURL: '/reads/reference/gencode.v35.bed.gz.tbi',
                    name: 'GENCODE v35',
                    removable: false,
                    url: '/reads/reference/gencode.v35.bed.gz',
                },
            ],
        };
    }
    throw new Error('Could not determine browser config for readviz');
}
const ControlContainer = styled_components_1.default.div `
  /* Offset the 80px wide label to center buttons under the IGV browser */
  padding-right: 80px;
  margin-top: 1em;
  text-align: center;

  strong {
    display: inline-block;
    width: 80px;
    text-align: right;
  }

  button {
    margin-left: 2em;
  }

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 0;

    strong {
      width: auto;
      margin-bottom: 0.5em;
    }

    button {
      margin-left: 0 !important;

      &:last-child {
        margin-top: 1em;
      }
    }
  }
`;
// @ts-expect-error TS(2322) FIXME: Type 'Requireable<InferProps<{ bamPath: Validator<... Remove this comment to see the full error message
const ReadDataPropType = prop_types_1.default.shape({
    bamPath: prop_types_1.default.string.isRequired,
    category: prop_types_1.default.oneOf(['het', 'hom', 'hemi']).isRequired,
    indexPath: prop_types_1.default.string.isRequired,
    label: prop_types_1.default.string,
    readGroup: prop_types_1.default.string.isRequired,
});
class ReadData extends react_1.Component {
    constructor(props) {
        super(props);
        this.onCreateBrowser = (igvBrowser) => {
            this.igvBrowser = igvBrowser;
            this.loadInitialTracks();
        };
        const { exomeReads, genomeReads } = this.props;
        this.state = {
            loadOnce: false,
            alwaysLoad: false, // TODO: Need to use context here
            tracksAvailable: {
                exome: exomeReads.reduce((acc, read) => (Object.assign(Object.assign({}, acc), { [read.category]: acc[read.category] + 1 })), { het: 0, hom: 0, hemi: 0 }),
                genome: genomeReads.reduce((acc, read) => (Object.assign(Object.assign({}, acc), { [read.category]: acc[read.category] + 1 })), { het: 0, hom: 0, hemi: 0 }),
            },
            tracksLoaded: {
                exome: {
                    het: 0,
                    hom: 0,
                    hemi: 0,
                },
                genome: {
                    het: 0,
                    hom: 0,
                    hemi: 0,
                },
            },
        };
        this.tracksLoaded = {
            exome: {
                het: 0,
                hom: 0,
                hemi: 0,
            },
            genome: {
                het: 0,
                hom: 0,
                hemi: 0,
            },
        };
    }
    hasReadData(exomeOrGenome) {
        const { exomeReads, genomeReads } = this.props;
        if (exomeOrGenome === 'exome') {
            return exomeReads && exomeReads.length > 0;
        }
        if (exomeOrGenome === 'genome') {
            return genomeReads && genomeReads.length > 0;
        }
        return false;
    }
    canLoadMoreTracks(exomeOrGenome, category) {
        const { showHemizygotes } = this.props;
        const { tracksAvailable, tracksLoaded } = this.state;
        if (!this.hasReadData(exomeOrGenome)) {
            return false;
        }
        if (category === 'hemi' && !showHemizygotes) {
            return false;
        }
        const tracksAvailableForCategory = tracksAvailable[exomeOrGenome][category];
        const tracksLoadedForCategory = tracksLoaded[exomeOrGenome][category];
        return tracksLoadedForCategory < tracksAvailableForCategory;
    }
    loadNextTrack(exomeOrGenome, category) {
        const { exomeReads, genomeReads } = this.props;
        const reads = {
            exome: exomeReads,
            genome: genomeReads,
        }[exomeOrGenome];
        const tracksLoadedForCategory = this.tracksLoaded[exomeOrGenome][category];
        const readsInCategory = reads.filter((r) => r.category === category);
        const nextRead = readsInCategory[tracksLoadedForCategory];
        const trackConfig = {
            autoHeight: false,
            colorBy: 'strand',
            format: 'bam',
            height: 300,
            indexURL: nextRead.indexPath,
            name: nextRead.label || `${category} [${exomeOrGenome}] #${tracksLoadedForCategory + 1}`,
            pairsSupported: false,
            readgroup: nextRead.readGroup,
            removable: false,
            samplingDepth: 1000,
            type: 'alignment',
            url: nextRead.bamPath,
        };
        this.setState((state) => (Object.assign(Object.assign({}, state), { tracksLoaded: Object.assign(Object.assign({}, state.tracksLoaded), { [exomeOrGenome]: Object.assign(Object.assign({}, state.tracksLoaded[exomeOrGenome]), { [category]: state.tracksLoaded[exomeOrGenome][category] + 1 }) }) })));
        this.tracksLoaded = Object.assign(Object.assign({}, this.tracksLoaded), { [exomeOrGenome]: Object.assign(Object.assign({}, this.tracksLoaded[exomeOrGenome]), { [category]: this.tracksLoaded[exomeOrGenome][category] + 1 }) });
        this.igvBrowser.loadTrack(trackConfig);
    }
    loadInitialTracks() {
        ;
        ['exome', 'genome'].forEach((exomeOrGenome) => {
            ;
            ['het', 'hom', 'hemi'].forEach((category) => {
                if (this.canLoadMoreTracks(exomeOrGenome, category)) {
                    this.loadNextTrack(exomeOrGenome, category);
                }
            });
        });
    }
    loadAllTracks() {
        const { tracksAvailable, tracksLoaded } = this.state;
        ['exome', 'genome'].forEach((exomeOrGenome) => {
            ;
            ['het', 'hom', 'hemi'].forEach((category) => {
                const tracksAvailableForCategory = tracksAvailable[exomeOrGenome][category];
                const tracksLoadedForCategory = tracksLoaded[exomeOrGenome][category];
                for (let i = tracksLoadedForCategory; i < tracksAvailableForCategory; i += 1) {
                    this.loadNextTrack(exomeOrGenome, category);
                }
            });
        });
    }
    renderLoadMoreButton(exomeOrGenome, category) {
        return (react_1.default.createElement(ui_1.Button, { disabled: !this.canLoadMoreTracks(exomeOrGenome, category), onClick: () => this.loadNextTrack(exomeOrGenome, category) },
            "Load +1 ",
            category));
    }
    render() {
        const { children, datasetId, chrom, start, stop, showHemizygotes } = this.props;
        if (!this.hasReadData('exome') && !this.hasReadData('genome')) {
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, "No read data available for this variant."),
                !(0, metadata_1.hasNonCodingReadData)(datasetId) && (react_1.default.createElement("p", null,
                    react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                    " Read data for non-coding regions is not available in gnomAD v2.1.1 and ExAC."))));
        }
        const locus = `${chrom}:${start}-${stop}`;
        const browserConfig = getBrowserConfig(datasetId, locus);
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("p", null,
                "This interactive",
                ' ',
                react_1.default.createElement(ui_1.ExternalLink, { href: "https://github.com/igvteam/igv.js" }, "IGV.js"),
                " visualization shows reads that went into calling this variant. Reads may not be available for every sample carrying this variant."),
            react_1.default.createElement("p", null,
                "These are reassembled reads produced by",
                ' ',
                react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.broadinstitute.org/gatk/gatkdocs/org_broadinstitute_gatk_tools_walkers_haplotypecaller_HaplotypeCaller.php#--bamOutput" }, "GATK HaplotypeCaller --bamOutput"),
                ", so they accurately represent what HaplotypeCaller was seeing when it called this variant."),
            (0, metadata_1.readsIncludeLowQualityGenotypes)(datasetId) && (react_1.default.createElement("p", null,
                react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                " Reads shown here may include low quality genotypes that were excluded from allele counts.")),
            (0, metadata_1.isSubset)(datasetId) && (react_1.default.createElement("p", null,
                react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                " Samples shown below are not guaranteed to be part of the selected subset.")),
            children,
            react_1.default.createElement(react_1.Suspense, { fallback: null },
                react_1.default.createElement(IGVBrowser, { config: browserConfig, onCreateBrowser: this.onCreateBrowser })),
            this.hasReadData('exome') && (react_1.default.createElement(ControlContainer, null,
                react_1.default.createElement("strong", null, "Exomes:"),
                this.renderLoadMoreButton('exome', 'het'),
                this.renderLoadMoreButton('exome', 'hom'),
                showHemizygotes && this.renderLoadMoreButton('exome', 'hemi'))),
            this.hasReadData('genome') && (react_1.default.createElement(ControlContainer, null,
                react_1.default.createElement("strong", null, "Genomes:"),
                this.renderLoadMoreButton('genome', 'het'),
                this.renderLoadMoreButton('genome', 'hom'),
                showHemizygotes && this.renderLoadMoreButton('genome', 'hemi'))),
            react_1.default.createElement(ControlContainer, null,
                react_1.default.createElement(ui_1.Button, { disabled: !(this.canLoadMoreTracks('exome', 'het') ||
                        this.canLoadMoreTracks('exome', 'hom') ||
                        this.canLoadMoreTracks('exome', 'hemi') ||
                        this.canLoadMoreTracks('genome', 'het') ||
                        this.canLoadMoreTracks('genome', 'hom') ||
                        this.canLoadMoreTracks('genome', 'hemi')), onClick: () => this.loadAllTracks(), style: { marginLeft: '80px' } }, "Load all"))));
    }
}
ReadData.defaultProps = {
    children: undefined,
    showHemizygotes: false,
};
const interleaveReads = (allVariantReads) => {
    let reads = [];
    ['het', 'hom', 'hemi'].forEach((category) => {
        const allReadsInCategory = allVariantReads.map((variantReads) => variantReads.filter((read) => read.category === category));
        while (allReadsInCategory.some((variantReads) => variantReads.length)) {
            reads = reads.concat(allReadsInCategory
                .map((variantReads) => variantReads.shift())
                .filter((read) => read !== undefined));
        }
    });
    return reads;
};
const ReadDataContainer = ({ datasetId, variantIds }) => {
    const localStorageItemName = 'alwaysLoadReadsDataOnVariantPage';
    const [loadOnce, setLoadOnce] = (0, react_1.useState)(false);
    const [alwaysLoad, setAlwaysLoad] = (0, react_1.useState)(() => localStorage.getItem(localStorageItemName) === 'true');
    (0, react_1.useEffect)(() => {
        localStorage.setItem(localStorageItemName, alwaysLoad.toString());
    }, [alwaysLoad]);
    if (variantIds.length === 0) {
        return null;
    }
    // Reads are not broken down by subset.
    const readsDatasetId = (0, metadata_1.readsDatasetId)(datasetId);
    const query = `
    query ReadData {
      ${variantIds
        .map((variantId, i) => `variant_${i}: variantReads(dataset: ${readsDatasetId}, variantId: "${variantId}") {
        exome {
          bamPath
          category
          indexPath
          readGroup
        }
        genome {
          bamPath
          category
          indexPath
          readGroup
        }
      }`)
        .join('\n')}
    }
  `;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(LoadReadsControls, null,
            react_1.default.createElement(InfoButton_1.default, { topic: "hidden-reads-visualization" }),
            ' ',
            react_1.default.createElement(ui_1.Button, { id: "load-once", disabled: loadOnce, onClick: () => {
                    (0, analytics_1.logButtonClick)('User loaded readviz data once');
                    setLoadOnce(!loadOnce);
                } }, "Load read data"),
            react_1.default.createElement("div", null,
                react_1.default.createElement("br", null),
                react_1.default.createElement(ChartStyles_1.CheckboxInput, { id: "always-load", checked: alwaysLoad, onChange: (e) => {
                        if (e.target.checked) {
                            (0, analytics_1.logButtonClick)('User toggled option to always load readviz data on');
                        }
                        setAlwaysLoad(e.target.checked);
                        setLoadOnce(true);
                    } }),
                "Always load read data")),
        !loadOnce && !alwaysLoad && react_1.default.createElement(NoReadsSpacer, null),
        (loadOnce || alwaysLoad) && (react_1.default.createElement(Query_1.BaseQuery, { operationName: "ReadData", query: query, url: "/reads/" }, ({ data, error, graphQLErrors, loading }) => {
            if (loading) {
                return react_1.default.createElement(StatusMessage_1.default, null, "Loading reads...");
            }
            if (error || !data) {
                return react_1.default.createElement(StatusMessage_1.default, null, "Unable to load reads");
            }
            const variants = variantIds.map((variantId) => {
                const [chrom, pos, ref, alt] = variantId.split('-');
                return { chrom, pos: Number(pos), ref, alt };
            });
            // Assume all variants are on the same chromosome
            const { chrom } = variants[0];
            const minPosition = variants.reduce((minPos, variant) => Math.min(minPos, variant.pos), Infinity);
            const maxPosition = variants.reduce((maxPos, variant) => Math.max(maxPos, variant.pos), -Infinity);
            const positionDifference = maxPosition - minPosition;
            const [start, stop] = positionDifference > 80
                ? [minPosition, maxPosition]
                : [
                    minPosition - Math.ceil((80 - positionDifference) / 2),
                    maxPosition + Math.floor((80 - positionDifference) / 2),
                ];
            // Concatenate reads from all variants
            const exomeReads = interleaveReads(variantIds.map((variantId, i) => {
                const categoryCount = { het: 0, hom: 0, hemi: 0 };
                return (data[`variant_${i}`].exome || []).map((read) => {
                    const { category } = read;
                    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    categoryCount[category] += 1;
                    return Object.assign(Object.assign({}, read), { label: `${variantIds.length > 1 ? `${variantId} ` : ''}${category} [exome] #${
                        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        categoryCount[category]}` });
                });
            }));
            const genomeReads = interleaveReads(variantIds.map((variantId, i) => {
                const categoryCount = { het: 0, hom: 0, hemi: 0 };
                return (data[`variant_${i}`].genome || []).map((read) => {
                    const { category } = read;
                    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    categoryCount[category] += 1;
                    return Object.assign(Object.assign({}, read), { label: `${variantIds.length > 1 ? `${variantId} ` : ''}${category} [genome] #${
                        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        categoryCount[category]}` });
                });
            }));
            return (react_1.default.createElement(ReadData, { datasetId: datasetId, referenceGenome: readsDatasetId === 'exac' || readsDatasetId === 'gnomad_r2' ? 'GRCh37' : 'GRCh38', chrom: chrom, start: start, stop: stop, exomeReads: exomeReads, genomeReads: genomeReads, showHemizygotes: chrom === 'X' || chrom === 'Y' }, graphQLErrors && (react_1.default.createElement("p", null,
                react_1.default.createElement(ui_1.Badge, { level: "warning" }, "Warning"),
                ' ',
                graphQLErrors.map((e) => e.message).join('. '),
                "."))));
        }))));
};
exports.default = ReadDataContainer;
//# sourceMappingURL=ReadData.js.map