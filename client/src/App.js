import './App.css';
import { UserProvider } from './context/UserContext';
import Register from './components/Register';
import Login from './components/Login';


function App() {
  return (
    <UserProvider>
      <Register/>
    </UserProvider>
  );
}

export default App;
