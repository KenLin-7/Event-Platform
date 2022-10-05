import './App.css';
import { UserProvider } from './context/UserContext';
import Home from './components/HomePage/Home'
<<<<<<< HEAD
import {Routes,Route,Link } from 'react-router-dom';
=======
import { Routes, Route } from 'react-router-dom';
>>>>>>> feature/filter-page
import Login from './components/Account/Login';
import Register from './components/Account/Register'
import NoHeaderRoute from './route/NoHeaderRoute';
import TestUploadImage from './components/TestUploadImage';
<<<<<<< HEAD
import EventPost from "./components/EventPost/EventPost";
import EventDetail from "./components/EventDetail/EventDetail";
import EventEdit from "./components/EventEdit";


function App() {
    return (
        <UserProvider>
            <Routes>
                <Route element={<NoHeaderRoute path={["/register"]}/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/test' element={<TestUploadImage/>}/>
                  <Route path='/eventpost' element={<EventPost/>} />
                    <Route path='/eventdetail' element={<EventDetail/>} />
                    <Route path='/eventedit' element={<EventEdit/>}/>
                </Route>
            </Routes>
        </UserProvider>
    )

=======
import FilterPage from './components/FilterPage/FilterPage'
import UserPage from './components/UserPage/UserPage';

function App() {

  return (
    <UserProvider>
      <Routes>
        <Route element={<NoHeaderRoute path={["/register"]} />}>
          <Route path='/' element={<Home />} />
          <Route path='/filter' element={<FilterPage />} />
          <Route path='/filter/:keyword' element={<FilterPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/test' element={<TestUploadImage />} />
          <Route path='/user-page' element={<UserPage />} />
        </Route>
      </Routes>
    </UserProvider>
  )
>>>>>>> feature/filter-page

}
export default App;
