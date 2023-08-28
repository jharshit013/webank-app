import './App.css';
import HomePage from './components/HomePage';
import SignIn from './components/Login';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import OpenAccount from './components/OpenAccount';
import SignUp from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewAccounts from './components/ViewAccounts';
import EditAccount from './components/EditAccount';
import AdminLogin from './components/Admin';
import Transaction from './components/Transaction';
import Payee from './components/Payee';
import Profile from './components/Profile';

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
              <Route path='/logout' Component={Logout} />
              <Route path='/accounts' Component={ViewAccounts} />
              <Route path='/accounts/:accountno' Component={EditAccount} />
              <Route path='/admin' Component={AdminLogin} />
              <Route path='/transaction' Component={Transaction} />
              <Route path='/payee' Component={Payee} />
              <Route path='/profile' Component={Profile} />
            </Routes>
          </Router>
        </div>
      </section>
    </div>
  );
}

export default App;
