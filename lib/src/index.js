"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/stable");
require("whatwg-fetch");
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const App_1 = __importDefault(require("./App"));
const mount = document.getElementById('root');
(0, react_dom_1.render)(react_1.default.createElement(App_1.default, null), mount);
//# sourceMappingURL=index.js.map