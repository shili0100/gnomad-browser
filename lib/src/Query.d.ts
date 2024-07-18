import { Component } from 'react';
type BaseQueryState = any;
type BaseQueryProps = {
    operationName: string | null;
    query: string;
    url: string;
    variables?: any;
    children: (state: BaseQueryState) => JSX.Element;
};
export declare class BaseQuery extends Component<BaseQueryProps, BaseQueryState> {
    static defaultProps: {
        url: string;
        operationName: null;
        variables: {};
    };
    currentRequest: any;
    mounted: any;
    state: {
        data: null;
        error: null;
        graphQLErrors: null;
        loading: boolean;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: BaseQueryProps): void;
    componentWillUnmount(): void;
    loadData(): void;
    render(): JSX.Element;
}
declare const Query: any;
export default Query;
