import './App.css';
import NavBar from './components/NavBar';

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
        </div>
      </section>
    </div>
  );
}

export default App;
