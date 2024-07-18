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
const react_1 = __importStar(require("react"));
const ui_1 = require("@gnomad/ui");
const Delayed_1 = __importDefault(require("../Delayed"));
const HelpTopicModal = (_a) => {
    var { topicId } = _a, otherProps = __rest(_a, ["topicId"]);
    const [title, setTitle] = (0, react_1.useState)('Help');
    const [content, setContent] = (0, react_1.useState)(react_1.default.createElement("div", { style: { height: '200px' } },
        react_1.default.createElement(Delayed_1.default, null, "Loading")));
    // useEffect(() => {
    //   import('./helpTopics').then(
    //     (mod) => {
    //       const helpTopics = mod.default
    //       // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    //       const topic = helpTopics[topicId.toLowerCase()]
    //
    //       if (topic) {
    //         setTitle(topic.title)
    //         setContent(topic.render())
    //       } else {
    //         setTitle('Not found')
    //         // @ts-expect-error TS(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    //         setContent('Topic not found')
    //       }
    //     },
    //     () => {
    //       // @ts-expect-error TS(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    //       setContent('Unable to load help')
    //     }
    //   )
    // }, [topicId])
    return (
    // @ts-expect-error TS(2741) FIXME: Property 'onRequestClose' is missing in type '{ ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.Modal, Object.assign({}, otherProps, { size: "large", title: title }),
        react_1.default.createElement("p", { style: { marginTop: 0, fontSize: '16px' } },
            react_1.default.createElement(ui_1.ExternalLink, { href: `/help/${topicId}` }, "View this information in a new tab.")),
        content));
};
exports.default = HelpTopicModal;
//# sourceMappingURL=HelpTopicModal.js.map