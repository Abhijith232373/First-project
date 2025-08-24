import NavBar from "./OpenUi/NavBar"
import SignUp from "./Pages/SignUp"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import HomePage from'./Pages/HomePage'
function App() {

  return (
  <>
    <HomePage/>
    <Routes>
    <Route path='/signup' element={< SignUp/>} /> 
      <Route path="/nav" element={<NavBar/>}/>
     </Routes>
     </>
  )
}

export default App

