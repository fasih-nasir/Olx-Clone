
import {  Route, Routes,useLocation } from 'react-router-dom'
import './App.css'

//
import Navbar from './components/navbar'
import Login from './auth/login'
import Create from './auth/create'
import Home from './pages/home'
import Dash from './auth/dash'
import Detail from './pages/product-detail'
// 
function App() {
// console.log(window.location.pathname.startsWith("/auth"));
const location = useLocation();
  return (
 <>



{!location.pathname.startsWith("/auth") && <Navbar/> }
<Routes>
  <Route path='/' element={<Home/>}  ></Route>
  <Route path='/auth/dash' element={<Dash/>} ></Route>
  <Route path='/product-detail/:id' element={<Detail/>} ></Route>
  {/* <Route path='/auth/create' element={<Create/>} ></Route> */}

</Routes>

 </>
  )
}

export default App
