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
const downloadsHooks_1 = __importDefault(require("./downloadsHooks"));
const TableOfContents = styled_components_1.default.div `
  margin-left: 1rem;
`;
const TableOfContentsStyledItem = styled_components_1.default.div `
  padding-left: ${(props) => props.padding};
  margin-top: ${(props) => (props.header ? '1rem' : '0.5rem')};
  background-color: ${(props) => (props.active ? '#e9e9e9' : 'transparent')};
  font-weight: ${(props) => (props.active ? 700 : 400)};
  border-radius: 0.25rem;

  a {
    color: #1173bb;
    text-decoration: none;
  }
`;
const DownloadsPageTableOfContents = () => {
    const [headings, setHeadings] = (0, react_1.useState)([]);
    const { activeId } = (0, downloadsHooks_1.default)();
    const [activeSection, setActiveSection] = (0, react_1.useState)('');
    const checkIndent = (idString) => {
        if (idString.indexOf('core-dataset') > -1 || idString.indexOf('secondary-analyses') > -1) {
            return '2rem';
        }
        if (idString.indexOf('-') === -1 || idString === 'v2-liftover') {
            return '0.5rem';
        }
        return '3.5rem';
    };
    // useEffect to dynamically grab all the section titles on first page load
    (0, react_1.useEffect)(() => {
        const elements = Array.from(document.querySelectorAll('a[id]')).map((el) => ({
            // @ts-expect-error
            text: el.nextSibling.data,
            link: el.id,
            indent: checkIndent(el.id),
        }));
        // @ts-expect-error
        setHeadings(elements);
    }, []);
    // Determine which top-level dataset should be shown accordion style in the ToC
    (0, react_1.useEffect)(() => {
        if (activeId.indexOf('v2-liftover') > -1) {
            setActiveSection('v2-liftover');
        }
        else if (activeId.indexOf('v2') > -1) {
            setActiveSection('v2');
        }
        else if (activeId.indexOf('v4') > -1) {
            setActiveSection('v4');
        }
        else if (activeId.indexOf('v3') > -1) {
            setActiveSection('v3');
        }
        else if (activeId.indexOf('exac') > -1) {
            setActiveSection('exac');
        }
        else {
            setActiveSection('summary');
        }
    }, [activeId]);
    // Messy logic, the end result is to always output the 4 categories [v2, v2-liftover, v3, exac]
    //   and if you are in a given section, also output all of their download links
    //   which are additionally nested under 'core-dataset' and 'secondary-analyses'
    // This would be a lot cleaner if v2-liftover wasn't the only top level dataset that
    //   also includes a "-".
    const filterSection = (idString) => {
        if (activeSection === 'v2') {
            return ((idString.indexOf('-') === -1 ||
                idString === 'v2-liftover' ||
                idString.indexOf(activeSection) > -1) &&
                idString.indexOf('v2-liftover-') === -1);
        }
        return (idString.indexOf('-') === -1 ||
            idString === 'v2-liftover' ||
            idString.indexOf(activeSection) > -1);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TableOfContents, null, headings
            .filter((item) => filterSection(item.link))
            .map((item) => {
            return (react_1.default.createElement(TableOfContentsStyledItem, { active: activeId === item.link, padding: item.indent, header: item.indent === '0.5rem', key: item.link },
                react_1.default.createElement("a", { href: `#${item.link}` }, item.text)));
        }))));
};
exports.default = DownloadsPageTableOfContents;
//# sourceMappingURL=TableOfContents.js.map