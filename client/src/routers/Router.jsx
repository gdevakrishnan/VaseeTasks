import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Dashboard from "../pages/Dashboard"
import Userlogin from '../pages/Userlogin'
import Adminlogin from '../pages/Adminlogin'
import Drawer from '../components/Drawer'
import Managerlogin from '../pages/Managerlogin'

function Router() {
  return (
    <Fragment>
      <BrowserRouter>
            <Drawer />
            <Routes>
                <Route path='/' default index element={<Dashboard />}/>
                <Route path='/login' index element={<Userlogin />}/>
                <Route path='/manager-login' index element={<Managerlogin />}/>
                <Route path='/admin-login' index element={<Adminlogin />}/>
            </Routes>
            <Outlet />
        </BrowserRouter>
    </Fragment>
  )
}

export default Router
