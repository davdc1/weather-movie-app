import React from "react"
import {Redirect, Link } from 'react-router-dom'

class WeatherNavBar extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            searchBy: "city"
        }
    }

    searchCity = (e) => {
        e.preventDefault();
        if(e.target[0].value !== ""){
            this.setState({
                searchStr: `/weather?searchBy=${this.state.searchBy}&city=${e.target[0].value}`,
                redirect: true
            })
        }
    }

    searchCoordinates = (e) => {
        e.preventDefault();
        if(e.target[0].value !== "" && e.target[1].value !== ""){
            this.setState({
                searchStr: `/weather?searchBy=${this.state.searchBy}&lon=${e.target[0].value}&lat=${e.target[1].value}`,
                redirect: true
            })
        }
    }

    searchBy = (e) => {
        this.setState({searchBy: e.target.value});
    }

    render(){
        return(
            <div className="bg-gray-100 border-b-4 border-gray-300 pt-5">
                <div  className="flex flex-col justify-center items-center">
                    <div className="my-10">
                        {this.state.searchBy === "city" &&
                        <form onSubmit={this.searchCity} action="">
                            <input className="border rounded-tl rounded-bl py-0.5 px-2" type="text" placeholder="City"/>
                            <button className="border py-0.5 px-2 rounded-tr rounded-br">search</button>
                        </form>}
                        {this.state.searchBy === "coordinates" && 
                            <form action="" onSubmit={this.searchCoordinates}>
                                <input className="border rounded-tl rounded-bl py-0.5 px-2" type="text" placeholder="lon" />
                                <input className="border py-0.5 px-2" type="text" placeholder="lat" />
                                <button className="border py-0.5 px-2 rounded-tr rounded-br">search</button>
                            </form>
                        }
                        <div>
                            <select className="border rounded py-0.5 px-2 mt-4" onChange={this.searchBy} name="" id="">
                                <option value="city" defaultValue>city</option>
                                <option value="coordinates">coordinates</option>
                            </select>
                        </div>

                        {this.state.redirect === true &&
                            <Redirect to={this.state.searchStr}
                        />}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherNavBar