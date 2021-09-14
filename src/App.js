import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Weather from './Components/Weather';
import Movies from './Components/Movies';
import MoviePage from './Components/MoviePage';
import React from 'react';

class App extends React.Component{
  
  constructor(props){
    super(props)

    this.state = {
      navBar: ""
    }
  }

  changeNavBar = (str) => {
    if(str === "weather"){
      this.setState({navBar: "weather"})
    }else if(str === "movies"){
      this.setState({navBar: "movies"})
    }
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Header navBar={this.state.navBar} />
            <Switch>
              <Route exact path='/' component={props => <Home  changeNavBar={this.changeNavBar} {...props}/>}/>
              <Route path="/weather" component={Weather} />
              <Route path="/movies" component={Movies} />
              <Route path="/moviepage/:id" component={props => <MoviePage {...props} />}/>
            </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
