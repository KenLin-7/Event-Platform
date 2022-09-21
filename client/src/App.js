import './App.css';
import { UserProvider } from './context/UserContext';
import Register from './components/Register';
import Login from './components/Login';


function App() {
  return (
    <UserProvider>
      <Login/>
    </UserProvider>
  );
}

export default App;
