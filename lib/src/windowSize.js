"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = void 0;
const react_1 = require("react");
let resizeCallbacks = [];
window.addEventListener('resize', () => 
// @ts-expect-error TS(7006) FIXME: Parameter 'cb' implicitly has an 'any' type.
resizeCallbacks.forEach((cb) => {
    const width = window.innerWidth;
    cb({ width });
}));
const useWindowSize = () => {
    const [size, setSize] = (0, react_1.useState)({ width: window.innerWidth });
    (0, react_1.useEffect)(() => {
        resizeCallbacks.push(setSize);
        return function unsubscribe() {
            // @ts-expect-error TS(7006) FIXME: Parameter 'cb' implicitly has an 'any' type.
            resizeCallbacks = resizeCallbacks.filter((cb) => cb !== setSize);
        };
    }, []);
    return size;
};
exports.useWindowSize = useWindowSize;
//# sourceMappingURL=windowSize.js.map