import './App.css';
import { UserProvider } from './context/UserContext';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/HomePage/Home'
import Header from './components/Header';


function App() {
  return (
    <UserProvider>
       <Header/>
      {/* <Home/>  */}
      <Register/>
    </UserProvider>
  )

}
export default App;
