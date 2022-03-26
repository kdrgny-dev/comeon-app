import PropTypes from 'prop-types'

function Button({className, children, onClick}) {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

export default Button