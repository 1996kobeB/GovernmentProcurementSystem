const path = require("path");
const webpack = require("webpack");
const resolve = (dir) => path.join(__dirname, dir);
const IS_PRODOUCT = process.env.NODE_ENV === "production";
const config = {
	publicPath: process.env.BASE_URL,
	devServer: {
		port: 3000,
		open: true,
		sockHost: "localhost",
		disableHostCheck: true, //webpack4.0 开启热更新
		// 代理
		// proxy: {},
	},
	productionSourceMap: false,
	configureWebpack: {
		performance: {
			hints: false,
		},
		optimization: {
			splitChunks: {
				minSize: 60000,
				maxSize: 550000,
			},
		},
		// remove antdv momentjs  library dependency
		plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
	},
	// 设置在开发环境下每次保存代码时都开启 eslint 验证
	lintOnSave: false,
	css: {
		loaderOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
	chainWebpack: (config) => {
		// 修复HMR
		config.resolve.symlinks(true);
		// 配置别名
		config.resolve.alias.set("@", resolve("src"));
		config.resolve.alias.set("$public", resolve("public"));
	},
};

module.exports = config;
