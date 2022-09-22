import './App.css';
import { UserProvider } from './context/UserContext';
import Home from './components/HomePage/Home'
import Header from './components/Header';
import { Routes,Route,Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
import NoHeaderRoute from './route/NoHeaderRoute';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<NoHeaderRoute path={["/register"]}/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
    </UserProvider>
  )

}
export default App;
