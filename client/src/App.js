import logo from './logo.svg';
import './App.css';
import { signIn,getInfo,logout,getUser} from './api/UserAPI';
import { UserProvider } from './context/UserContext';

const login = ()=>{
  signIn()
}
const getUserInfo = ()=>{
    getInfo("13@qq.com")
}

const log2 = ()=>{
  logout()
}

const currentUser = ()=>{
  getUser()
}

function App() {
  return (
    <UserProvider>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={login}>Sign in</button>
        <button onClick={getUserInfo}>Get Info</button>
        <button onClick={log2}>logout</button>
        <button onClick={currentUser}>get Login</button>

      </header>
    </div>
    </UserProvider>
  );
}

export default App;
