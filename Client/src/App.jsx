import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  RouterProvider } from 'react-router-dom'
import router from './Route/user_route'
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <RouterProvider router = {router}></RouterProvider>
    {/* <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
    /> */}
  
    </>
  )
}

export default App
