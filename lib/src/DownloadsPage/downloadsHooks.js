"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
// A custom hook to check when any of the given entries are in the viewport (the top 40%)
//   and when this changes, return the 'id' attribute of this DOM item
const useHeadsObserver = () => {
    const observer = (0, react_1.useRef)();
    const [activeId, setActiveId] = (0, react_1.useState)('nothin');
    (0, react_1.useEffect)(() => {
        const handleObserver = (entries) => {
            entries.forEach((entry) => {
                if (entry === null || entry === void 0 ? void 0 : entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };
        // @ts-expect-error
        observer.current = new IntersectionObserver(handleObserver, {
            rootMargin: '0% 0px -90% 0px',
        });
        const elements = document.querySelectorAll('a[id]');
        // @ts-expect-error
        elements.forEach((element) => observer.current.observe(element));
        // @ts-expect-error
        return () => { var _a; return (_a = observer.current) === null || _a === void 0 ? void 0 : _a.disconnect(); };
    }, []);
    return { activeId };
};
exports.default = useHeadsObserver;
//# sourceMappingURL=downloadsHooks.js.map