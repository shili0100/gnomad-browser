"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slugify = (string) => string
    .toLowerCase()
    .replace(/\s+|\/|_|,|:|;/g, '-') // Replace spaces and special characters with -
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
exports.default = slugify;
//# sourceMappingURL=slugify.js.map