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
  plugins: [
    `gatsby-env-variables`
  ]
}
```

Create your's `.env` files inside `env/` folder, on root of your project, file `.env` will be default variable values, if you chose other env, these variables will be merged

```bash
project/
├── env/
  ├── .env
  ├── .env.development
  ├── .env.staging
  └── .env.production
```

.env

```env
COMMON=default
```

.env.staging

```env
COMMON=staging
HAS_HEADER=true
```

Run your yarn/npm script with `BUILD_ENV` variable to chose your environment, default selected is `development`

package.json

```bash
BUILD_ENV=staging yarn start
```

Use in client-side

```javascript
/* globals HAS_HEADER, COMMON */

function Example() {
  console.log(COMMON) // staging
  return HAS_HEADER && <Header />
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
        envFolderPath: `src/env/`
      }
    }
  ]
}
```

```bash
project/
├── src/
  ├── env/
    ├── .env
    ├── .env.development
    ├── .env.staging
    └── .env.production
```

Or you can use this option to rename to `config/` folder too

Example:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-env-variables`,
      options: {
        envFolderPath: `config/`
      }
    }
  ]
}
```

```bash
project/
├── config/
  ├── .env
  ├── .env.development
  ├── .env.staging
  └── .env.production
```

## Further reading

Check out the [DefinePlugin section][1] of the Webpack config documentation for more information.

[1]: https://webpack.js.org/plugins/define-plugin/
