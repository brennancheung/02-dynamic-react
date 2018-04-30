import parse from '../emmet'

describe('emmet', () => {
  test('parse emmet', () => {
    const ast = parse('#main')
    expect(ast).toEqual({ name: 'div', attributes: { id: 'main' } })
  })

  test('more complex example', () => {
    const ast = parse('#main>ul>li*3')
    expect(ast).toMatchObject({
      name: 'div',
      attributes: { id: 'main' },
      children: [
        {
          name: 'ul',
          children: [
            { name: 'li' },
            { name: 'li' },
            { name: 'li' }
          ]
        }
      ]
    })
  })
})
