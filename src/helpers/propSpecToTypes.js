import PropTypes from 'prop-types'

const mapType = type => {
  const map = {
    array:  PropTypes.array,
    bool:   PropTypes.bool,
    func:   PropTypes.func,
    number: PropTypes.number,
    object: PropTypes.object,
    string: PropTypes.string,
  }
  return map[type]
}

function propSpecToTypes (spec) {
  if (!spec) {
    return null
  }

  let types = {}

  Object.keys(spec).forEach(key => {
    // { type: 'string', default: '' }
    const propSpec = spec[key]
    if (propSpec.type) {
      let type = mapType(propSpec.type)
      if (type) {
        if (propSpec.required) {
          type = type.isRequired
        }
        types[key] = type
      }
    }
  })

  return Object.keys(types).length > 0 ? types : null
}

export default propSpecToTypes
