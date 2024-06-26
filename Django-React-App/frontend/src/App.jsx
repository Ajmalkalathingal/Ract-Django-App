import './App.css'
import react from "react"
import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NoteFound from './pages/NoteFound'
import ProtectdRouter from './components/ProtecteRoute'

function App() {
function Logout() {
  localStorage.clear()
  return <Navigate to={'/login'}/>
}
function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={
        <ProtectdRouter>
          <Home/>
        </ProtectdRouter>
      }/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/Register' element={<RegisterAndLogout/>}/>
      <Route path='*' element={<NoteFound/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
