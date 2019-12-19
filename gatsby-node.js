exports.onCreateWebpackConfig = (
  { actions, plugins, reporter },
  { envFolderPath = "env/" }
) => {
  const activeEnv =
    process.env.BUILD_ENV || process.env.NODE_ENV || "development"

  reporter.info(`Using environment variables config: '${activeEnv}'`)

  const envs = require("dotenv").config({
    path: `${envFolderPath}.env.${activeEnv}`
  }).parsed

  const commonEnvs = require("dotenv").config({
    path: `${envFolderPath}.env`
  }).parsed

  const mergedEnvs = Object.assign({}, commonEnvs, envs)

  const envKeys = Object.keys(mergedEnvs).reduce((acc, envKey) => {
    acc[envKey] = JSON.stringify(mergedEnvs[envKey])
    return acc
  }, {})

  actions.setWebpackConfig({
    plugins: [plugins.define(envKeys)]
  })
}
