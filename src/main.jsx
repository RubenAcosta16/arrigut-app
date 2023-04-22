import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './routes/login'
import Dashboard from './routes/dashboard'
import Signout from './routes/signout'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/' element={<Login />}></Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/signout' element={<Signout />}></Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
