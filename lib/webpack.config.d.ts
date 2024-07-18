export namespace devServer {
    export namespace historyApiFallback {
        let disableDotRule: boolean;
    }
    export let hot: boolean;
    export let port: number;
    export namespace _static {
        let publicPath: string;
    }
    export { _static as static };
    export let proxy: ({
        context: string;
        target: string;
        pathRewrite: {
            '^/api': string;
            '^/reads'?: undefined;
        };
        changeOrigin: boolean;
    } | {
        context: string;
        target: string | undefined;
        pathRewrite: {
            '^/reads': string;
            '^/api'?: undefined;
        };
        changeOrigin: boolean;
    })[];
}
export let devtool: string;
export namespace entry {
    let bundle: string;
}
export let mode: string;
export namespace module {
    let rules: ({
        test: RegExp;
        loader: string;
        options: {
            loader: string;
            target: string;
            tsconfigRaw: {
                extends: string;
                exclude: string[];
            };
        };
        exclude?: undefined;
        use?: undefined;
    } | {
        test: RegExp;
        exclude: RegExp;
        use: {
            loader: string;
            options: {
                rootMode: string;
            };
        }[];
        loader?: undefined;
        options?: undefined;
    } | {
        test: RegExp;
        use: {
            loader: string;
            options: {
                outputPath: string;
            };
        };
        loader?: undefined;
        options?: undefined;
        exclude?: undefined;
    } | {
        test: RegExp;
        use: {
            loader: string;
            options?: undefined;
        };
        loader?: undefined;
        options?: undefined;
        exclude?: undefined;
    } | {
        test: RegExp;
        use: string[];
        loader?: undefined;
        options?: undefined;
        exclude?: undefined;
    })[];
}
export let resolve: {
    alias: {
        'react-dom': string;
    };
    extensions: string[];
} | {
    alias?: undefined;
    extensions: string[];
};
export namespace output {
    export let path: string;
    let publicPath_1: string;
    export { publicPath_1 as publicPath };
    export let filename: string;
}
export let plugins: any[];
export let target: string;
