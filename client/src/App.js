import './App.css';
import { UserProvider } from './context/UserContext';
import Home from './components/HomePage/Home'
import { Routes,Route } from 'react-router-dom';
import Login from './components/Account/Login';
import Register from './components/Account/Register'
import NoHeaderRoute from './route/NoHeaderRoute';
import TestUploadImage from './components/TestUploadImage';
import Profile from './components/UserManagement/Profile';
import Password from './components/UserManagement/Password';
import ForgotPassword from './components/UserManagement/ForgotPassword';
import ResetPassword from './components/UserManagement/ResetPassword';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<NoHeaderRoute path={["/register"]}/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/test' element={<TestUploadImage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/password' element={<Password/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/resetPassword' element={<ResetPassword/>}/>
        </Route>
      </Routes>
    </UserProvider>
  )

}
export default App;
