"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
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
const useRequest = (makeRequest) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [response, setResponse] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        setIsLoading(true);
        setError(null);
        const request = cancelable(makeRequest());
        // @ts-expect-error TS(2345) FIXME: Argument of type 'Dispatch<SetStateAction<null>>' ... Remove this comment to see the full error message
        request.promise.then(setResponse, setError).finally(() => {
            setIsLoading(false);
        });
        return () => {
            request.cancel();
        };
    }, [makeRequest]);
    return { isLoading, error, response };
};
exports.default = useRequest;
//# sourceMappingURL=useRequest.js.map