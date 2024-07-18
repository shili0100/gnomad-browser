"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("@gnomad/ui");
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const InlineList_1 = __importDefault(require("../InlineList"));
const vepConsequences_1 = require("../vepConsequences");
const Loftee_1 = require("./Loftee");
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
const AttributeList = styled_components_1.default.dl `
  display: flex;
  flex-direction: column;
  margin: 0;
`;
const Attribute = ({ children, name }) => (react_1.default.createElement("div", { style: { marginTop: '0.25em' } },
    react_1.default.createElement(AttributeName, null, name),
    react_1.default.createElement(AttributeValue, null, children)));
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
const PREFERRED_DOMAIN_DATABASES = new Set(['Pfam']);
const renderDomain = (domain) => {
    if (domain.database === 'Pfam') {
        return (
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        react_1.default.createElement(ui_1.ExternalLink, { href: `https://pfam.xfam.org/family/${domain.name}` },
            domain.name,
            " (",
            domain.database,
            ")"));
    }
    return `${domain.name} (${domain.database})`;
};
const TranscriptConsequenceProteinDomains = ({ consequence, }) => {
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const domains = consequence.domains
        .map((domain) => {
        const [database, name] = domain.split(':');
        return { database: database.replace(/_domains?/, ''), name };
    })
        .sort((domain1, domain2) => {
        if (PREFERRED_DOMAIN_DATABASES.has(domain1.database) &&
            !PREFERRED_DOMAIN_DATABASES.has(domain2.database)) {
            return -1;
        }
        if (!PREFERRED_DOMAIN_DATABASES.has(domain1.database) &&
            PREFERRED_DOMAIN_DATABASES.has(domain2.database)) {
            return 1;
        }
        return domain1.database.localeCompare(domain2.database);
    });
    return react_1.default.createElement(InlineList_1.default, { items: domains.map(renderDomain), label: "Protein domains", maxLength: 2 });
};
const TranscriptConsequence = ({ consequence }) => {
    const category = (0, vepConsequences_1.getCategoryFromConsequence)(consequence.major_consequence);
    let consequenceSpecificAttributes = null;
    if (category === 'missense') {
        const polyphenColor = {
            benign: colors.green,
            possibly_damaging: colors.yellow,
            // @ts-expect-error TS(2538) FIXME: Type 'undefined' cannot be used as an index type.
        }[consequence.polyphen_prediction] || colors.red;
        const siftColor = consequence.sift_prediction === 'tolerated' ? colors.green : colors.red;
        consequenceSpecificAttributes = (react_1.default.createElement(react_1.default.Fragment, null,
            consequence.polyphen_prediction && (react_1.default.createElement(Attribute, { name: "Polyphen" },
                react_1.default.createElement(Marker, { color: polyphenColor }),
                " ",
                consequence.polyphen_prediction)),
            consequence.sift_prediction && (react_1.default.createElement(Attribute, { name: "SIFT" },
                react_1.default.createElement(Marker, { color: siftColor }),
                " ",
                consequence.sift_prediction))));
    }
    else if (
    // "NC" annotations were removed from the data pipeline some time ago.
    // Some ExAC variants still have them.
    consequence.lof === 'NC' ||
        (category === 'lof' && !consequence.lof) // See https://github.com/broadinstitute/gnomad-browser/issues/364
    ) {
        consequenceSpecificAttributes = (react_1.default.createElement(react_1.default.Fragment, null,
            consequence.domains && consequence.domains.length > 0 && (react_1.default.createElement(Attribute, { name: "Domains" }, consequence.domains.join(', '))),
            react_1.default.createElement(Attribute, { name: "pLoF" },
                react_1.default.createElement(Marker, { color: colors.red }),
                " Low-confidence (Non-protein-coding transcript)")));
    }
    else if (consequence.lof) {
        consequenceSpecificAttributes = (react_1.default.createElement(react_1.default.Fragment, null,
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
                    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                    .reduce((acc, el, i) => (i === 0 ? [...acc, el] : [...acc, ' ', el]), [])))));
    }
    return (react_1.default.createElement(AttributeList, null,
        consequence.hgvsp ? (react_1.default.createElement(Attribute, { name: "HGVSp" }, consequence.hgvsp)) : (react_1.default.createElement(Attribute, { name: "HGVSc" }, consequence.hgvsc)),
        consequence.domains && consequence.domains.length > 0 && (react_1.default.createElement(Attribute, { name: "Domains" },
            react_1.default.createElement(TranscriptConsequenceProteinDomains, { consequence: consequence }))),
        consequenceSpecificAttributes));
};
exports.default = TranscriptConsequence;
//# sourceMappingURL=TranscriptConsequence.js.map