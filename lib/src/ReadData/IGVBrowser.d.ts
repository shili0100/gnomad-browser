import React, { Component } from 'react';
type OwnProps = {
    config: any;
    onCreateBrowser?: (...args: any[]) => any;
};
type Props = OwnProps & typeof IGVBrowser.defaultProps;
/**
 * NOTE: This does not update the igv.js browser instance when the config prop changes.
 * If config may change, add a key to IGVBrowser to create a new component instance
 * with the updated config.
 * https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
 */
declare class IGVBrowser extends Component<Props> {
    static defaultProps: {
        onCreateBrowser: () => void;
    };
    browser: any;
    el: any;
    mounted: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    elementRef: (el: any) => void;
    render(): React.JSX.Element;
}
export default IGVBrowser;
