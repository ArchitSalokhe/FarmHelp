import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import Dashboard from './component/Dashboard';
// import Profile from './component/Profile';
import WeatherAPI from './component/WeatherAPI';
import Maps from './component/Maps';
import Crops from './component/Crops';
import Diseasepre from './component/Diseasepre';



function App() {
  return (
    <BrowserRouter>
    
			<Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        {/* <Route path='/profile' element={<Profile/>}/> */}
        <Route path='/weatherapi' element={<WeatherAPI/>}/>
        <Route path='/maps' element={<Maps/>}/>
        <Route path='/crops' element={<Crops/>}/>
        {/* <Route path='/navbar' element={<Navbar/>}/> */}
        <Route path='/disease' element={<Diseasepre/>}/>
			</Routes>
		</BrowserRouter>
  
  );
}

export default App;
