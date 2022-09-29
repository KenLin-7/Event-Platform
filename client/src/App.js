import './App.css';
import { UserProvider } from './context/UserContext';
import Home from './components/HomePage/Home'
import { Routes,Route,Link } from 'react-router-dom';
import Login from './components/Account/Login';
import Register from './components/Account/Register'
import NoHeaderRoute from './route/NoHeaderRoute';
import TestUploadImage from './components/TestUploadImage';
import {NotificationProvider} from './context/NotificationContext'

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
      <Routes>
        <Route element={<NoHeaderRoute path={["/register"]}/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/test' element={<TestUploadImage/>}/>
        </Route>
      </Routes>
      </NotificationProvider>
    </UserProvider>
  )

}
export default App;
