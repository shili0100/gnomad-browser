"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const InfoPage_1 = __importDefault(require("../InfoPage"));
const Link_1 = __importDefault(require("../Link"));
// import helpTopics from './helpTopics'
const helpTopics = {};
const HelpTopicPage = ({ topicId }) => {
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const topic = helpTopics[topicId.toLowerCase()];
    const title = topic ? topic.title : 'Not found';
    return (react_1.default.createElement(InfoPage_1.default, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: title }),
        react_1.default.createElement(ui_1.PageHeading, null, title),
        topic ? (topic.render()) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", null, "Topic not found"),
            react_1.default.createElement("p", null,
                react_1.default.createElement(Link_1.default, { to: "/help" }, "See all help topics"))))));
};
exports.default = HelpTopicPage;
//# sourceMappingURL=HelpTopicPage.js.map