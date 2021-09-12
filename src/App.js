import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Weather from './Components/Weather';
import Movies from './Components/Movies';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/weather" component={Weather} />
            <Route path="/movies" component={Movies} />
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
