import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import HomePage from'./Pages/HomePage'
import Login from './User/Login'
import SignUp from "./User/SignUp"
import Products from "./Pages/Products"
import Dining from "./Pages/Dining"
import Living from "./Pages/Living"
import Storage from "./Pages/Storage"
function App() {

  return (
  <>
    <Routes>
    <Route path='/'  element={<HomePage/>}/>
    <Route path='/user' element={<Login/>} /> 
    <Route path ='/signup' element ={<SignUp/>}/>
    <Route path ='/products' element ={<Products/>}/>
    <Route path ='/dining' element={<Dining/>}/>
    <Route path ='/living' element={<Living/>}/>
    <Route path ='/Storage' element={<Storage/>}/>


     </Routes>
     </>
  )
}

export default App

