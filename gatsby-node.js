const fs = require("fs")

exports.onCreateWebpackConfig = async (
  { actions, plugins, reporter },
  { envFolderPath = "env/" }
) => {
  const activeEnv =
    process.env.BUILD_ENV || process.env.NODE_ENV || "development"
  const theme = process.env.THEME || null
  const basePath = `${process.cwd()}/${envFolderPath}`
  async function getEnvs(fileName) {
    const envsPromise = require(`${basePath}${fileName}`)
    const envs = await Promise.resolve(envsPromise)
    return envs
  }

  const envMessage = `Using ${activeEnv} environment`
  const themeMessage = theme ? ` and ${theme} theme` : ``
  reporter.info(envMessage + themeMessage)

  const envs = await getEnvs(`${activeEnv}.js`)
  const themeEnvs = envs[theme]
  const commonEnvs = await getEnvs(`index.js`)
  const themeCommonEnvs = commonEnvs[theme]

  const mergedEnvs = Object.assign(
    {},
    commonEnvs,
    themeCommonEnvs,
    envs,
    themeEnvs
  )

  const envKeys = Object.keys(mergedEnvs).reduce((acc, envKey) => {
    acc[envKey] = JSON.stringify(mergedEnvs[envKey])
    return acc
  }, {})

  fs.writeFileSync(
    `${__dirname}/cachedVariables.json`,
    JSON.stringify(mergedEnvs)
  )

  reporter.success("created cachedVariables.json")

  actions.setWebpackConfig({
    plugins: [plugins.define(envKeys)]
  })

  reporter.success("making environment variables available as globals")
}
