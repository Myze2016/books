import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import User from './component/User';
import Menu from './component/Menu';
import MenuAdmin from './component/MenuAdmin';


function App() {
 

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUserType = () => {
    const userType = sessionStorage.getItem('userID');
    return userType;
  };
  
  const token = getToken();
  const userType = getUserType();


  if(token==false || token==null) {
    return <User />  
  } else {
    
     if (userType=='15') {
       return <MenuAdmin/>
     } else {
        return <Menu/>
     }
 
  }

  return (
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
      </header>
    </div>
  );
}

export default App;
