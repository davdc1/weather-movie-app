import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import weather from './Components/Weather';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/weather" component={weather} />
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
