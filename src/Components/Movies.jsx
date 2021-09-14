import React from "react"
import MovieCard from "./MovieCard";


class Movies extends React.Component{
    constructor(props){
        super(props)
        
        this.par = this.parseQuery();

        this.state = {
            reqUrl: "",
            loading: true,
            page: parseInt(this.par.page),
            search: this.par.search
        }
    }

    createReqUrl(parsedQueryObj){
        return `http://www.omdbapi.com/?s=${this.state.search}&page=${this.state.page}&apikey=dce24c91`
    }

    parseQuery(){
        let urlSearchParams = new URLSearchParams(this.props.location.search);
        return Object.fromEntries(urlSearchParams.entries());
    }

    componentDidUpdate(prevProps){
        if(prevProps.location.search !== this.props.location.search){
            this.setState({
                page: this.parseQuery().page,
                search: this.parseQuery().search
            }, () => this.fetchMovieData())
        }
    }

    componentDidMount(){
        
        this.setState({
            page: this.parseQuery().page,
            search: this.parseQuery().search
        }, () => this.fetchMovieData())
    }


    fetchMovieData = () =>{
        fetch(this.createReqUrl())
        .then(res => res.json())
        .then(
            (result) => {
                if(result.Response === "True"){
                    this.setState({
                        loading: false,
                        data: result,
                        error: false
                    });
                }else{
                    this.setState({
                        loading: false,
                        data: result,
                        error: true,
                        errorDes: result.Error
                    })
                }
            },
            (error) => {
                this.setState({
                    loading: false,
                    error: true,
                    errorDes: "something went wrong"
                });
            }
        )
    }


    nextPage = () => {
        if(parseInt(this.state.page) < (this.state.data.totalResults / 10)){
            this.setState({page: parseInt(this.state.page) + 1}, () => this.fetchMovieData())
        }
        
    }
    prevPage = () => {
        if(parseInt(this.state.page) > 1){
            this.setState({page: parseInt(this.state.page) - 1}, () => this.fetchMovieData())
        }
    }

    render(){
        
        return(
            <div className="">
                <div className="flex flex-wrap justify-center">
                    {this.state.loading && [1, 2, 3, 4].map((num, index)=> {
                        return (
                            <div key={index.toString()} className="w-52 h-80 mx-5 my-2 border rounded bg-gray-300">
                                <p>Loading</p>
                            </div>
                        )
                    })}

                    {this.state.error && <p>{this.state.errorDes}</p>}
                    
                    {!this.state.loading && !this.state.error &&
                        this.state.data.Search.map((movie, index) => {
                            console.log("movie:", movie);
                            return(
                                <MovieCard key={index.toString()} movie={movie} page={this.state.page} search={this.state.search} />
                            )
                        })
                    }

                </div>
                {!this.state.loading && !this.state.error && this.state.data.totalResults &&
                    <div className="mb-8">
                        <button onClick={this.prevPage} className="text-lg mx-2 border rounded px-2 py-1">prev</button>
                        <button onClick={this.nextPage} className="text-lg mx-2 border rounded px-2 py-1">next</button>
                    </div>
                }
            </div>
        )
    }
}

export default Movies