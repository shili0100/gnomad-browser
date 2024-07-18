"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAnchor = void 0;
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
const link_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/link.svg"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const AnchorLink = styled_components_1.default.a.attrs({ 'aria-hidden': 'true' }) `
  position: absolute;
  transform: translate(-15px, calc(50% - 0.5em));
  display: flex;
  align-items: center;
  width: 15px;
  height: 1em;
  visibility: hidden;
  vertical-align: middle;
`;
const AnchorWrapper = styled_components_1.default.span `
  position: relative;

  :hover {
    ${AnchorLink} {
      visibility: visible;
    }
  }
`;
const withAnchor = (Component) => {
    // theme was added as an additional prop to allow for conditional styling
    //   of a given styled component as the 'Component' parameter. The theme prop
    //   is a keyword with Styled Components and allows the table of contents to
    //   dynamically grab all '<SectionTitles> from a page to use in the ToC, while
    //   still allowing each <SectionTitle> to render differently.
    const ComposedComponent = ({ children, id, theme }) => (react_1.default.createElement(AnchorWrapper, null,
        react_1.default.createElement(Component, { theme: theme },
            react_1.default.createElement(AnchorLink, { href: `#${id}`, id: id },
                react_1.default.createElement("img", { src: link_svg_1.default, alt: "", "aria-hidden": "true", height: 12, width: 12 })),
            children)));
    const componentName = Component.displayName || Component.name || 'Component';
    ComposedComponent.displayName = `withAnchor(${componentName})`;
    ComposedComponent.propTypes = {
        children: prop_types_1.default.node.isRequired,
        id: prop_types_1.default.string.isRequired,
    };
    return ComposedComponent;
};
exports.withAnchor = withAnchor;
//# sourceMappingURL=AnchorLink.js.map