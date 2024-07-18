"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// use webpack's context to dynamically load every headshot from the folder
const importAllHeadshots = (webpackContext) => {
    const headshots = {};
    webpackContext.keys().forEach((key) => {
        headshots[key.replace('./', '')] = webpackContext(key).default;
    });
    return headshots;
};
const headshotImages = importAllHeadshots(require.context('../../about/contributors/headshots', false, /\.(png|jpe?g|svg)$/));
exports.default = headshotImages;
//# sourceMappingURL=headshotLoader.js.map