let cachedVariablesJson 

try {
 cachedVariablesJson = require("./cachedVariables.json")
} catch {
  console.log("Could not find cachedVariables.json")
}

const cachedVariables = cachedVariablesJson || {}

module.exports = cachedVariables
