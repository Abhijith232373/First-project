import NavBar from "./Components/NavBar"
import SignUp from "./Pages/SignUp"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
function App() {

  return (
    <Routes>
    <Route path='/signup' element={< SignUp/>} /> 
      <Route path="/" element={<NavBar/>}/>
     </Routes>
  )
}

export default App
