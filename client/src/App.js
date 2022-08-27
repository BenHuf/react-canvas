import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Home from "./pages/Home"
import Users from "./pages/Users"
import User from "./pages/User"
import Login from "./pages/Login"
import PageNotFound from "./pages/404"
import Navigation from "./components/Navigation"
import Canvas from './components/Canvas'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [ authUser, setAuthUser ] = useState(null)

  const checkForValidUser = async() => {
    const authCheck = await fetch("/api/user/lookup")
    const checkResult = await authCheck.json()
    if( checkResult && checkResult.result === "success" ){
      setAuthUser(checkResult.payload)
    }
  }
  
  useEffect(() => {
    checkForValidUser()
  }, [])

  return (
    <>
    <Navigation/>
    <Canvas/>
    </>
  );
}

export default App;
