import React from 'react'
import Button from './Button'

function Login({ handleLogin, errorText, isSubmit }) {

  return (
    <div className='login'>
      <div className="row">
        <div className="col-md-12 mb-3">
          <img src="/logo.svg" alt="We Are ComeOn" className='img-fluid' />
        </div>
      </div>
      <form className="row g-3 justify-content-center needs-validation" method='post' onSubmit={handleLogin}>
        <div className="col-md-6 position-relative login-form">
          <div className="form-group mb-2 position-relative">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" name='username' aria-describedby='usernameFeedback' id="username" placeholder='Username' required />
          </div>
          <div className="form-group position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name='password' className="form-control" aria-describedby='passwordFeedback' id="password" placeholder='Password' required />
          </div>
          <div className="d-flex align-items-center mt-5">
            <Button className='global-btn'>Login</Button>
          </div>
          {errorText && isSubmit && <div className="alert alert-danger mt-5" role="alert">{errorText}</div>}
        </div>
      </form>
    </div>
  )
}

export default Login