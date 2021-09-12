import React from "react"
import { Link } from 'react-router-dom'
import WeatherFull from "./WeatherFull";


/*
display data.
two different components: for city & coordinates search.
saved cities.
clean code.
check for bugs.
*/


class Weather extends React.Component{
    constructor(props){
        super(props)

        this.params = this.parseQuery().city;
        console.log("params:", this.params);

        console.log("searchby:", this.props.location.search);
        
        // this.city = "london";
        // this.lat = 31.77;
        // this.lon= 35.21;
        // this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=c2152ce33eec94f628bcb40cda3da446`;
        // this.url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&APPID=c2152ce33eec94f628bcb40cda3da446`;
        
        this.state= {
            searchBy: "",
            city: this.params,
            loading: true,
            reqUrl: this.createReqUrl(this.parseQuery()),
            fullDet: false,
        }
    }

    createReqUrl = (parsedQueryObj) => {
        if(parsedQueryObj.searchBy === "city"){
            return `https://api.openweathermap.org/data/2.5/weather?q=${parsedQueryObj.city}&units=metric&APPID=c2152ce33eec94f628bcb40cda3da446`
        }else if(parsedQueryObj.searchBy === "coordinates"){
            return `https://api.openweathermap.org/data/2.5/weather?lat=${parsedQueryObj.lat}&lon=${parsedQueryObj.lon}&units=metric&APPID=c2152ce33eec94f628bcb40cda3da446`
        }
    }

    parseQuery(){
        let urlSearchParams = new URLSearchParams(this.props.location.search);
        return Object.fromEntries(urlSearchParams.entries());
    }

    componentDidUpdate(prevProps){
        if(prevProps.location.search !== this.props.location.search){
            console.log("new props:", this.parseQuery());
            this.setState({reqUrl: this.createReqUrl(this.parseQuery())}, () => this.fetchWeatherData());
            //this.setState({city: this.parseQuery().city}, () => this.fetchWeatherData())
        }
    }

    componentDidMount(){
        console.log("loading at did mount:", this.state.loading);
        this.fetchWeatherData();
        let interval = setInterval(() => {
           this.fetchWeatherData(); 
        }, 900000);
        this.setState({interval: interval})
    }

    componentWillUnmount(){
        clearInterval(this.state.interval)
    }

    fetchWeatherData = () =>{
        fetch(this.state.reqUrl)
        .then(res => res.json())
        .then((result) => {
            console.log("result:", result);
            if(result.cod === 200){
                console.log("here");
                this.setState({
                    loading: false,
                    data: result,
                    error: false,
                    //errorDes: ""
                });
            }else{
                console.log("result: ", result.cod, result.message);
                this.setState({loading: false, error: true, errorDes: result.cod +" "+ result.message})
            }
        },
            (error) => {
                console.log("error here:", error);
                this.setState({
                    loading: false,
                    error: true,
                    errorDes: error
                });
                console.log("fetch error");
            }
        )
    }

    showFullDet = (data) => {
        this.setState({
            fullDet: !this.state.fullDet,
            fullDetData: data
        });
    }

    render(){
        {this.state.loading && console.log("loading")}
        console.log("at render:", this.state.error);
        //{!this.state.loading && console.log("render:",this.state.data.main, "state:",this.state)}
        return(
            <div className="flex justify-center my-20">
                {!this.state.loading && !this.state.error &&
                    <WeatherFull
                        showFullDet={this.showFullDet}
                        data={this.state.data}
                        show={this.state.fullDet}
                    />}
                {this.state.error && <span>{this.state.errorDes} and that</span> }
                <p>{this.state.loading && <span>loading</span>}</p>
                    <div className="border rounded shadow-lg">{!this.state.loading && !this.state.error &&
                        <div className="flex flex-col mx-10 my-10">
                            {this.state.data.name !== "" && <span className="text-2xl">{this.state.data.name}</span>}
                            <span className="mb-4">{new Date().toLocaleDateString()}</span>
                            <span className="my-3 text-2xl">{Math.round(this.state.data.main.temp) + "" + String.fromCharCode(176)} </span>
                            <span>{this.state.data.weather[0].description}</span>
                            <span>wind: {this.state.data.wind.speed} kt</span>
                            <button className="text-xs my-2" onClick={this.showFullDet}>see more details</button>
                            <span className="text-xs mt-6">auto updates every 15 min</span>
                            <span className="text-xs">last update: {new Date().toLocaleTimeString()}</span>
                        </div>
                    }</div>
            </div>
        )
    }
}

export default Weather