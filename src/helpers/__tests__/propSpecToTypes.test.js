import propSpecToTypes from '../propSpecToTypes'
import PropTypes from 'prop-types'

const testType = type => propSpecToTypes({ name: { type } }).name

describe('propSpecToTypes', () => {
  test('returns null if there is nothing defined', () => {
    const retVal = propSpecToTypes()
    expect(retVal).toBe(null)
  })

  test('returns null if there are no types defined for the props', () => {
    const spec = {
      name: { default: 'some value' }
    }
    const retVal = propSpecToTypes(spec)
    expect(retVal).toBe(null)
  })

  test('returns string types', () => {
    const types = propSpecToTypes({
      name: { type: 'string' }
    })
    expect(types.name).toEqual(PropTypes.string)
  })

  test('returns other types', () => {
    expect(testType('array')).toEqual(PropTypes.array)
    expect(testType('bool')).toEqual(PropTypes.bool)
    expect(testType('func')).toEqual(PropTypes.func)
    expect(testType('number')).toEqual(PropTypes.number)
    expect(testType('object')).toEqual(PropTypes.object)
    expect(testType('string')).toEqual(PropTypes.string)
  })

  test('returns isRequired when required set to true', () => {
    expect(propSpecToTypes({ name: { type: 'string' } }).name).toEqual(PropTypes.string)
    expect(propSpecToTypes({ name: { type: 'string', required: false } }).name).toEqual(PropTypes.string)
    expect(propSpecToTypes({ name: { type: 'string', required: true } }).name).toEqual(PropTypes.string.isRequired)
  })
})
