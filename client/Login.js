import React from 'react'
import {connect} from 'react-redux'
import {login} from './reducer'

const AuthForm = (props) => {
  const {handleSubmit} = props

  return (
    <div className='h100 w100 flex column align-items-center justify-center'>
      <h1>Log In</h1>
      <div className='flex w50'>
        <form className='grow1' onSubmit={handleSubmit}>
          <div className='flex column'>
            <div className='flex column m1'>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' className='input' />
            </div>
            <div className='flex column m1'>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' className='input' />
            </div>
            <div className='m1'>
              <button type='submit' className='btn bg-blue white p1 rounded'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

// const mapDispatchToProps = (dispatch, ownProps) => {
//   const history = ownProps.history

//   return {
//     handleSubmit (event) {
//       event.preventDefault()
//       const email = event.target.email.value;
//       const password = event.target.password.value;
//       dispatch(login({email, password})).then(() => history.push("/home"))
//     }
//   }
// }

// export default connect(null, mapDispatchToProps)(Login)
