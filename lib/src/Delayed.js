"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = require("react");
const Delayed = ({ children, delay }) => {
    const [shouldRender, setShouldRender] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const renderTimeout = setTimeout(() => {
            setShouldRender(true);
        }, delay);
        return () => {
            clearTimeout(renderTimeout);
        };
    });
    return shouldRender ? children : null;
};
Delayed.propTypes = {
    children: prop_types_1.default.node.isRequired,
    delay: prop_types_1.default.number,
};
Delayed.defaultProps = {
    delay: 150,
};
exports.default = Delayed;
//# sourceMappingURL=Delayed.js.map