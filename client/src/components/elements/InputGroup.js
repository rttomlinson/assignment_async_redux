import React, {PropTypes} from 'react'

const InputGroup = ({name, labelText, children}) => (
  <div className="form-group">
    <label htmlFor={name}>{labelText}</label>
    {children}
  </div>
)

InputGroup.propTypes = {
  name: PropTypes.string,
  labelText: PropTypes.node.isRequired,
  children: PropTypes.node,
}

export default InputGroup
