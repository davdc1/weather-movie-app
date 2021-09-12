import React from "react"
import {Redirect} from 'react-router-dom'

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state= {}
    }

    submit = (e) => {
        e.preventDefault();
        console.log("search:", e.target[0].value);
        this.setState({searchStr: e.target[0].value, redirect: true})
    }

    render(){
        return(
            <div style={{height: "100px", border: "solid black 1px"}}>
                <p>header</p>
                
                <form onSubmit={this.submit} action="">
                    <input type="text" placeholder="City or coordinates"/>
                    <button>search</button>
                </form>
                {this.state.redirect && <Redirect to={`/weather?city=${this.state.searchStr}`}/>}
                {/* <Redirect to={`/catalog?q=${this.state.searchStr}`}/> */}
            </div>
        )
    }
}

export default Header