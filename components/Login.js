import PropTypes from 'prop-types'
import Button from './Button'

function Login({ handleLogin, errorText, isSubmit }) {

  return (
    <div className='login'>
      <div className="row">
        <div className="col-md-12 mb-3">
          <img src="/logo.svg" alt="We Are ComeOn" className='img-fluid slide-in-fwd-center' />
        </div>
      </div>
      <form className="row g-3 justify-content-center scale-in-ver-center" method='post' onSubmit={handleLogin}>
        <div className="col-md-6 position-relative login-form">
          <div className="form-group mb-2 position-relative">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" name='username' aria-describedby='usernameFeedback' id="username" placeholder='Username' required />
          </div>
          <div className="form-group position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name='password' className="form-control" aria-describedby='passwordFeedback' id="password" placeholder='Password' required />
          </div>
          <div className="d-flex align-items-center my-3">
            <Button className='global-btn w-100'>Login</Button>
          </div>
          {errorText && isSubmit && <div className="alert alert-danger" role="alert">{errorText}</div>}
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func,
  errorText: PropTypes.bool,
  isSubmit: PropTypes.bool
}

export default Login