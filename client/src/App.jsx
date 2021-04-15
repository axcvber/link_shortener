import React from 'react'
import 'materialize-css'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'

export const App = () => {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)
  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuth,
      }}
    >
      <BrowserRouter>
        {isAuth && <Navbar />}
        <div className='container'>{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
