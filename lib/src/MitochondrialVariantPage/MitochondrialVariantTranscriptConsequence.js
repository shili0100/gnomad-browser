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
const vepConsequences_1 = require("../vepConsequences");
const Loftee_1 = require("../VariantPage/Loftee");
const AttributeName = styled_components_1.default.dt `
  display: inline;

  ::after {
    content: ': ';
  }
`;
const AttributeValue = styled_components_1.default.dd `
  display: inline;
  margin: 0;
`;
const Attribute = ({ children, name }) => (react_1.default.createElement("div", { style: { marginTop: '0.25em' } },
    react_1.default.createElement(AttributeName, null, name),
    react_1.default.createElement(AttributeValue, null, children)));
const AttributeList = styled_components_1.default.dl `
  display: flex;
  flex-direction: column;
  margin: 0;
`;
const Marker = styled_components_1.default.span `
  display: inline-block;
  width: 10px;
  height: 10px;

  &::before {
    content: '';
    display: inline-block;
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    border: 1px solid #000;
    border-radius: 5px;
    background: ${(props) => props.color};
  }
`;
const colors = {
    red: '#FF583F',
    yellow: '#F0C94D',
    green: 'green',
};
const lofteeAnnotationMarker = (consequence) => {
    switch (consequence.lof) {
        case 'HC':
            return react_1.default.createElement(Marker, { color: colors.green });
        case 'OS':
            return null;
        case 'LC':
        default:
            return react_1.default.createElement(Marker, { color: colors.red });
    }
};
const lofteeAnnotationDescription = (consequence) => {
    switch (consequence.lof) {
        case 'HC':
            return 'High-confidence';
        case 'OS':
            return 'Other splice (beta)';
        case 'LC':
            return (react_1.default.createElement("span", null,
                "Low-confidence (",
                consequence.lof_filter
                    .split(',')
                    .map((filter) => react_1.default.createElement(Loftee_1.LofteeFilter, { key: filter, filter: filter }))
                    .reduce((acc, el, i) => (i === 0 ? [...acc, el] : [...acc, ' ', el]), []),
                ")"));
        default:
            return consequence.lof;
    }
};
const HmtVarInfo = ({ variant }) => {
    const [response, setResponse] = (0, react_1.useState)(null);
    const url = `https://www.hmtvar.uniba.it/api/main/mutation/${variant.ref}${variant.pos}${variant.alt}`;
    (0, react_1.useEffect)(() => {
        fetch(url)
            .then((r) => r.json())
            .then(setResponse, () => { });
    }, [url]);
    return (response && (react_1.default.createElement("div", { style: { marginTop: '0.25em' } },
        react_1.default.createElement(AttributeName, null,
            react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.hmtvar.uniba.it/" }, "HmtVar")),
        react_1.default.createElement(AttributeValue, null,
            response.pathogenicity
                ? response.pathogenicity
                    .split('_')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')
                : '–',
            ' ',
            "(",
            response.disease_score.toPrecision(3),
            ")"))));
};
class HmtVarInfoErrorBoundary extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        const { children } = this.props;
        const { error } = this.state;
        if (error) {
            return (react_1.default.createElement("div", { style: { marginTop: '0.25em' } },
                react_1.default.createElement(AttributeName, null,
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.hmtvar.uniba.it/" }, "HmtVar")),
                react_1.default.createElement(AttributeValue, null, "An error occurred when fetching data")));
        }
        return children;
    }
}
const MITOTIP_TRNA_PREDICTIONS = {
    likely_benign: 'Likely benign',
    possibly_benign: 'Possibly benign',
    possibly_pathogenic: 'Possibly pathogenic',
    likely_pathogenic: 'Likely pathogenic',
};
const PON_MT_TRNA_PREDICTIONS = {
    neutral: 'Neutral',
    likely_neutral: 'Likely neutral',
    likely_pathogenic: 'Likely pathogenic',
    pathogenic: 'Pathogenic',
};
const MitochondrialVariantTranscriptConsequence = ({ consequence, variant, }) => {
    if (variant.mitotip_trna_prediction || variant.pon_mt_trna_prediction) {
        return (react_1.default.createElement(AttributeList, null,
            variant.mitotip_trna_prediction && (react_1.default.createElement("div", { style: { marginTop: '0.25em' } },
                react_1.default.createElement(AttributeName, null,
                    react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.mitomap.org/MITOMAP/MitoTipInfo" }, "MitoTIP")),
                react_1.default.createElement(AttributeValue, null,
                    MITOTIP_TRNA_PREDICTIONS[variant.mitotip_trna_prediction] ||
                        variant.mitotip_trna_prediction,
                    ' ',
                    variant.mitotip_score && react_1.default.createElement(react_1.default.Fragment, null, variant.mitotip_score.toPrecision(3))))),
            variant.pon_mt_trna_prediction && (react_1.default.createElement("div", { style: { marginTop: '0.25em' } },
                react_1.default.createElement(AttributeName, null,
                    react_1.default.createElement(ui_1.ExternalLink, { href: "http://structure.bmc.lu.se/PON-mt-tRNA/about.html/" }, "PON-mt-tRNA")),
                react_1.default.createElement(AttributeValue, null,
                    PON_MT_TRNA_PREDICTIONS[variant.pon_mt_trna_prediction] ||
                        variant.pon_mt_trna_prediction,
                    ' ',
                    variant.pon_ml_probability_of_pathogenicity &&
                        variant.pon_ml_probability_of_pathogenicity.toPrecision(3),
                    ")"))),
            react_1.default.createElement(HmtVarInfoErrorBoundary, null,
                react_1.default.createElement(HmtVarInfo, { variant: variant }))));
    }
    const category = (0, vepConsequences_1.getCategoryFromConsequence)(consequence.major_consequence);
    if (category === 'missense') {
        const polyphenColor = 
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        {
            benign: colors.green,
            possibly_damaging: colors.yellow,
        }[consequence.polyphen_prediction] || colors.red;
        const siftColor = consequence.sift_prediction === 'tolerated' ? colors.green : colors.red;
        return (react_1.default.createElement(AttributeList, null,
            react_1.default.createElement(Attribute, { name: "HGVSp" }, consequence.hgvs),
            consequence.polyphen_prediction && (react_1.default.createElement(Attribute, { name: "Polyphen" },
                react_1.default.createElement(Marker, { color: polyphenColor }),
                " ",
                consequence.polyphen_prediction)),
            consequence.sift_prediction && (react_1.default.createElement(Attribute, { name: "SIFT" },
                react_1.default.createElement(Marker, { color: siftColor }),
                " ",
                consequence.sift_prediction))));
    }
    if (
    // "NC" annotations were removed from the data pipeline some time ago.
    // Some ExAC variants still have them.
    consequence.lof === 'NC' ||
        (category === 'lof' && !consequence.lof) // See https://github.com/broadinstitute/gnomad-browser/issues/364
    ) {
        return (react_1.default.createElement(AttributeList, null,
            react_1.default.createElement(Attribute, { name: "HGVSp" }, consequence.hgvs)));
    }
    if (consequence.lof) {
        return (react_1.default.createElement(AttributeList, null,
            react_1.default.createElement(Attribute, { name: "HGVSp" }, consequence.hgvs),
            react_1.default.createElement(Attribute, { name: "pLoF" },
                lofteeAnnotationMarker(consequence),
                " ",
                lofteeAnnotationDescription(consequence)),
            consequence.lof_flags && (react_1.default.createElement(Attribute, { name: "Flag" },
                react_1.default.createElement(Marker, { color: colors.yellow }),
                ' ',
                consequence.lof_flags
                    .split(',')
                    .map((flag) => react_1.default.createElement(Loftee_1.LofteeFlag, { key: flag, flag: flag }))
                    .reduce((acc, el, i) => (i === 0 ? [...acc, el] : [...acc, ' ', el]), [])))));
    }
    return null;
};
exports.default = MitochondrialVariantTranscriptConsequence;
//# sourceMappingURL=MitochondrialVariantTranscriptConsequence.js.map