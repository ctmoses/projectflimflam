/**
 * Created by jlong on 2019-02-04
 */

module.exports = {
    outputDir: 'dist/app',
    publicPath: '.',
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/variables.scss";
                `,
            },
        },
    },
    configureWebpack: {
        devtool: 'eval-source-map',
        output: {
            devtoolModuleFilenameTemplate: (info) => {
                let $filename = `sources://${info.resourcePath}`;
                if (info.resourcePath.match(/\.vue$/) && !info.query.match(/type=script/)) {
                    $filename = `webpack-generated:///${info.resourcePath}?${info.hash}`;
                }
                return $filename;
            },
            devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
        },
    },
};
