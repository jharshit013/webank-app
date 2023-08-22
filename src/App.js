import './App.css';
import SignIn from './components/Login';
import NavBar from './components/NavBar';
import SignUp from './components/Register';

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
          <NavBar />
          <SignIn />
          <SignUp />
        </div>
      </section>
    </div>
  );
}

export default App;
