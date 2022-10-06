import './App.css';
import { UserProvider } from './context/UserContext';
import Home from './components/HomePage/Home'
import { Routes,Route } from 'react-router-dom';
import Login from './components/Account/Login';
import Register from './components/Account/Register'
import NoHeaderRoute from './route/NoHeaderRoute';
import TestUploadImage from './components/TestUploadImage';
import {NotificationProvider} from './context/NotificationContext'
import Profile from './components/UserManagement/Profile';
import Password from './components/UserManagement/Password';
import ForgotPassword from './components/UserManagement/ForgotPassword';
import ResetPassword from './components/UserManagement/ResetPassword';
import EventPost from "./components/EventPost/EventPost";
import EventDetail from "./components/EventDetail/EventDetail";
import EventEdit from "./components/EventEdit";
import FilterPage from "./components/FilterPage/FilterPage";
import UserPage from './components/UserPage/UserPage';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
      <Routes>
        <Route element={<NoHeaderRoute path={["/register"]} />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/filter' element={<FilterPage />} />
          <Route path='/filter/:keyword' element={<FilterPage />} />
          <Route path='/test' element={<TestUploadImage />} />
          <Route path='/eventpost' element={<EventPost />} />
          <Route path='/eventdetail' element={<EventDetail />} />
          <Route path='/eventedit/:id' element={<EventEdit />} />
          <Route path='/user-page' element={<UserPage />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/password' element={<Password/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/resetPassword' element={<ResetPassword/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
        </Route>
      </Routes>
      </NotificationProvider>
    </UserProvider>
  )

}
export default App;
