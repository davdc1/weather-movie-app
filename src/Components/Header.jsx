import React from "react"
import { Link } from 'react-router-dom'
import WeatherNavBar from "./WeatherNavBar";
import MoviesNavBar from "./MoviesNavBar";



class Header extends React.Component{
    
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
        return(
            <div className="bg-gray-100 border-b-4 border-gray-300 pt-5">
                 <Link className="border border-green-500 shadow-lg rounded px-2 mx-2" to="/"><button>Home</button></Link>
                 <button onClick={() => {this.changeNavBar("weather")}} className="border border-green-500 shadow-lg rounded px-2 mx-2">weather</button>
                 <button onClick={() => {this.changeNavBar("movies")}} className="border border-green-500 shadow-lg rounded px-2 mx-2">movies</button>
                {this.state.navBar === "weather" && <WeatherNavBar />}
                {this.state.navBar === "movies" && <MoviesNavBar />}
            </div>
            )

    }
}

export default Header