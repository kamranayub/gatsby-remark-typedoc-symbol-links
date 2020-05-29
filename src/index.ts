import remarkTypedocSymbolLinks from 'remark-typedoc-symbol-links'
import type { Node, Root } from 'ts-mdast'
import { DEFAULT_OPTIONS } from './constants'
import { PluginOptions } from './types'

interface RemarkPluginArgs {
  markdownAST: Root
  getNodes: () => Node[]
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

/**
 * Whether or not the given node is a Typedoc node
 * @param n Node to check
 */
function isTypedocNode(n: Node): n is TypedocNode {
  return n.internal && (n.internal as any).type === 'Typedoc'
}

export = async ({ markdownAST, getNodes /*, getNodesByType */ }: RemarkPluginArgs, pluginOptions: PluginOptions) => {
  const options = Object.assign({}, DEFAULT_OPTIONS, pluginOptions)
  const typedocNodes = getNodes().filter(isTypedocNode)

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
