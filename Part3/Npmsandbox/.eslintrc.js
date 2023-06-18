module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2021': true,
		'jest': true,
		'browser': true,
		'es6': true,
		'jest/globals': true,
		'cypress/globals': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'react', 'jest', "cypress"
	],
	'rules': {
		indent: ["error", "tab"],
		"/*eslint linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "never"],
		eqeqeq: "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": ["error", "always"],
		"arrow-spacing": ["error", { before: true, after: true }],
		"no-console": 0,
		"react/prop-types": 0,
		"react/react-in-jsx-scope": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
}
