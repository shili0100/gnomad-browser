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
exports.BaseQuery = void 0;
const react_1 = __importStar(require("react"));
const Delayed_1 = __importDefault(require("./Delayed"));
const StatusMessage_1 = __importDefault(require("./StatusMessage"));
const areVariablesEqual = (variables, otherVariables) => {
    const keys = Object.keys(variables);
    const otherKeys = Object.keys(otherVariables);
    if (keys.length !== otherKeys.length) {
        return false;
    }
    return keys.every((key) => variables[key] === otherVariables[key]);
};
const cancelable = (promise) => {
    let isCanceled = false;
    const wrapper = new Promise((resolve, reject) => {
        promise.then((value) => {
            if (!isCanceled) {
                resolve(value);
            }
        }, (error) => {
            if (!isCanceled) {
                reject(error);
            }
        });
    });
    return {
        cancel: () => {
            isCanceled = true;
        },
        promise: wrapper,
    };
};
class BaseQuery extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: null,
            error: null,
            graphQLErrors: null,
            loading: true,
        };
    }
    componentDidMount() {
        this.mounted = true;
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        const { query, variables } = this.props;
        if (query !== prevProps.query || !areVariablesEqual(variables, prevProps.variables)) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    loadData() {
        const { operationName, query, url, variables } = this.props;
        this.setState({
            loading: true,
            error: null,
            graphQLErrors: null,
        });
        if (this.currentRequest) {
            this.currentRequest.cancel();
        }
        this.currentRequest = cancelable(fetch(url, {
            body: JSON.stringify({
                operationName,
                query,
                variables,
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json()));
        this.currentRequest.promise.then((response) => {
            if (!this.mounted) {
                return;
            }
            this.setState({
                data: response.data,
                error: null,
                graphQLErrors: response.errors,
                loading: false,
            });
        }, (error) => {
            if (!this.mounted) {
                return;
            }
            this.setState({
                data: null,
                error,
                graphQLErrors: null,
                loading: false,
            });
        });
    }
    render() {
        const { children } = this.props;
        return children(this.state);
    }
}
exports.BaseQuery = BaseQuery;
BaseQuery.defaultProps = {
    url: '/api/',
    operationName: null,
    variables: {},
};
// @ts-expect-error TS(7022) FIXME: 'Query' implicitly has type 'any' because it does ... Remove this comment to see the full error message
const Query = ({ children, errorMessage, loadingMessage, loadingPlaceholderHeight, operationName, query, success, url, variables, }) => {
    return (react_1.default.createElement(BaseQuery, { operationName: operationName, query: query, url: url, variables: variables }, ({ data, error, graphQLErrors, loading }) => {
        if (loading) {
            return (react_1.default.createElement("div", { style: { height: loadingPlaceholderHeight || 'auto' } },
                react_1.default.createElement(Delayed_1.default, null,
                    react_1.default.createElement(StatusMessage_1.default, null, loadingMessage))));
        }
        if (error) {
            return react_1.default.createElement(StatusMessage_1.default, null, errorMessage);
        }
        if (!data || !success(data)) {
            return (react_1.default.createElement(StatusMessage_1.default, null, graphQLErrors && graphQLErrors.length
                ? Array.from(new Set(graphQLErrors.map((e) => e.message))).join(', ')
                : errorMessage));
        }
        return children({ data });
    }));
};
Query.defaultProps = {
    errorMessage: 'Error',
    loadingMessage: 'Loading',
    loadingPlaceholderHeight: undefined,
    success: () => true,
    url: '/api/',
    variables: {},
    operationName: null,
};
exports.default = Query;
//# sourceMappingURL=Query.js.map