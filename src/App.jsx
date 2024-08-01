import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Admin, Analytics, Dashboard, Home, Landing } from './pages/index'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login } from './pages/Login'



function App() {

  const [user, setUser] = useState(null)

  const login = () => {
    setUser({
      id: 1,
      name: 'Elvis',
      permissions: [''],
      roles: ['']
    })
  }

  const logout = () => setUser(null)

  return (
    <BrowserRouter>

      <Navigation />

      {
        user ?
          <button onClick={logout}>Logout</button>
          :
          <button onClick={login}>Login</button>
      }

      <Routes>
        <Route index element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/landing' element={<Landing />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/analytics' element={
          <ProtectedRoute
            isAllowed={!!user && user.permissions.includes('analize')}
            redirectTo='/home'
          >
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path='/admin' element={
          <ProtectedRoute
            isAllowed={!!user && user.roles.includes('admin')}
            redirectTo='/home'
          >
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )

  function Navigation() {
    return <nav >
       <ul>
        <li>
          <Link to='/landing'>Landing</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/analytics'>Analytics</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/admin'>Admin</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  } 
}

export default App