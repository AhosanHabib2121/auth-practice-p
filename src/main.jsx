import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myCreateRoutes from './routes/Routes'
import AuthContext from './contextAPI/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
        <RouterProvider router={myCreateRoutes}/>
    </AuthContext>
  </React.StrictMode>,
)
