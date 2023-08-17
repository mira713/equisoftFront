import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/nav';
import AllRoute from './routes/allRoute';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <AllRoute/>
    </div>
  );
}

export default App;
