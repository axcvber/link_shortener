import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  React.useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h3>Short Link</h3>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Sign in / Sign up</span>
            <div>
              <div className='input-field'>
                <input placeholder='Enter email' type='text' name='email' onChange={changeHandler} value={form.email} />
              </div>
              <div className='input-field'>
                <input
                  placeholder='Enter password'
                  type='password'
                  name='password'
                  onChange={changeHandler}
                  value={form.password}
                />
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn yellow darken-4'
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Sign In
            </button>
            <button className='btn grey lighten-1 black-text' onClick={registerHandler} disabled={loading}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
