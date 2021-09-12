import React from "react"
import {Redirect} from 'react-router-dom'

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            searchBy: "city"
        }
    }

    searchCity = (e) => {
        e.preventDefault();
        console.log("search:", e.target[0].value);
        //this.setState({searchCity: e.target[0].value, redirect: true})
        if(e.target[0].value !== ""){
            this.setState({
                searchStr: `/weather?searchBy=${this.state.searchBy}&city=${e.target[0].value}`,
                redirect: true
            })
        }
    }

    searchCoordinates = (e) => {
        e.preventDefault();
        console.log("search:", e.target[0].value, e.target[1].value);
        //this.setState({searchlon: e.target[0].value, searchLat: e.target[1].value, redirect: true})
        if(e.target[0].value !== "" && e.target[1].value !== ""){
            this.setState({
                searchStr: `/weather?searchBy=${this.state.searchBy}&lon=${e.target[0].value}&lat=${e.target[1].value}`,
                redirect: true
            })
        }
    }

    searchBy = (e) => {
        console.log("select:", e.target.value);
        this.setState({searchBy: e.target.value});
    }

    render(){
        return(
            <div style={{height: "100px", border: "solid black 1px"}}>
                <p>header</p>
                <div>
                    <select onChange={this.searchBy} name="" id="">
                        <option value="city" defaultValue>city</option>
                        <option value="coordinates">coordinates</option>
                    </select>
                </div>
                
                {this.state.searchBy === "city" &&
                <form onSubmit={this.searchCity} action="">
                    <input type="text" placeholder="City"/>
                    <button>search</button>
                </form>}
                {this.state.searchBy === "coordinates" && 
                    <form action="" onSubmit={this.searchCoordinates}>
                        <input type="text" placeholder="lon" />
                        <input type="text" placeholder="lat" />
                        <button>search</button>
                    </form>
                }

                {this.state.redirect === true &&
                    <Redirect to={this.state.searchStr}
                />}

                {/* {this.state.redirect && this.state.searchBy === "city" &&
                    <Redirect to={{
                        pathname: `/weather?city=${this.state.searchCity}`,
                        state: {searchBy: "city"}
                    }}
                />}
                {this.state.redirect && this.state.searchBy === "coordinates" &&
                    <Redirect to={{
                        pathname: `/weather?searchBy=${this.state.searchBy}&lon=${this.state.searchlon}&lat=${this.state.searchLat}`,
                        //state: {searchBy: "coordinates"}
                    }}
                />} */}
            </div>
        )
    }
}

export default Header