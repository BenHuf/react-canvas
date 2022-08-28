import { useEffect, useState } from "react"
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Home from "./pages/Home"
import Users from "./pages/Users"
import User from "./pages/User"
import Login from "./pages/Login"
import PageNotFound from "./pages/404"
import Navigation from "./components/Navigation"
import Canvas from './components/Canvas'
import Discussion from './pages/Discussion'
import Rorschachs from './pages/Rorschachs'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [ authUser, setAuthUser ] = useState(null)

  // const checkForValidUser = async() => {
  //   const authCheck = await fetch("/api/user/lookup")
  //   const checkResult = await authCheck.json()
  //   if( checkResult && checkResult.result === "success" ){
  //     setAuthUser(checkResult.payload)
  //   }
  // }
  
  // useEffect(() => {
  //   checkForValidUser()
  // }, [])

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/draw" element={<Canvas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user">
            <Route path=":id" element={<User />} />
          </Route>
          <Route path="/draw" element={<Canvas />} />
          <Route path="/discuss" element={<Discussion />} />
          <Route path="/rorschachs" element={<Rorschachs />} />
          <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
