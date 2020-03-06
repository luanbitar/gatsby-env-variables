<p align="center">
  <img src="illustration.svg" width="300">
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/gatsby-env-variables">
    <img src="https://img.shields.io/npm/v/gatsby-env-variables.svg">
  </a>
  <a href="https://www.npmjs.com/package/gatsby-env-variables">
    <img src="https://img.shields.io/npm/dt/gatsby-env-variables.svg">
  </a>
</p>

<p align="center">
  <h1 align="center"> gatsby-env-variables </h1>
</p>


<p align="center">
  Webpack feature to provide your custom environment variables in client side
</p>

<p align="center">
  Use `BUILD_ENV` to chose wich environment file to load and `THEME` to chose theme variables together
</p>

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

Create your's `environment.js` files inside `env/` folder, on root of your project, file `index.js` will be the file with variables shared between multiple environments, if you chose other env, these variables will be merged

```bash
project/
├── env/
  ├── index.js
  ├── development.js
  ├── staging.js
  └── production.js
```

index.js
```javascript
module.exports = {
  API_ROOT: "example.com",
  CARDS: "/cards",
}
```

staging.js
```javascript
module.exports = {
  API_ROOT: "stg.example.com",
}
```

Run your yarn/npm script with `BUILD_ENV` variable to chose your environment, default selected is `development`

package.json

```bash
BUILD_ENV=staging yarn start
```

# Use in client-side

## Global variables

```javascript
/* globals API_ROOT, CARDS */

function Example() {
  const cardsURL = API_ROOT + CARDS // stg.example.com/cards
  fetch(cardsURL)
}
```

If you don't want to use `/* globals */` in each file, just create an empty `.eslintrc` file in your project folder. If you are using eslint, just disable the `no-undef` rule.

## Importing variables

```javascript
import { API_ROOT, CARDS } from "gatsby-env-variables"

function Example() {
  const cardsURL = API_ROOT + CARDS // stg.example.com/cards
  fetch(cardsURL)
}
```
# Using themes

You can have multiple themes, with multiple environments, just put your variables inside the name of theme, and use `THEME=example` on your running script

staging.js
```javascript
module.exports = {
  API_ROOT: "stg.example.com",
  dark: {
    CARDS: "/dark_cards",
  }
}
```

package.json

```bash
THEME=dark BUILD_ENV=staging yarn start
```

Use in client-side

```javascript
function Example() {
  const cardsURL = API_ROOT + CARDS // stg.example.com/dark_cards
  fetch(cardsURL)
}
```

## Nested Objects

String values are not required, you can use nested objects too

staging.js
```javascript
module.exports = {
  API: {
    CARDS: "/cards"
  }

  dark: {
    API_ROOT: "darkexample.com"
  }
}
```

## Async variables

If you have to put dynamic variables in you environment, like values coming from API or something like this, you can export an promise

staging.js
```javascript
module.exports = new Promise(async res => {
  const ROOT_API = "example.com"
  const CARDS = "/cards"

  const response = await fetch(ROOT_API + CARDS)
  const ACTIVE_CARDS = await response.json()

  const envs = {
    ROOT_API,
    CARDS,
    ACTIVE_CARDS,
    dark: {
      CARDS: "/dark_cards",
    },
    orange: {
      CARDS: "/orange_cards",
    },
  }

  res(envs)
}) 
```


# Options

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
    ├── index.js
    ├── development.js
    ├── staging.js
    └── production.j
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
  ├── index.js
  ├── development.js
  ├── staging.js
  └── production.jn
```

## Further reading

Check out the [DefinePlugin section][1] of the Webpack config documentation for more information.

[1]: https://webpack.js.org/plugins/define-plugin/
