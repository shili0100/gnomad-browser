"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textOrMissingTextWarning = void 0;
const textOrMissingTextWarning = (entityType, textMapping, key) => textMapping[key] || `TEXT NEEDED FOR ${entityType.toUpperCase()} "${key}"`;
exports.textOrMissingTextWarning = textOrMissingTextWarning;
//# sourceMappingURL=missingContent.js.map