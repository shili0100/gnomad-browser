"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = require("react");
const DocumentTitle = ({ title }) => {
    (0, react_1.useEffect)(() => {
        const fullTitle = title ? `${title} | gnomAD` : 'gnomAD';
        document.title = fullTitle;
    }, [title]);
    return null;
};
DocumentTitle.propTypes = {
    title: prop_types_1.default.string,
};
DocumentTitle.defaultProps = {
    title: null,
};
exports.default = DocumentTitle;
//# sourceMappingURL=DocumentTitle.js.map