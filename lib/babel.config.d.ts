export let presets: ((string | {
    targets: string[];
    useBuiltIns: string;
    corejs: number;
    exclude: string[];
    modules: string | boolean;
})[] | (string | {
    useBuiltIns: boolean;
})[])[];
export let plugins: string[];
export namespace env {
    namespace test {
        let plugins_1: string[];
        export { plugins_1 as plugins };
    }
}
