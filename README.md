[![Version](https://img.shields.io/npm/v/gatsby-env-variables.svg)](https://www.npmjs.com/package/gatsby-env-variables)
[![Downloads Total](https://img.shields.io/npm/dt/gatsby-env-variables.svg)](https://www.npmjs.com/package/gatsby-env-variables)

# gatsby-env-variables

Webpack feature to provide your custom environment env in client side
Use `BUILD_ENV` to chose current `.env` file

## Install

`$ npm i gatsby-env-variables`

or

`$ yarn add gatsby-env-variables`

## How to use

Add the plugin to your `gatsby-config.js`.
```javascript
module.exports = {
  plugins: [`gatsby-env-variables`]
}
```

Create your's `.env` files in root of your project

```bash
project/
│ package.json
│ .env.development
│ .env.staging
└ .env.production
```

.env.staging
```env
HAS_HEADER=true
```

Run your yarn/npm script with `BUILD_ENV` variable to chose your environment, default selected is `development`

package.json
```bash
BUILD_ENV=staging yarn start
```

Use in client-side
```javascript
function Example() {
  return process.env.HAS_HEADER && <Header />
}
```

## Options

### `envFolderPath`

This options allows you to specify which folder will stay your `.env` files

Example:
```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-env-variables`,
      options: {
        envFolderPath: "src/env/"
      }
    }
  ]
}
```

```bash
project/
├── src/
│	├── env/
│	│	├── .env.development
│	│	├── .env.staging
│	│	└── .env.production
```

## Further reading

Check out the [DefinePlugin section][1] of the Webpack config documentation for more information.

[1]: https://webpack.js.org/plugins/define-plugin/
