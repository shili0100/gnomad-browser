"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = __importDefault(require("prop-types"));
const query_string_1 = __importDefault(require("query-string"));
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ui_1 = require("@gnomad/ui");
const StyledRRLink = ui_1.Link.withComponent(react_router_dom_1.Link);
const Link = (0, react_router_dom_1.withRouter)((props) => {
    const { location, history: _history, match: _match, preserveSelectedDataset, staticContext: _staticContext, to } = props, rest = __rest(props, ["location", "history", "match", "preserveSelectedDataset", "staticContext", "to"]);
    let finalTo = to;
    if (preserveSelectedDataset) {
        const currentParams = query_string_1.default.parse(location.search);
        if (typeof to === 'string') {
            finalTo = { pathname: to, search: query_string_1.default.stringify({ dataset: currentParams.dataset }) };
        }
        else {
            const toParams = query_string_1.default.parse(to.search);
            finalTo = Object.assign(Object.assign({}, to), { search: query_string_1.default.stringify(Object.assign(Object.assign({}, toParams), { dataset: currentParams.dataset })) });
        }
    }
    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
    return react_1.default.createElement(StyledRRLink, Object.assign({}, rest, { to: finalTo }));
});
Link.propTypes = {
    preserveSelectedDataset: prop_types_1.default.bool,
};
Link.defaultProps = {
    preserveSelectedDataset: true,
};
exports.default = Link;
//# sourceMappingURL=Link.js.map