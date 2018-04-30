import { parse as emmetParse } from '@emmetio/expand-abbreviation'

function parseAttributes (attrs) {
  return attrs.reduce(
    (accum, attr) => {
      accum[attr.name] = attr.value
      return accum
    },
    {}
  )
}

function parseNode (node) {
  const simple = {
    name: node.name,
    attributes: parseAttributes(node.attributes),
  }

  if (node.children && node.children.length > 0) {
    simple.children = node.children.map(parseNode)
  }

  return simple
}

function parse (str) {
  const ast = emmetParse(str)
  const transformed = parseNode(ast.children[0])
  return transformed
}

export default parse
