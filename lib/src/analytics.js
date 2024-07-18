"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logButtonClick = exports.logAnalyticsEvent = void 0;
const logAnalyticsEvent = (eventName, eventCategory, eventLabel) => {
    if (window.gtag) {
        ;
        window.gtag('event', eventName, {
            event_category: eventCategory,
            event_label: eventLabel,
        });
    }
    return undefined;
};
exports.logAnalyticsEvent = logAnalyticsEvent;
const logButtonClick = (eventLabel) => {
    (0, exports.logAnalyticsEvent)('button_click', 'User Interaction', eventLabel);
};
exports.logButtonClick = logButtonClick;
//# sourceMappingURL=analytics.js.map