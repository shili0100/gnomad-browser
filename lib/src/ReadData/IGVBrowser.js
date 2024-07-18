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
const igv_esm_1 = __importDefault(require("igv/dist/igv.esm"));
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const IGVWrapper = styled_components_1.default.div `
  /* Coverage axes in left gutter are hardcoded to a white background.
     Set the background of the entire IGV container so that they're not out of place. */
  .igv-root-div {
    padding-top: 0;
    background: #fff;
  }

  /* Hide ideogram */
  #igv-content-header {
    display: none;
  }

  .igv-viewport-div {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }

  /* Lengthen track label to make space for variant ID on MNV page */
  .igv-track-label {
    max-width: 225px;
  }

  @media (max-width: 600px) {
    .igv-navbar {
      flex-flow: column;
      height: auto;
      padding-bottom: 5px;
    }

    .igv-nav-bar-left-container,
    .igv-nav-bar-right-container {
      flex-wrap: wrap;
      height: auto;
    }

    .igv-nav-bar-genomic-location {
      flex-flow: column;
      align-items: flex-start;
    }

    .igv-chromosome-select-widget-container {
      margin-left: 8px;
    }
  }
`;
/**
 * NOTE: This does not update the igv.js browser instance when the config prop changes.
 * If config may change, add a key to IGVBrowser to create a new component instance
 * with the updated config.
 * https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
 */
class IGVBrowser extends react_1.Component {
    constructor() {
        super(...arguments);
        this.elementRef = (el) => {
            this.el = el;
        };
    }
    componentDidMount() {
        const { config, onCreateBrowser } = this.props;
        const browserConfig = Object.assign(Object.assign({}, config), { promisified: true });
        igv_esm_1.default
            .createBrowser(this.el, browserConfig)
            .then((browser) => {
            if (this.mounted === false) {
                igv_esm_1.default.removeBrowser(browser);
                return;
            }
            this.browser = browser;
            const resetButton = document.createElement('i');
            resetButton.className = 'igv-app-icon';
            resetButton.innerText = '⟲';
            resetButton.title = 'Reset';
            resetButton.style.cssText = `
        position: relative;
        top: -1px;
        font-style: normal;
        font-size: 14px;
        font-weight: bold;
        margin: 0 10px;
      `;
            resetButton.addEventListener('click', () => {
                browser.search(config.locus);
            });
            this.el.querySelector('.igv-search-container').appendChild(resetButton);
            onCreateBrowser(browser);
        })
            .catch((reason) => console.error(`failed to create IGV browser: "${reason}"`)); // eslint-disable-line no-console
    }
    componentWillUnmount() {
        if (this.browser) {
            igv_esm_1.default.removeBrowser(this.browser);
        }
        this.mounted = false;
    }
    render() {
        return react_1.default.createElement(IGVWrapper, { ref: this.elementRef });
    }
}
IGVBrowser.defaultProps = {
    onCreateBrowser: () => { },
};
exports.default = IGVBrowser;
//# sourceMappingURL=IGVBrowser.js.map