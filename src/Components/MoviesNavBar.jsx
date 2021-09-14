import React from "react";
import { Link, Redirect } from "react-router-dom"


class MoviesNavBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    search = (e) => {
        e.preventDefault();
        if(e.target[0].value !== ""){
            this.setState({
                searchStr: `/movies?search=${e.target[0].value}&page=1`,
                redirect: true
            })
        }
    }

    render(){
        return(
            <div className="flex flex-col items-center justify-center">
                <form onSubmit={this.search} className="my-3">
                    <input className="border rounded-tl rounded-bl py-0.5 px-2" type="text" placeholder="search movies" />
                    <button className="border py-0.5 px-2 rounded-tr rounded-br">search</button>
                </form>
                {this.state.redirect && <Redirect to={this.state.searchStr} />}
            </div>
        )
    }
}

export default MoviesNavBar