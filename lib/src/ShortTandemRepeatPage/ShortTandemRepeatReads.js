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
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const AttributeList_1 = __importStar(require("../AttributeList"));
const Delayed_1 = __importDefault(require("../Delayed"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const useRequest_1 = __importDefault(require("../useRequest"));
const ControlSection_1 = __importDefault(require("../VariantPage/ControlSection"));
const ShortTandemRepeatReadImageWrapper = styled_components_1.default.div `
  width: 100%;
`;
const ShortTandemRepeatReadImage = styled_components_1.default.img `
  &.zoomedOut {
    display: block;
    max-width: 100%;
    cursor: zoom-in;
  }

  &.zoomedIn {
    position: absolute;
    left: 0;
    display: block;
    cursor: zoom-out;
    padding: 10px;
  }
`;
const ShortTandemRepeatRead = ({ read }) => {
    const [readImageZoom, setReadImageZoom] = (0, react_1.useState)('zoomedOut');
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(AttributeList_1.default, { style: { marginBottom: '1em' } },
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Population" }, gnomadPopulations_1.GNOMAD_POPULATION_NAMES[read.population]),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Sex" }, read.sex),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Age" }, read.age || 'Not available for this sample'),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "PCR protocol" }, read.pcr_protocol.replace('pcr', 'PCR').split('_').join(' ')),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Allele 1" },
                read.alleles[0].repeat_unit,
                " repeated ",
                read.alleles[0].repeats,
                " times with a",
                ' ',
                read.alleles[0].repeats_confidence_interval.lower,
                "-",
                read.alleles[0].repeats_confidence_interval.upper,
                " confidence interval"),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Allele 2" }, read.alleles.length > 1 ? (react_1.default.createElement(react_1.default.Fragment, null,
                read.alleles[1].repeat_unit,
                " repeated ",
                read.alleles[1].repeats,
                " times with a",
                ' ',
                read.alleles[1].repeats_confidence_interval.lower,
                "-",
                read.alleles[1].repeats_confidence_interval.upper,
                " confidence interval")) : ('None'))),
        react_1.default.createElement(ShortTandemRepeatReadImageWrapper, null,
            react_1.default.createElement(ShortTandemRepeatReadImage, { alt: "REViewer read visualization", src: read.path, className: readImageZoom, onClick: () => setReadImageZoom(readImageZoom === 'zoomedOut' ? 'zoomedIn' : 'zoomedOut') }))));
};
const ShortTandemRepeatReadContainer = ({ fetchRead, readIndex, }) => {
    const fetchReadMemoized = (0, react_1.useCallback)(() => fetchRead(readIndex), [fetchRead, readIndex]);
    const { isLoading, response: read, error } = (0, useRequest_1.default)(fetchReadMemoized);
    if (isLoading) {
        return (react_1.default.createElement(Delayed_1.default, null,
            react_1.default.createElement(StatusMessage_1.default, null, "Loading read...")));
    }
    if (error) {
        return react_1.default.createElement(StatusMessage_1.default, null, "Unable to load read");
    }
    // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type '{ alleles: ... Remove this comment to see the full error message
    return react_1.default.createElement(ShortTandemRepeatRead, { read: read });
};
const fetchNumReads = ({ datasetId, shortTandemRepeatId, filter }) => {
    return fetch('/reads/', {
        body: JSON.stringify({
            query: `
        query GetShortTandemRepeatNumReads($shortTandemRepeatId: String!, $datasetId: DatasetId!, $filter: ShortTandemRepeatReadsFilter) {
          short_tandem_repeat_reads(id: $shortTandemRepeatId, dataset: $datasetId, filter: $filter) {
            num_reads
          }
        }
      `,
            variables: {
                datasetId,
                shortTandemRepeatId,
                filter,
            },
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((response) => response.data.short_tandem_repeat_reads.num_reads);
};
const fetchReads = ({ datasetId, shortTandemRepeatId, filter, limit, offset }) => {
    return fetch('/reads/', {
        body: JSON.stringify({
            query: `
        query GetShortTandemRepeatNumReads($shortTandemRepeatId: String!, $datasetId: DatasetId!, $filter: ShortTandemRepeatReadsFilter, $limit: Int, $offset: Int) {
          short_tandem_repeat_reads(id: $shortTandemRepeatId, dataset: $datasetId, filter: $filter) {
            reads(limit: $limit, offset: $offset) {
              alleles {
                repeat_unit
                repeats
                repeats_confidence_interval {
                  upper
                  lower
                }
              }
              population
              sex
              age
              pcr_protocol
              path
            }
          }
        }
      `,
            variables: {
                datasetId,
                shortTandemRepeatId,
                filter,
                limit,
                offset,
            },
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((response) => response.data.short_tandem_repeat_reads.reads);
};
const ShortTandemRepeatReads = ({ datasetId, shortTandemRepeat, filter, }) => {
    const fetchReadsTimer = (0, react_1.useRef)(null);
    const fetchNumReadsMemoized = (0, react_1.useCallback)(() => {
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        clearTimeout(fetchReadsTimer.current);
        return new Promise((resolve, reject) => {
            // @ts-expect-error TS(2322) FIXME: Type 'Timeout' is not assignable to type 'null'.
            fetchReadsTimer.current = setTimeout(() => {
                fetchNumReads({ datasetId, shortTandemRepeatId: shortTandemRepeat.id, filter }).then(resolve, reject);
            }, 300);
        });
    }, [datasetId, shortTandemRepeat, filter]);
    const { isLoading, response: numReads, error } = (0, useRequest_1.default)(fetchNumReadsMemoized);
    const readsStore = (0, react_1.useRef)(new Map());
    const [readIndex, setReadIndex] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        readsStore.current.clear();
        setReadIndex(0);
    }, [shortTandemRepeat, filter]);
    const fetchRead = (0, react_1.useMemo)(() => {
        let timer = null;
        return (readIndexToFetch) => {
            const storedRead = readsStore.current.get(readIndexToFetch);
            if (storedRead) {
                return Promise.resolve(storedRead);
            }
            const numReadsToFetch = 50;
            return new Promise((resolve, reject) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const readsPromise = fetchReads({
                        datasetId,
                        shortTandemRepeatId: shortTandemRepeat.id,
                        filter,
                        limit: numReadsToFetch,
                        offset: readIndexToFetch,
                    }).then(null, reject);
                    Array.from(new Array(numReadsToFetch)).forEach((_, i) => {
                        readsStore.current.set(readIndexToFetch + i, readsPromise.then((fetchedReads) => {
                            const read = i < fetchedReads.length ? fetchedReads[i] : null;
                            readsStore.current.set(readIndexToFetch + i, read);
                            return read;
                        }));
                    });
                    resolve(readsStore.current.get(readIndexToFetch));
                }, 150);
            });
        };
    }, [datasetId, shortTandemRepeat, filter]);
    if (isLoading) {
        return (react_1.default.createElement(Delayed_1.default, null,
            react_1.default.createElement(StatusMessage_1.default, null, "Loading read data...")));
    }
    if (error) {
        return react_1.default.createElement(StatusMessage_1.default, null, "Unable to load read data");
    }
    if (numReads === 0) {
        return react_1.default.createElement(StatusMessage_1.default, null, "No matching samples found");
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ControlSection_1.default, { style: { marginBottom: '1em' } },
            react_1.default.createElement(ui_1.Button, { onClick: () => {
                    if (readIndex > 0) {
                        setReadIndex((previousReadIndex) => previousReadIndex - 1);
                    }
                } }, "Previous sample"),
            react_1.default.createElement("span", null,
                "Showing sample ",
                react_1.default.createElement(ui_1.Input, { type: "number", value: readIndex + 1, min: 1, max: numReads, onChange: (e) => {
                        // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
                        setReadIndex(Math.max(0, Math.min(numReads - 1, Number(e.target.value) - 1)));
                    }, style: { width: '10ch' } }),
                ' ',
                "of ",
                numReads.toLocaleString()),
            react_1.default.createElement(ui_1.Button, { onClick: () => {
                    // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
                    if (readIndex < numReads - 1) {
                        setReadIndex((previousReadIndex) => previousReadIndex + 1);
                    }
                } }, "Next sample")),
        react_1.default.createElement("div", { style: { minHeight: 800 } },
            react_1.default.createElement(ShortTandemRepeatReadContainer, { fetchRead: fetchRead, readIndex: readIndex }))));
};
const ShortTandemRepeatReadsAllelesFilterControlsWrapper = styled_components_1.default.div `
  margin-bottom: 1em;
`;
const ShortTandemRepeatReadsAllelesFilterControlWrapper = styled_components_1.default.div `
  margin-bottom: 0.5em;

  input {
    display: inline-block;
    width: 12ch;
  }
`;
const ShortTandemRepeatReadsAllelesFilterControls = ({ shortTandemRepeat, value, onChange, }) => {
    const maxNumRepeats = shortTandemRepeat.allele_size_distribution.distribution[shortTandemRepeat.allele_size_distribution.distribution.length - 1][0];
    return (react_1.default.createElement(ShortTandemRepeatReadsAllelesFilterControlsWrapper, null, [0, 1].map((alleleIndex) => (react_1.default.createElement(ShortTandemRepeatReadsAllelesFilterControlWrapper, { key: `${alleleIndex}` },
        "Allele ",
        alleleIndex + 1,
        ": ",
        react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-reads-filter-allele-${alleleIndex}-repeat-unit` },
            "Repeat unit ",
            react_1.default.createElement(ui_1.Select, { id: `short-tandem-repeat-reads-filter-allele-${alleleIndex}-repeat-unit`, value: value[alleleIndex].repeat_unit || '', onChange: (e) => {
                    const newRepeatUnit = e.target.value;
                    onChange(value.map((v, i) => i === alleleIndex ? Object.assign(Object.assign({}, v), { repeat_unit: newRepeatUnit }) : v));
                } },
                shortTandemRepeat.allele_size_distribution.repeat_units.length > 1 && (react_1.default.createElement("option", { value: "" }, "Any")),
                shortTandemRepeat.allele_size_distribution.repeat_units.map((repeatUnit) => (react_1.default.createElement("option", { key: repeatUnit.repeat_unit, value: repeatUnit.repeat_unit }, repeatUnit.repeat_unit))))),
        ' ',
        react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-reads-filter-allele-${alleleIndex}-min-repeats` },
            "Min repeats ",
            react_1.default.createElement(ui_1.Input, { type: "number", id: `short-tandem-repeat-reads-filter-allele-${alleleIndex}-min-repeats`, min: 0, max: maxNumRepeats, value: value[alleleIndex].min_repeats, onChange: (e) => {
                    const newMinRepeats = Math.max(Math.min(Number(e.target.value), maxNumRepeats), 0);
                    onChange(value.map((v, i) => i === alleleIndex ? Object.assign(Object.assign({}, v), { min_repeats: newMinRepeats }) : v));
                } })),
        ' ',
        react_1.default.createElement("label", { htmlFor: `short-tandem-repeat-reads-filter-allele-${alleleIndex}-max-repeats` },
            "Max repeats ",
            react_1.default.createElement(ui_1.Input, { type: "number", id: `short-tandem-repeat-reads-filter-allele-${alleleIndex}-max-repeats`, min: 0, max: maxNumRepeats, value: value[alleleIndex].max_repeats, onChange: (e) => {
                    const newMaxRepeats = Math.max(Math.min(Number(e.target.value), maxNumRepeats), 0);
                    onChange(value.map((v, i) => i === alleleIndex ? Object.assign(Object.assign({}, v), { max_repeats: newMaxRepeats }) : v));
                } })))))));
};
const ShortTandemRepeatReadsContainer = ({ datasetId, shortTandemRepeat, filter: baseFilter, }) => {
    const maxNumRepeats = shortTandemRepeat.allele_size_distribution.distribution[shortTandemRepeat.allele_size_distribution.distribution.length - 1][0];
    const [filter, setFilter] = (0, react_1.useState)(Object.assign(Object.assign({}, baseFilter), { alleles: [
            {
                repeat_unit: shortTandemRepeat.allele_size_distribution.repeat_units.length > 1
                    ? null
                    : shortTandemRepeat.allele_size_distribution.repeat_units[0].repeat_unit,
                min_repeats: 0,
                max_repeats: maxNumRepeats,
            },
            {
                repeat_unit: shortTandemRepeat.allele_size_distribution.repeat_units.length > 1
                    ? null
                    : shortTandemRepeat.allele_size_distribution.repeat_units[0].repeat_unit,
                min_repeats: 0,
                max_repeats: maxNumRepeats,
            },
        ] }));
    if (baseFilter.population !== filter.population || baseFilter.sex !== filter.sex) {
        // @ts-expect-error TS(2345) FIXME: Argument of type '{ population?: string | undefine... Remove this comment to see the full error message
        setFilter(Object.assign(Object.assign({}, filter), baseFilter));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ShortTandemRepeatReadsAllelesFilterControls, { shortTandemRepeat: shortTandemRepeat, 
            // @ts-expect-error TS(2322) FIXME: Type '{ repeat_unit: string | null; min_repeats: n... Remove this comment to see the full error message
            value: filter.alleles, onChange: (newAllelesFilter) => {
                setFilter((prevFilter) => (Object.assign(Object.assign({}, prevFilter), { alleles: newAllelesFilter })));
            } }),
        react_1.default.createElement(ShortTandemRepeatReads, { datasetId: datasetId, shortTandemRepeat: shortTandemRepeat, 
            // @ts-expect-error TS(2322) FIXME: Type '{ alleles: { repeat_unit: string | null; min... Remove this comment to see the full error message
            filter: filter })));
};
exports.default = ShortTandemRepeatReadsContainer;
//# sourceMappingURL=ShortTandemRepeatReads.js.map