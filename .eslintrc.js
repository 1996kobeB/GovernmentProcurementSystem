module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: ["plugin:vue/recommended"],
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "babel-eslint",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"space-before-function-paren": ["error", "always"],
		"vue/no-multiple-template-root": 0,
		"no-tabs": "off",
		"vue/no-unused-components": "off",
	},
};
