import { Home } from './components/home/Home'
import NavBar from "./components/navbar/NavBar";
import './App.scss'



function App() {
  return (
    <div className="app__container">
      <NavBar/>
      <Home/>
    </div>
  );
}

export default App;
