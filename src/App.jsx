import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import HomePage from'./Pages/HomePage'

// import NavBar from './OpenUi/NavBar'
// import Products from './Pages/Products'
import Login from './User/Login'
import SignUp from "./User/SignUp"
import Products from "./Pages/Products"
function App() {

  return (
  <>

{/* <Login/> */}
  {/* <NavBar/>  */}
  {/* <Products/> */}
    <Routes>
    <Route path='/'  element={<HomePage/>}/>
    <Route path='/user' element={<Login/>} /> 
    <Route path ='/signup' element ={<SignUp/>}/>
    <Route path ='/products' element ={<Products/>}/>


     </Routes>
     </>
  )
}

export default App

