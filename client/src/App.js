import './App.css';
import { UserProvider } from './context/UserContext';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Profile from './components/UserManagement/Profile';
import Password from './components/UserManagement/Password';
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/password' element={<Password/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
export default App;
