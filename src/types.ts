import { Options } from 'remark-typedoc-symbol-links/dist/types'

export type PluginOptions = {
  /**
   * A unique identifier for the Typedoc project, correlates to `id` option for gatsby-source-typedoc
   */
  id?: string
} & Omit<Options, 'typedoc'>
