import remarkTypedocSymbolLinks from 'remark-typedoc-symbol-links'
import type { Node, Root } from 'ts-mdast'
import { DEFAULT_OPTIONS } from './constants'
import { PluginOptions } from './types'

interface RemarkPluginArgs {
  markdownAST: Root
  getNodesByType: <TNode = Node>(type: string) => TNode[]
}

/**
 * AST node type from gatsby-source-typedoc
 */
interface TypedocNode extends Node {
  internal: {
    type: 'Typedoc'
    content: string
  }
}

export = async ({ markdownAST, getNodesByType }: RemarkPluginArgs, pluginOptions: PluginOptions) => {
  const options = Object.assign({}, DEFAULT_OPTIONS, pluginOptions)
  const typedocNodes = getNodesByType<TypedocNode>('TypeDoc')

  if (typedocNodes && typedocNodes.length) {
    typedocNodes.forEach((node) => {
      if (node.typedocId !== options.id) {
        return
      }
      const transform = remarkTypedocSymbolLinks({ ...options, typedoc: JSON.parse(node.internal.content) })

      transform(markdownAST)
    })
  }

  return markdownAST
}
