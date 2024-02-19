import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute() {
    console.log("In private route !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    const { userInfo } = useSelector(state => state.user)
    return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}
