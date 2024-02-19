import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import HomeScreen from './screens/HomeScreen.jsx'
import RootLayout from './layouts/RootLayout.jsx'
import store from './store.js'

import LoginScreen from './screens/LoginScreen.jsx'
import StavaRedirect from './screens/StarvaRedirect.jsx'
import ResetPassword from './screens/ResetPassword.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import { ChakraProvider, theme } from '@chakra-ui/react'
import ActivityRule from './screens/ActivityRule/ActivityRule.jsx'
import ActivitiesScreen from './screens/ActivitiesScreen.jsx'
import AdminScreen from './screens/admin/AdminScreen.jsx'
import ActivityRuleNew from './screens/ActivityRule/ActivityRuleNew.jsx'
import AdminAddRuleScreen from './screens/admin/AdminAddRuleScreen.tsx'
import AdminListRuleScreen from './screens/admin/AdminListRuleScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      <Route path='/login' element={<LoginScreen />} />
      <Route path='/logout' element={<App />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
      <Route path='/strava/redirect' element={<StavaRedirect />} />

      <Route path="/" element={<RootLayout />} >
        <Route path='/' element={<HomeScreen />} />
        <Route path='/activityrule' element={<ActivityRule />} />
        <Route path='/activityrule/new' element={<ActivityRuleNew />} />
        <Route path='/activities' element={<ActivitiesScreen />} />
        <Route path='/admin/addrule' element={<AdminAddRuleScreen />} />
        <Route path='/admin' element={<AdminScreen />} />

      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider >
  </ChakraProvider>
)
