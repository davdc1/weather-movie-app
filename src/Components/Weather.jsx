import React from "react"
import WeatherFull from "./WeatherFull";
import WeatherCard from "./WeatherCard";


class Weather extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            loading: true,
            reqUrl: this.createReqUrl(this.parseQuery()),
            fullDet: false,
        }
    }

    createReqUrl(parsedQueryObj){
        if(parsedQueryObj.searchBy === "city"){
            return `https://api.openweathermap.org/data/2.5/weather?q=${parsedQueryObj.city}&units=metric&APPID=c2152ce33eec94f628bcb40cda3da446`
        }else if(parsedQueryObj.searchBy === "coordinates"){
            return `https://api.openweathermap.org/data/2.5/weather?lat=${parsedQueryObj.lat}&lon=${parsedQueryObj.lon}&units=metric&APPID=c2152ce33eec94f628bcb40cda3da446`
        }
    }

    parseQuery(){
        let urlSearchParams = new URLSearchParams(this.props.location.search);
        console.log("query:", Object.fromEntries(urlSearchParams.entries()));
        return Object.fromEntries(urlSearchParams.entries());
    }

    componentDidUpdate(prevProps){
        if(prevProps.location.search !== this.props.location.search){
            this.setState({reqUrl: this.createReqUrl(this.parseQuery())}, () => this.fetchWeatherData());
        }
    }

    componentDidMount(){
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
                this.setState({
                    loading: false,
                    data: result,
                    error: false,
                    errorDes: ""
                });
            }else{
                this.setState({loading: false, error: true, errorDes: result.cod + " " + result.message})
            }
        },
            (error) => {
                this.setState({
                    loading: false,
                    error: true,
                    errorDes: "somthing went wrong"
                });
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
        return(
            <div className="flex justify-center my-20">
                {!this.state.loading && !this.state.error &&
                 <WeatherFull
                        showFullDet={this.showFullDet}
                        data={this.state.data}
                        show={this.state.fullDet}
                    />}
                {this.state.error && <span>{this.state.errorDes}</span> }
                <p>{this.state.loading && <span>loading</span>}</p>
                {!this.state.loading && !this.state.error &&
                    <WeatherCard data={this.state.data} showFullDet={this.showFullDet} />}
            </div>
        )
    }
}

export default Weather