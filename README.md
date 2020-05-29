# gatsby-remark-typedoc-symbol-links

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kamranayub/gatsby-remark-typedoc-symbol-links.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/kamranayub/gatsby-remark-typedoc-symbol-links.svg)
![npm](https://img.shields.io/npm/dw/gatsby-remark-typedoc-symbol-links.svg)
![npm](https://img.shields.io/npm/dm/gatsby-remark-typedoc-symbol-links.svg)
![npm](https://img.shields.io/npm/dy/gatsby-remark-typedoc-symbol-links.svg)
![npm](https://img.shields.io/npm/dt/gatsby-remark-typedoc-symbol-links.svg)
![NPM](https://img.shields.io/npm/l/gatsby-remark-typedoc-symbol-links.svg)
![npm](https://img.shields.io/npm/v/gatsby-remark-typedoc-symbol-links.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/kamranayub/gatsby-remark-typedoc-symbol-links.svg)
![npm collaborators](https://img.shields.io/npm/collaborators/gatsby-remark-typedoc-symbol-links.svg)

A Gatsby.js Remark plugin that transform Typedoc symbol links (e.g. `[[symbol.path]]`). Designed to be used with [gatsby-source-typedoc](https://github.com/kamranayub/gatsby-source-typedoc) which creates Gatsby nodes for GraphQL that contain your Typedoc project but you could provide your own Typedoc project reflection using `fs.readSync`.

This plugin just wraps [remark-typedoc-symbol-links](https://github.com/kamranayub/remark-typedoc-symbol-links) and passes the `options.typedoc` on your behalf using the sourced Typedoc Gatsby node(s).

## Install

    npm install gatsby-source-typedoc gatsby-remark-typedoc-symbol-links --save-dev

## Usage

Configure your `gatsby-config.js`:

### Add `gatsby-source-typedoc`

First, include `gatsby-source-typedoc` in your config to generate your Typedoc:

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-typedoc',
      options: {
        src: [`${__dirname}/my-typescript-project/index.ts`],
        typedoc: {
          mode: 'modules',
          tsconfig: `${__dirname}/my-typescript-project/tsconfig.json`,
        },
      },
    },
  ],
}
```

See [gatsby-source-typedoc](https://github.com/kamranayub/gatsby-source-typedoc) for complete set of options.

### Markdown with `gatsby-transformer-remark`

When using with `gatsby-transformer-remark`, include under `options.plugins`:

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-typedoc-symbol-links',
            options: {
              /* provide options here */
            },
          },
        ],
      },
    },
  ],
}
```

### MDX with `gatsby-plugin-mdx`

When using with `gatsby-plugin-mdx`, include under `options.gatsbyRemarkPlugins` config:

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-typedoc-symbol-links',
            options: {
              /* provide options here */
            },
          },
        ],
      },
    },
  ],
}
```

## Options

### `options.id` (optional, default: `default`)

This corresponds to the [gatsby-source-typedoc](https://github.com/kamranayub/gatsby-source-typedoc) `id` option. This allows you to source from multiple Typedoc projects. By default, the ID is `default` and if you need more, they should be unique.

### Options from remark-typedoc-symbol-links

The rest of the options (excluding `options.typedoc` which is sourced for you) are documented in [remark-typedoc-symbol-links](https://github.com/kamranayub/remark-typedoc-symbol-links), they are passed through.

## Demo / Example

This was developed for use on the [excalibur.js](https://excaliburjs.com) project and is used in the documentation site, see [the Gatsby config](https://github.com/excaliburjs/excaliburjs.github.io/blob/site/gatsby-config.js).

## Contributing

See [Contributing](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md)

## License

MIT