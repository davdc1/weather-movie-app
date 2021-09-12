import React from "react"


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
            reqUrl: this.createReqUrl(this.parseQuery())
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
    }

    fetchWeatherData = () =>{
        fetch(this.state.reqUrl)
        .then(res => res.json())
        .then((result) => {
                this.setState({
                    loading: false,
                    data: result,
                    tempState: true
                });
                console.log("result: ", result);
                // if(this.state.data.message === "Not Found"){
                //     this.props.notFound();
                // }
            },
            (error) => {
                this.setState({
                    loading: false,
                    error: true
                });
                console.log("fetch error");
            }
        )
    }


    render(){
        {this.state.loading && console.log("loading")}
        //{!this.state.loading && console.log("render:",this.state.data.main, "state:",this.state)}
        return(
            <div style={{minHeight: "100px", border: "solid black 1px"}}>
                weather
                {/* city: {this.state.city} */}
                {this.state.error && <span>error</span> }
                <p>{this.state.loading && <span>loading</span>}</p>
                <div>{!this.state.loading && 
                    <div>
                        <p> {new Date().toLocaleDateString()}</p>
                        <p>last update: {new Date().toLocaleTimeString()}</p>
                        <p>weather: {this.state.data.weather[0].description}</p>
                        <p>temp: {this.state.data.main.temp}</p>
                        <p>wind: speed: {this.state.data.wind.speed} direction: {this.state.data.wind.deg}</p>
                    </div>
                
                }</div>
            </div>
        )
    }
}

export default Weather