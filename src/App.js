import './App.css';
import HomePage from './components/HomePage';
import SignIn from './components/Login';
import NavBar from './components/NavBar';
import OpenAccount from './components/OpenAccount';
import SignUp from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <section>
        <div style={{
          backgroundImage: "url(/images/webank-bg.jpg)",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '140vh',
          minWidth: '100vw'
        }}>
          <Router>
            <NavBar />
            <Routes>
              <Route path='/' exact Component={HomePage} />
              <Route path='/login' Component={SignIn} />
              <Route path='/register' Component={SignUp} />
              <Route path='/openaccount' Component={OpenAccount} />
            </Routes>
          </Router>
        </div>
      </section>
    </div>
  );
}

export default App;
