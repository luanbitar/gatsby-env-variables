exports.onCreateWebpackConfig = ({ actions, plugins }, { envFolderPath = "" }) => {

	const activeEnv = process.env.BUILD_ENV || process.env.NODE_ENV || "development"
	console.log(`Using environment config: '${activeEnv}'`)

	const env = require("dotenv").config({
		path: `${envFolderPath}.env.${activeEnv}`,
	}).parsed

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  actions.setWebpackConfig({
    plugins: [plugins.define(envKeys)],
  })
}