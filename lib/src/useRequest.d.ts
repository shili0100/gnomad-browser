declare const useRequest: (makeRequest: any) => {
    isLoading: boolean;
    error: null;
    response: null;
};
export default useRequest;
