"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ui_1 = require("@gnomad/ui");
const DocumentTitle_1 = __importDefault(require("./DocumentTitle"));
const InfoPage_1 = __importDefault(require("./InfoPage"));
class ErrorBoundary extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, bugDescription: '' };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        const { children, location } = this.props;
        const { error, bugDescription } = this.state;
        if (error) {
            const issueBody = `
**Description**: ${bugDescription}

**Error message**: ${error.message}

**Stack trace**:
\`\`\`
${error.stack}
\`\`\`

**Route**: ${location.pathname}${location.search}

**Browser**: ${navigator.userAgent}
`;
            const issueURL = `https://github.com/broadinstitute/gnomad-browser/issues/new?title=${encodeURIComponent(error.message)}&body=${encodeURIComponent(issueBody)}&labels=Type%3A%20Bug`;
            const forumURL = `https://discuss.gnomad.broadinstitute.org/new-topic?title=topic%20${encodeURIComponent(error.message)}&body=${encodeURIComponent(issueBody)}&category=Browser&tags=bug`;
            const emailURL = `mailto:gnomad@broadinstitute.org?subject=${encodeURIComponent('Browser bug report')}&body=${encodeURIComponent(issueBody.replace(/```\n/g, ''))}`;
            return (react_1.default.createElement(InfoPage_1.default, null,
                react_1.default.createElement(DocumentTitle_1.default, { title: "Error" }),
                react_1.default.createElement(ui_1.PageHeading, null, "Something Went Wrong"),
                react_1.default.createElement("p", null, "An error prevented this page from being displayed."),
                react_1.default.createElement("p", null, "This is a bug."),
                react_1.default.createElement("p", null,
                    "Please describe what you were trying to do at the time the page crashed",
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("textarea", { id: "bug-description", name: "bug-description", value: bugDescription, onChange: (e) => this.setState({ bugDescription: e.target.value }), rows: 4, cols: 50 }))),
                react_1.default.createElement("p", null,
                    "And submit this bug report as",
                    ' ',
                    react_1.default.createElement("ul", null,
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(ui_1.ExternalLink, { href: issueURL }, "an issue on GitHub"),
                            " or",
                            ' '),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement(ui_1.ExternalLink, { href: forumURL }, "a topic on our forum"))),
                    "Then ",
                    react_1.default.createElement(ui_1.Link, { href: "/" }, "reload the browser"),
                    ".",
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("p", null,
                        "Alternately, you can",
                        ' ',
                        react_1.default.createElement(ui_1.ExternalLink, { href: emailURL }, "email us"),
                        ". Please note that we prioritize answering issues on Github and topics on the Forum, so if you choose to email it may take us longer to respond."))));
        }
        return children;
    }
}
// @ts-expect-error TS(2345) FIXME: Argument of type 'typeof ErrorBoundary' is not ass... Remove this comment to see the full error message
exports.default = (0, react_router_dom_1.withRouter)(ErrorBoundary);
//# sourceMappingURL=ErrorBoundary.js.map